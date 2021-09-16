import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', () => {
  const comp = document.querySelector('.start-video')
  
  if (comp) {
    // data
    let COMP_SIZE
    let COMP_ASPECT

    const DELAY = 1000
    
    // methods
    function getSize() {
      const rect = comp.getBoundingClientRect()

      return {
        width: rect.width,
        height: rect.height,
      }
    }

    const updateSize = (() => {
      let prevStyle = {
        maxHeight: comp.style.maxHeight,
        height: comp.style.height,
      }

      function eqStyle(prevStyle, newStyle) {
        return (
          prevStyle.maxHeight === newStyle.height
          &&
          prevStyle.height === newStyle.height
        )
      }
      function applyStyle(style) {
        comp.style.maxHeight = style.maxHeight
        comp.style.height = style.height
      }

      return (containerSize, callback) => {
        let newStyle

        {
          const containerAspect = getAspect(containerSize)

          if (containerAspect > COMP_ASPECT) {
            const newCompHeight = containerSize.width / COMP_ASPECT

            newStyle = {
              maxHeight: 'none',
              height: newCompHeight + 'px',
            }
          } else {
            newStyle = {
              maxHeight: '',
              height: '',
            }
          }

          if (!eqStyle(prevStyle, newStyle)) {
            const observer = new MutationObserver(() => {
              console.log('pne');
              callback()


              observer.disconnect()
            })
            observer.observe(comp, {
              attributes: true,
            })

            setTimeout(() => applyStyle(newStyle))
          } else {
            applyStyle(newStyle)

            setTimeout(callback)
          }
        }
        
        prevStyle = newStyle
      }
    })()

    function getAspect(size) {
      return size.width / size.height
    }

    function initSize() {
      COMP_SIZE = getSize()
      COMP_ASPECT = getAspect(COMP_SIZE)
    }

    // events
    comp.addEventListener('canplaythrough', () => {
      initSize()

      signal('psx:1')
    })

    window.addEventListener('psx:2', ({ detail }) => {
      // updateSize(detail, () => setTimeout(() => signal('psx:3'), DELAY))
      updateSize(detail, () => signal('psx:3'))
    })
  }
})

// window.addEventListener('DOMContentLoaded', () => {
//   const startVideo = $('.start-video')
//   const startVideoEl = startVideo[0]

//   if (startVideo.length) {
//     startVideo.on('error', () => {
//       console.log('start-video: error')

//       const errorEvent = new CustomEvent('start-video-error')
//       window.dispatchEvent(errorEvent)
//     })

//     startVideo.on('canplaythrough', () => {
//       console.log('start-video: canplaythrough')

//       const successEvent = new CustomEvent('start-video-success')
//       window.dispatchEvent(successEvent)
//     })

//     window.addEventListener('preloader-close', () => {
//       console.log('start-video: start');

//       startVideoEl.play()
//     })

//     startVideo.on('ended', () => {
//       console.log('start-video: end')

//       startVideo.addClass('start-video--hidden')

//       const successEvent = new CustomEvent('start-video-end')
//       window.dispatchEvent(successEvent)
//     })

//     function getComponentSize() {
//       const componentRect = startVideoEl.getBoundingClientRect()

//       return [componentRect.width, componentRect.height]
//     }

//     function getComponentAspect() {
//       const componentSize = getComponentSize()

//       return componentSize[0] / componentSize[1]
//     }

//     window.addEventListener('xray-change-size', event => {
//       const containerSize = event.detail
//       const containerAspect = containerSize[0] / containerSize[1]

//       const componentAspect = getComponentAspect()

//       if (containerAspect > componentAspect) {
//         const componentSize = getComponentSize()

//         const newComponentHeight = componentSize[1] * (containerSize[0] / componentSize[0])

//         startVideo.css('max-height', 'none')
//         startVideo.css('height', newComponentHeight + 'px')
//       } else {
//         startVideo.css('max-height', '')
//         startVideo.css('height', '')
//       }
//     })
//   }
// })