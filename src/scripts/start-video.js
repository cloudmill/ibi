import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', () => {
  const comp = document.querySelector('.start-video')
  
  if (comp) {
    // data
    let COMP_SIZE
    let COMP_ASPECT

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
      updateSize(detail, () => signal('psx:3'))
    })

    window.addEventListener('psx:4', () => {
      comp.play()
    })

    comp.addEventListener('ended', () => {
      comp.classList.add('start-video--hidden')
    })
  }
})
