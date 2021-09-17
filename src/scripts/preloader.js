import { mediaQuery } from 'scripts/mediaQueries.js'
import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', () => {
  const comp = document.querySelector('.preloader')

  if (comp) {
    function close() {
      comp.classList.add('preloader--hidden')
    }

    if (mediaQuery.matches) {
      // [desktop]
      // eventsw
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
})
