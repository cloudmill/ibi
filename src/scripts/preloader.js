import { mediaQuery } from 'scripts/mediaQueries.js'
import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', () => {
  const comp = document.querySelector('.preloader')

  if (comp) {
    if (mediaQuery.matches) {
      // events
      window.addEventListener('psx:3', () => {
        comp.classList.add('preloader--hidden')
      })

      comp.addEventListener('transitionend', () => {
        signal('psx:4')
      })
    } else {
      window.addEventListener('load', () => {
        console.log('776655')
        comp.classList.add('preloader--hidden')
      })
    }
  }
})
