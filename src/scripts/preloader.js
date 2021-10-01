import { mediaQuery } from 'scripts/mediaQueries.js'
import { signal } from 'scripts/communication.js'
import { isTouchDevice } from 'scripts/touchDetect.js'

window.addEventListener('DOMContentLoaded', () => {
  const comp = document.querySelector('.preloader')

  const seq = document.querySelector('.seq')

  if (comp) {
    const seq = document.querySelector('.seq')

    function close() {
      comp.classList.add('preloader--hidden')
    }

    if (seq) {
      window.addEventListener('seq:1', close)
    } else {
      if (mediaQuery.matches && !isTouchDevice) {
        // [desktop]
        // events
        window.addEventListener('psx:3', () => {
          close()
  
          signal('psx:4')
        })
        
        // comp.addEventListener('transitionend', () => signal('psx:4'))
      } else {
        // [mobile]
        // events
        window.addEventListener('load', close)
      }
    }
  }
})
