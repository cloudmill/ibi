import src from 'gsap/src'
import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', async () => {
  // const consoleEl = document.querySelector('.console')
  // function logConsole(msg) {
  //   if (consoleEl) {
  //     consoleEl.innerHTML = msg + '<br>' + consoleEl.innerHTML
  //     consoleEl.scrollTo(0, 0)
  //   }
  // }

  // if (!matchMedia('(min-width: 1920px)').matches) {
  //   window.addEventListener('scroll', () => logConsole('scroll ' + pageYOffset))
  //   window.addEventListener('touchmove', () => logConsole('touchmove ' + pageYOffset))
  //   setInterval(() => {
  //     logConsole('pageYOffset ' + pageYOffset)
  //   }, 1000)
  // }

  const seq = document.querySelector('.seq')

  if (seq) {
    /* DELAY */
    function delay(delay = 0) {
      return new Promise(resolve => setTimeout(resolve, delay))
    }



    /* LOAD WINDOW */
    const loadWindow = new Promise(resolve => window.addEventListener('load', resolve))



    /* MEDIA QUERY */
    const BREAKPOINT = {
      DEFAULT: 1280,
      TABLET: 1024,
    }
    function getMediaQuery(breakpoint) {
      return matchMedia(`(min-width: ${breakpoint}px)`)
    }



    /* LOAD IMAGES */
    let images
    function loadImages() {
      images = []

      let dir
      let fileNameList
      if (getMediaQuery(BREAKPOINT.TABLET).matches) {
        dir = seq.getAttribute('data-frames-dir-desktop')
        fileNameList = seq.getAttribute('data-frames-list-desktop')
      } else {
        dir = seq.getAttribute('data-frames-dir-mobile')
        fileNameList = seq.getAttribute('data-frames-list-mobile')
      }
      
      let srcList = JSON.parse(fileNameList)

      //!
      signal('wow:srcList', srcList)

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

      if (getMediaQuery(BREAKPOINT.TABLET).matches) {
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
      } else {
        renderWidth = canvas.width
        renderHeight = canvas.height
        renderX = 0
        renderY = 0
      }

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



    /* BACKGROUND */
    const background = seq.querySelector('.seq__background')
    function updateBackgroundSize() {
      const backgroundRect = background.getBoundingClientRect()
      background.style.height = backgroundRect.width + 'px'
    }
    function initBackground() {
      updateBackgroundSize()
    }
    function getBackgroundHeight() {
      const backgroundRect = background.getBoundingClientRect()
      return backgroundRect.height
    }



    /* BOTTOM */
    const bottom = seq.querySelector('.seq__bottom')
    function getBottomHeight() {
      const bottomRect = bottom.getBoundingClientRect()
      return bottomRect.height
    }
    function getBottomPaddingTop() {
      const bottomStyle = getComputedStyle(bottom)
      return parseFloat(bottomStyle.paddingTop)
    }



    /* UNDER */
    let under
    function initUnder() {
      under = document.createElement('div')
      under.classList.add('seq__under')

      bottom.append(under)
      updateUnderSize()
    }
    function updateUnderSize() {
      const bottomHeight = getBottomHeight()
      const bottomPaddingTop = getBottomPaddingTop()

      const backgroundHeight = getBackgroundHeight()
      
      const underHeight = bottomHeight - bottomPaddingTop - backgroundHeight
      under.style.height = underHeight + 'px'
    }



    /* TEXT */
    const TEXT_ACTIVE_CLASS = 'seq__text--active'
    const textsContainer = (
      getMediaQuery(BREAKPOINT.TABLET).matches ? 
        seq.querySelector('.seq__texts--desktop')
        :
        seq.querySelector('.seq__texts--mobile')
    )
    const texts = textsContainer.querySelectorAll('.seq__text')

    //!
    signal('wow:frameList', Array.from(texts).map(text => text.getAttribute('data-frame')))

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

      if (!getMediaQuery(BREAKPOINT.TABLET).matches) {
        under.append(textsContainer)
      }
    }



    /* HEADER */
    const header = document.querySelector('.header')
    const mobileHeaderPanel = document.querySelector('.mobile-header__panel')
    function updateHeader() {
      if (getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        // in seq
        if (
          prevProgress < 0 && nextProgress >= 0
          ||
          prevProgress >= 1 && nextProgress < 1
        ) {
          header.classList.add('header--seq')
          mobileHeaderPanel.classList.add('mobile-header__panel--show')
        }
  
        // out seq
        if (
          prevProgress >= 0 && nextProgress < 0
          ||
          prevProgress < 1 && nextProgress >= 1
        ) {
          header.classList.remove('header--seq')
          mobileHeaderPanel.classList.remove('mobile-header__panel--show')
        }
      } else {
        // seq -> after
        if (prevProgress < 1 && nextProgress >= 1) {
          header.classList.remove('header--open')
          mobileHeaderPanel.classList.remove('mobile-header__panel--show')
        }
        // after -> seq
        if (prevProgress >= 1 && nextProgress < 1) {
          header.classList.add('header--open')
          mobileHeaderPanel.classList.add('mobile-header__panel--show')
        }
      }
    }
    function initHeader() {
      if (!getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        header.classList.add('header--open')
        mobileHeaderPanel.classList.add('mobile-header__panel--show')
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



    /* FULLSCREEN */
    const fullscreen = seq.querySelector('.seq__fullscreen')
    function getFullscreenPageY() {
      const fullscreenRect = fullscreen.getBoundingClientRect()

      return pageYOffset + fullscreenRect.y
    }



    /* GRADIENT */
    const gradient = seq.querySelector('.seq__gradient')
    function updateGradient() {
      gradient.style.top = -getFullscreenPageY() + 'px'
    }


    
    /* MENU */
    let menuIsOpen
    let menu$El
    window.addEventListener('seq:2', ({ detail }) => {
      menuIsOpen = detail.isOpen
      menu$El = detail.$el
    })
    function updateMenu() {
      if (menuIsOpen) {
        signal('seq:3', menu$El)
      }
    }
    function initMenu() {
      menuIsOpen = false
      menu$El = null
    }



    /* INIT */
    async function init() {
      initProgress()
      if (!getMediaQuery(BREAKPOINT.TABLET).matches) {
        initBackground()
        await delay()
      }
      if (!getMediaQuery(BREAKPOINT.TABLET).matches) {
        initUnder()
      }
      initCanvas()
      initText()
      if (getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        updateGradient()
      }
      initHeader()
      if (!getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        initMenu()
      }
    }
    init()



    /* SCROLL */
    window.addEventListener('scroll', () => {
      updateProgress()
      updateCanvas()
      updateText()
      updateHeader()
      if (getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        updateNavigation()
      }
      if (!getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        updateMenu()
      }
    })



    /* RESIZE */
    window.addEventListener('resize', async () => {
      if (!getMediaQuery(BREAKPOINT.TABLET).matches) {
        updateBackgroundSize()
        await delay()
      }
      if (!getMediaQuery(BREAKPOINT.TABLET).matches) {
        updateUnderSize()
      }
      updateCanvasSize()
      updateProgress()
      updateCanvas({
        outSeq: true,
      })
      updateText()
      updateHeader()
      if (getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        updateNavigation()
      }
      if (getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        updateGradient()
      }
      if (!getMediaQuery(BREAKPOINT.DEFAULT).matches) {
        updateMenu()
      }
    })
  }
})

