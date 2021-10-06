import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', async () => {
  const seq = document.querySelector('.seq')

  if (seq) {
    /* DELAY */
    function delay(delay = 0) {
      return new Promise(resolve => setTimeout(resolve, delay))
    }



    /* LOAD WINDOW */
    const loadWindow = new Promise(resolve => window.addEventListener('load', resolve))



    /* MEDIA QUERY */
    const BREAKPOINT = 1024
    const mediaQuery = matchMedia(`(min-width: ${BREAKPOINT}px)`)



    /* LOAD IMAGES */
    let images
    function loadImages() {
      images = []

      let dir
      let fileNameList
      if (mediaQuery.matches) {
        dir = seq.getAttribute('data-frames-dir-desktop')
        fileNameList = seq.getAttribute('data-frames-list-desktop')
      } else {
        dir = seq.getAttribute('data-frames-dir-mobile')
        fileNameList = seq.getAttribute('data-frames-list-mobile')
      }
      
      let srcList = JSON.parse(fileNameList)
      srcList = srcList.map(fileName => dir + fileName)
      
      return Promise.all(srcList.map((src, index) => new Promise(resolve => {
        images[index] = new Image()
        images[index].src = src
        images[index].onload = resolve
      })))
    }
    await loadImages()



    /* LOAD WINDOW */
    await loadWindow


    
    /* SCROLL TO TOP */
    async function scrollToTop() {
      await delay()
      window.scrollTo(0, 0)
      await delay()
    }
    await scrollToTop()
    


    /* OPEN PRELOADER */
    signal('seq:1')



    /* PROGRESS */
    let prevProgress
    let nextProgress
    function getProgress() {
      const seqRect = seq.getBoundingClientRect()
      return -seqRect.top / (seqRect.height - window.innerHeight)
    }
    function initProgress() {
      prevProgress = null
      nextProgress = getProgress()
    }
    function updateProgress() {
      prevProgress = nextProgress
      nextProgress = getProgress()
    }
    function getImageIndex(progress) {
      return Math.floor(images.length * progress)
    }



    /* CANVAS */
    let canvas
    let ctx
    function updateCanvasSize() {
      const canvasRect = canvas.getBoundingClientRect()
      canvas.width = canvasRect.width
      canvas.height = canvasRect.height
    }
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    function drawCanvas(progress) {
      const imageIndex = getImageIndex(progress)
      const image = images[imageIndex]
      const imageRatio = image.width / image.height

      const renderZoneWidth = canvas.width * (1245 / 1840)
      const renderZoneHeight = canvas.height
      const renderZoneRatio = renderZoneWidth / renderZoneHeight

      let renderWidth
      let renderHeight
      let renderX
      let renderY

      if (renderZoneRatio >= imageRatio) {
        renderHeight = renderZoneHeight
        renderWidth = image.width * (renderHeight / image.height)

        renderY = 0
        // renderX = (renderZoneWidth / 2) - (renderWidth / 2)
        renderX = 0
      } else {
        renderWidth = renderZoneWidth
        renderHeight = image.height * (renderWidth / image.width)

        renderX = 0
        renderY = renderZoneHeight - renderHeight
      }

      console.log('imageRatio', imageRatio)
      console.log('renderZoneWidth', renderZoneWidth)
      console.log('renderZoneHeight', renderZoneHeight)
      console.log('renderZoneRatio', renderZoneRatio)
      console.log('renderWidth', renderWidth)
      console.log('renderHeight', renderHeight)
      console.log('renderX', renderX)
      console.log('renderY', renderY)

      ctx.drawImage(image, renderX, renderY, renderWidth, renderHeight)
    }
    function renderCanvas(progress) {
      clearCanvas()
      drawCanvas(progress)
    }
    function initCanvasData() {
      canvas = seq.querySelector('.seq__canvas')
      ctx = canvas.getContext('2d')
    }
    function initCanvas() {
      initCanvasData()
      updateCanvasSize()
      renderCanvas(0)
    }
    function updateCanvas(options = {
      outSeq: false,
    }) {
      if (nextProgress >= 0 && nextProgress < 1) {
        // seq
        renderCanvas(nextProgress)
      } else {
        // seq -> before
        if (prevProgress >= 0 && nextProgress < 0) {
          renderCanvas(0)
        }
        // seq -> after
        if (prevProgress < 1 && nextProgress >= 1) {
          renderCanvas(1 - 1 / images.length * 2)
        }
        // out seq
        if (options.outSeq) {
          // before
          if (prevProgress < 0 && nextProgress < 0) {
            renderCanvas(0)
          }
          // after
          if (prevProgress >= 1 && nextProgress >= 1) {
            renderCanvas(1 - 1 / images.length * 2)
          }
        }
      }
    }



    /* TEXT */
    const TEXT_ACTIVE_CLASS = 'seq__text--active'
    const textsContainer = seq.querySelector('.seq__texts')
    const texts = textsContainer.querySelectorAll('.seq__text')
    function getFrame(imageIndex) {
      let i = 0
      let frame = +texts[i].getAttribute('data-frame')
      while ((i < texts.length) && (frame <= imageIndex)) {
        i++
        if (i < texts.length) {
          frame = +texts[i].getAttribute('data-frame')
        }
      }
      frame = +texts[i - 1].getAttribute('data-frame')
      return frame
    }
    function getText(frame) {
      return textsContainer.querySelector(`[data-frame="${frame}"]`)
    }
    function getTextIndex(text) {
      return [...texts].indexOf(text)
    }
    function updateText() {
      const prevText = textsContainer.querySelector('.' + TEXT_ACTIVE_CLASS)

      if (nextProgress >= 0 && nextProgress < 1) {
        // in seq
        const prevTextFrame = prevText.getAttribute('data-frame')

        const nextImageIndex = getImageIndex(nextProgress)
        const nextTextFrame = getFrame(nextImageIndex)

        if (nextTextFrame !== prevTextFrame) {
          const nextText = getText(nextTextFrame)

          prevText.classList.remove(TEXT_ACTIVE_CLASS)
          nextText.classList.add(TEXT_ACTIVE_CLASS)

          textsContainer.style.transform = `translateY(-${100 * getTextIndex(nextText)}%)`
        }
      } else {
        // seq -> before
        if (prevProgress >= 0 && nextProgress < 0) {
          const firstText = texts[0]

          if (prevText !== firstText) {
            prevText.classList.remove(TEXT_ACTIVE_CLASS)
            firstText.classList.add(TEXT_ACTIVE_CLASS)

            textsContainer.style.transform = 'translateY(0)'
          }
        }

        // seq -> after
        if (prevProgress < 1 && nextProgress >= 1) {
          const lastText = texts[texts.length - 1]

          if (prevText !== lastText) {
            prevText.classList.remove(TEXT_ACTIVE_CLASS)
            lastText.classList.add(TEXT_ACTIVE_CLASS)

            textsContainer.style.transform = `translateY(-${100 * (texts.length - 1)}%)`
          }
        }
      }
    }
    function initText() {
      const firstText = texts[0]
      firstText.classList.add(TEXT_ACTIVE_CLASS)
    }



    /* HEADER */
    const header = document.querySelector('header')
    function updateHeader() {
      // in seq
      if (
        prevProgress < 0 && nextProgress >= 0
        ||
        prevProgress >= 1 && nextProgress < 1
      ) {
        header.classList.add('header--seq')
      }

      // out seq
      if (
        prevProgress >= 0 && nextProgress < 0
        ||
        prevProgress < 1 && nextProgress >= 1
      ) {
        header.classList.remove('header--seq')
      }
    }



    /* NAVIGATION */
    const SEQ_TOP_ACTIVE_CLASS = 'seq__top--active'
    const seqTop = seq.querySelector('.seq__top')
    function updateNavigation() {
      // in seq
      if (prevProgress < 0 && nextProgress >= 0) {
        seqTop.classList.add(SEQ_TOP_ACTIVE_CLASS)
      }

      // out seq
      if (prevProgress >= 0 && nextProgress < 0) {
        seqTop.classList.remove(SEQ_TOP_ACTIVE_CLASS)
      }
    }



    /* INIT */
    function init() {
      initProgress()
      initCanvas()
      initText()
    }
    init()



    /* SCROLL */
    window.addEventListener('scroll', () => {
      updateProgress()
      updateCanvas()
      updateText()
      updateHeader()
      updateNavigation()
    })



    /* RESIZE */
    window.addEventListener('resize', () => {
      updateCanvasSize()
      updateProgress()
      updateCanvas({
        outSeq: true,
      })
      updateText()
      updateHeader()
      updateNavigation()
    })
  }
})
