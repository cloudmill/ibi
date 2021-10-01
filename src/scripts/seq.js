import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', async () => {
  const seq = document.querySelector('.seq')

  // если секвенция найдена
  if (seq) {
    // промис, который позволит отследить загрузку страницы (load)
    const loadWindow = new Promise(resolve => window.addEventListener('load', resolve))

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

    requestAnimationFrame(wow)

    let wwow = performance.now()
    function wow() {
      const qweqwe = performance.now()
      window.scrollBy(0, 1000 * (qweqwe - wwow)/ 1000)

      wwow = qweqwe

      requestAnimationFrame(wow)
    }

    const canvas = seq.querySelector('.seq__canvas')
    const ctx = canvas.getContext('2d')

    function updateCanvasSize() {
      const canvasRect = canvas.getBoundingClientRect()

      canvas.width = canvasRect.width
      canvas.height = canvasRect.height
    }

    // обновление canvas width/height на старте и при ресайзе окна
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

      const imageIndex = getImageIndex(progress)
      const image = images[imageIndex]

      // рисуем frame который уже точно достигнут
      ctx.drawImage(image, 0, 0, image.width * (canvas.height / image.height), canvas.height)

      // если это не последний frame в секвенции
      // рисуем след. кадр с прозрачностью (fade-in/out эффект)
      if (imageIndex < (images.length - 1)) {
        ctx.globalAlpha = progress * images.length - imageIndex
        
        const nextImage = images[imageIndex + 1]
        ctx.drawImage(nextImage, 0, 0, nextImage.width * (canvas.height / nextImage.height), canvas.height)
      }
    }

    function updateCanvas() {
      if (nextProgress >= 0 && nextProgress < 1) {
        render(nextProgress)
      } else {
        if (prevProgress >= 0 && nextProgress < 0) {
          render(1 / images.length * 2)
        }
        if (prevProgress < 1 && nextProgress >= 1) {
          render(1 - 1 / images.length * 2)
        }
      }
    }

    const texts = seq.querySelector('.seq__texts')
    function updateText() {
      
    }

    // обновление компонента
    function updateSeq() {
      if (prevProgress) {
        updateCanvas()
        updateText()
      } else {
        // инициализация
        render(0)
      }
    }

    updateSeq()

    window.addEventListener('scroll', () => {
      updateProgress()
      console.log(getImageIndex(nextProgress))
      updateSeq()
    })
  }
})

// window.addEventListener('DOMContentLoaded', () => {
//   const canvas = document.querySelector('.seq__canvas')

//   if (canvas) {
//     const textContainer = document.querySelector('.seq__text-container')
//     let activeText = null

//     const ctx = canvas.getContext('2d')

//     let imageReady = false
    
//     let image = new Image()
//     image.src = 'assets/images/seq/desktop/teeth_final_000.jpg'

//     image.onload = () => {
//       imageReady = true

//       render()
//     }

//     function clear() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//     }

//     function render() {
//       if (imageReady) {
//         clear()

//         ctx.drawImage(image, 0, 0)
//       }
//     }

//     function updateCanvasSize() {
//       canvas.width = canvas.clientWidth
//       canvas.height = canvas.clientHeight

//       render()
//     }

//     updateCanvasSize()
//     window.addEventListener('resize', updateCanvasSize)
//     window.addEventListener('load', updateCanvasSize)

//     const images = []

//     Promise.all((() => {
//       const loads = []

//       for (let i = 0; i < 176; i++) {
//         loads.push(new Promise(resolve => {
//           const image = new Image()
//           image.src = `assets/images/seq/desktop/teeth_final_${i < 10 ? ('00' + i) : (i < 100 ? ('0' + i) : i)}.jpg`

//           images.push(image)

//           image.onload = resolve
//         }))
//       }

//       return loads
//     })()).then(() => {
//       console.log('all loaded')

//       const container = canvas.closest('.seq')

//       window.addEventListener('scroll', () => {
//         const containerRect = container.getBoundingClientRect()

//         if (containerRect.top <= 0 && containerRect.bottom >= window.innerHeight) {
//           const curIndex = Math.floor(images.length * (-containerRect.top / (containerRect.height - window.innerHeight)))

//           image = images[curIndex]

//           const curText = textContainer.querySelector(`[data-frame="${curIndex}"]`)

//           if (curText) {
//             if (activeText) {
//               if (curText !== activeText) {
//                 activeText.classList.remove('seq__text--active')
                
//                 curText.classList.add('seq__text--active')

//                 activeText = curText
//               }
//             } else {
//               curText.classList.add('seq__text--active')

//               activeText = curText
//             }
//           }

//           render()
//         }
//       })
//     })
//   }
// })