/*
{
  let srcList = null
  let frameList = null

  Promise.all([
    new Promise((resolve) => {
      window.addEventListener('wow:srcList', ({ detail }) => {
        srcList = detail
        resolve()
      })
    }),
    new Promise((resolve) => {
      window.addEventListener('wow:frameList', ({ detail }) => {
        frameList = detail
        resolve()
      })
    }),
  ]).then(() => {
    frameList.push(srcList.length)
    frameList = frameList.map(frame => +frame)

    const frameRanges = []
    for (let i = 1; i < frameList.length; i++) {
      frameRanges.push(frameList[i] - frameList[i - 1])
    }

    const srcRanges = []
    for (let i = 0; i < frameList.length - 1; i++) {
      const startIndex = frameList[i]
      const endIndex = startIndex + frameRanges[i]

      srcRanges.push(srcList.slice(startIndex, endIndex))
    }

    const diffCounts = []
    for (let i = 0; i < frameRanges.length; i++) {
      diffCounts.push(Math.abs(frameRanges[i] - Math.max(...frameRanges)))
    }

    const resultRanges = []
    for (let i = 0; i < srcRanges.length; i++) {
      const resultRangeCounts = []

      for (let j = 0; j < srcRanges[i].length; j++) {
        resultRangeCounts.push(0)
      }

      for (let j = 0; j < Math.max(...frameRanges); j++) {
        resultRangeCounts[j % resultRangeCounts.length]++
      }

      const resultRange = []

      for (let j = 0; j < resultRangeCounts.length; j++) {
        for (let k = 0; k < resultRangeCounts[j]; k++) {
          resultRange.push(srcRanges[i][j])
        }
      }

      resultRanges.push(resultRange)
    }

    let newSrcList = []
    for (let i = 0; i < resultRanges.length; i++) {
      newSrcList = newSrcList.concat(resultRanges[i])
    }

    const newFrameList = []
    for (let i = 0; i < frameList.length - 1; i++) {
      newFrameList.push(Math.max(...frameRanges) * i)
    }
    
    console.log('srcList', srcList)
    console.log('frameList', frameList)
    console.log('frameRanges', frameRanges)
    console.log('maxFrameRange', Math.max(...frameRanges))
    console.log('srcRanges', srcRanges)
    console.log('diffCounts', diffCounts)
    console.log('resultRanges', resultRanges)
    console.log('newSrcList', newSrcList)
    console.log(`[${newSrcList.map(src => `"${src}",`).join('')}]`)
    console.log('newFrameList', newFrameList)
  })
}
*/
