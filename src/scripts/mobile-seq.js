import swipeDetect from 'swipe-detect'

const BREAKPOINT = {
  TABLET: 1024,
}

window.addEventListener('DOMContentLoaded', () => {
  if (!matchMedia(`(min-width: ${BREAKPOINT.TABLET}px)`).matches) {
    if (document.querySelector('.seq') && document.querySelector('.expand')) {
      const STATE = {
        TOUCHMOVE: {
          LOCK: 'LOCK',
          UNLOCK: 'UNLOCK',
        },
        SEQ: {
          
        },
      }

      // scroll
      document.querySelector('.expand__scroll').addEventListener('scroll', () => {
        console.log('scroll')
      })
      
      // swipe
      swipeDetect(window, dir => state = reducer(state, dir), 0)

      window.addEventListener('touchmove', e => {

      }, {
        passive: false,
      })
    }
  }
})
