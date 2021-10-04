import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', async () => {
  const seq = document.querySelector('.seq')

  if (seq) {
    const loadWindow = new Promise(resolve => window.addEventListener('load', resolve))

    // задержка
    function delay(delay = 0) {
      return new Promise(resolve => setTimeout(resolve, delay))
    }

    // картинки
    // сбор данных из html
    const dataFramesDirDesktop = seq.getAttribute('data-frames-dir-desktop')
    const dataFramesListDesktop = seq.getAttribute('data-frames-list-desktop')
    
    // список путей, картинок
    const imagesSrc = JSON.parse(dataFramesListDesktop).map(fileName => dataFramesDirDesktop + fileName)
    const images = []

    // список загрузок
    const loads = []
    for (let i = 0; i < imagesSrc.length; i++) {
      const load = new Promise(resolve => {
        images[i] = new Image()
        images[i].src = imagesSrc[i]

        images[i].onload = resolve
      })

      loads.push(load)
    }

    // загрузка всех картинок
    await Promise.all(loads)

    // скролл в начало
    function scrollToTop() {
      return new Promise(resolve => {
        setTimeout(() => {
          window.scrollTo(0, 0)

          resolve()
        })
      })
    }

    // ждем полную загрузку страницы
    await loadWindow
    // перемещаем скролл страницы в начало
    await scrollToTop()
    // посылаем сигнал прелоадеру на открытие
    signal('seq:1')

    const canvas = seq.querySelector('.seq__canvas')
    const ctx = canvas.getContext('2d')
    function updateCanvasSize() {
      const canvasRect = canvas.getBoundingClientRect()

      canvas.width = canvasRect.width
      canvas.height = canvasRect.height
    }

    // обновление canvas width/height на старте и при ресайзе
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // получить прогресс прокрутки seq
    function getProgress() {
      const seqRect = seq.getBoundingClientRect()

      const progress = -seqRect.top / (seqRect.height - window.innerHeight)
      console.log('seq progress', progress)

      return progress
    }

    let prevProgress = null
    let nextProgress = getProgress()
    function updateProgress() {
      prevProgress = nextProgress
      nextProgress = getProgress()
    }
    function getImageIndex(progress) {
      return Math.floor(images.length * progress)
    }
    function render(progress) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const image = images[getImageIndex(progress)]
      ctx.drawImage(image, 0, 0, image.width * (canvas.height / image.height), canvas.height)
    }
    function updateCanvas() {
      // seq
      if (nextProgress >= 0 && nextProgress < 1) {
        render(nextProgress)
      } else {
        // seq -> before
        if (prevProgress >= 0 && nextProgress < 0) {
          render(1 / images.length * 2)
        }
        // seq -> after
        if (prevProgress < 1 && nextProgress >= 1) {
          render(1 - 1 / images.length * 2)
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

    /* SCROLL */
    function updateSeq() {
      if (prevProgress) {
        // regular
        updateCanvas()
        updateText()
        updateHeader()
      } else {
        // init
        render(0)
        initText()
      }
    }

    updateSeq()
    window.addEventListener('scroll', () => {
      updateProgress()
      updateSeq()
    })
  }
})
