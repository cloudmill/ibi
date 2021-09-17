import { mediaQuery } from 'scripts/mediaQueries.js'
import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', () => {
  const comp = document.querySelector('.start-video')

  if (comp) {
    if (mediaQuery.matches) {
      // [desktop]
      // data
      let VIDEO_SIZE
      let VIDEO_ASPECT

      // methods
      const updateSize = (() => {
        // data
        let prevStyle = {
          maxHeight: comp.style.maxHeight,
          height: comp.style.height,
        }
  
        // methods
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
  
        // function
        return (containerSize, callback) => {
          console.log('upppdate');

          let newStyle
  
          {
            const containerAspect = getAspect(containerSize)
  
            if (containerAspect > VIDEO_ASPECT) {
              const newHeight = containerSize.width / VIDEO_ASPECT

              console.log('upppdate', newHeight);
  
              newStyle = {
                maxHeight: 'none',
                height: newHeight + 'px',
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
        VIDEO_SIZE = {
          width: comp.videoWidth,
          height: comp.videoHeight,
        }
        VIDEO_ASPECT = getAspect(VIDEO_SIZE)
      }
  
      function close() {
        comp.classList.add('start-video--hidden')
      }
      
      function initSource(callback) {
        const observer = new MutationObserver(() => {
          callback()
  
          observer.disconnect()
        })
        observer.observe(comp, {
          attributes: true,
        })
  
        setTimeout(() => {
          const src = comp.getAttribute('data-src')
          const poster = comp.getAttribute('data-poster')
  
          comp.setAttribute('src', src)
          comp.setAttribute('poster', poster)
        })
      }
  
      // events
      initSource(() => {
        comp.addEventListener('canplaythrough', () => {
          initSize()
          
          signal('psx:1')
        })
    
        window.addEventListener('psx:2', ({ detail }) => updateSize(detail, () => signal('psx:3')))
    
        window.addEventListener('psx:4', () => comp.play())
    
        comp.addEventListener('ended', () => signal('psx:5'))
      })
    }
  }
})
