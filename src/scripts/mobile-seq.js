import swipeDetect from 'swipe-detect'
import { signal } from './communication'

const BREAKPOINT = {
  TABLET: 1024,
}

window.addEventListener('DOMContentLoaded', () => {
  if (!matchMedia(`(min-width: ${BREAKPOINT.TABLET}px)`).matches) {
    if (document.querySelector('.seq') && document.querySelector('.expand')) {
      const ACTION = {
        HIT_ABOVE: 'HIT_ABOVE',
        HIT_BELOW: 'HIT_BELOW',

        SWIPE_UP: 'SWIPE_UP',
        SWIPE_DOWN: 'SWIPE_DOWN',

        ENERTIA_END: 'ENERTIA_END',

        TRANSITION_END: 'TRANSITION_END',

        TOUCH: 'TOUCH',
        NO_TOUCH: 'NO_TOUCH',
      };

      const VALUE = {
        POINT: {
          START: 0,
          END: 20,
        },
        LOCK: {
          YES: 'YES',
          NO: 'NO',
        },
        TRANSITION: {
          YES: 'YES',
          NO: 'NO',
        },
        MOVE: {
          FREE: 'FREE',
          WAIT: 'WAIT',
          ENERTIA: 'ENERTIA',
        },
        TOUCH: {
          YES: 'YES',
          NO: 'NO',
        },
      };

      const INIT_STATE = {
        point: VALUE.POINT.START,
        lock: VALUE.LOCK.NO,
        transition: VALUE.TRANSITION.NO,
        move: VALUE.MOVE.FREE,
        touch: VALUE.TOUCH.NO,
      };

      let state = INIT_STATE;
      console.log(state)

      const pre = document.createElement('pre')
      pre.style.cssText = `
        pointer-events: none;
        position: fixed;
        z-index: 1000000000;
        top: 0;
        left: 0;
        right: 0;
      `
      document.body.append(pre)
      setInterval(() => {
        pre.innerHTML = JSON.stringify(state, null, '\t')
      })

      const reducer = (state, action) => {
        switch (action) {
          case ACTION.HIT_ABOVE:
            if (state.point === VALUE.POINT.START) {
              if (state.touch === VALUE.TOUCH.NO) {
                setTimeout(() => {
                  signal('mobile-seq:action', ACTION.ENERTIA_END)
                }, 2000)

                return {
                  ...state,
  
                  point: state.point + 1,
                  lock: VALUE.LOCK.YES,
                  move: VALUE.MOVE.ENERTIA,
                }
              }

              return {
                ...state,

                point: state.point + 1,
                lock: VALUE.LOCK.YES,
                move: VALUE.MOVE.WAIT,
              }
            }
            break;
          case ACTION.HIT_BELOW:
            if (state.point === VALUE.POINT.END) {
              if (state.touch === VALUE.TOUCH.NO) {
                setTimeout(() => {
                  signal('mobile-seq:action', ACTION.ENERTIA_END)
                }, 2000)

                return {
                  ...state,
  
                  point: state.point - 1,
                  lock: VALUE.LOCK.YES,
                  move: VALUE.MOVE.ENERTIA,
                }
              }

              return {
                ...state,

                point: state.point - 1,
                lock: VALUE.LOCK.YES,
                move: VALUE.MOVE.WAIT,
              }
            }
            break;

          case ACTION.SWIPE_UP:
            if (state.move !== VALUE.MOVE.WAIT) {
              if (state.point === VALUE.POINT.END - 1) {
                console.error(state)

                const expandScroll = document.querySelector('.expand__scroll')
                const seq = document.querySelector('.seq')
                const seqFullscreen = document.querySelector('.seq__fullscreen')

                const seqRect = seq.getBoundingClientRect()
                const seqFullscreenRect = seqFullscreen.getBoundingClientRect()

                const bottom = expandScroll.scrollTop + seqRect.bottom
                const height = seqFullscreenRect.height

                expandScroll.scrollTo(0, bottom - height)
              }
  
              if (
                state.point > VALUE.POINT.START &&
                state.point < VALUE.POINT.END - 1 &&
                state.transition === VALUE.TRANSITION.NO
              ) {
                setTimeout(() => {
                  signal('mobile-seq:action', ACTION.TRANSITION_END)
                }, 500)
  
                return {
                  ...state,
  
                  point: state.point + 1,
                  transition: VALUE.TRANSITION.YES,
                };
              } else if (
                state.point === VALUE.POINT.END - 1 &&
                state.transition === VALUE.TRANSITION.NO &&
                state.move === VALUE.MOVE.FREE
              ) {
                return {
                  ...state,
  
                  point: state.point + 1,
                  lock: VALUE.LOCK.NO,
                };
              }
            }
            break;
          case ACTION.SWIPE_DOWN:
            if (state.move !== VALUE.MOVE.WAIT) {
              if (state.point === VALUE.POINT.START + 1) {
                console.error(state)

                const expandScroll = document.querySelector('.expand__scroll')
                const seq = document.querySelector('.seq')

                const seqRect = seq.getBoundingClientRect()

                const start =  expandScroll.scrollTop + seqRect.top

                expandScroll.scrollTo(0, start)
              }
  
              if (
                state.point > VALUE.POINT.START + 1 &&
                state.point < VALUE.POINT.END &&
                state.transition === VALUE.TRANSITION.NO
              ) {
                setTimeout(() => {
                  signal('mobile-seq:action', ACTION.TRANSITION_END)
                }, 500)
  
                return {
                  ...state,
  
                  point: state.point - 1,
                  transition: VALUE.TRANSITION.YES,
                };
              } else if (
                state.point === VALUE.POINT.START + 1 &&
                state.transition === VALUE.TRANSITION.NO &&
                state.move === VALUE.MOVE.FREE
              ) {
                return {
                  ...state,
  
                  point: state.point - 1,
                  lock: VALUE.LOCK.NO,
                };
              }
            }
            break;

          case ACTION.ENERTIA_END:
            if (state.move === VALUE.MOVE.ENERTIA) {
              return {
                ...state,

                move: VALUE.MOVE.FREE,
              }
            }
            break;

          case ACTION.TRANSITION_END:
            return {
              ...state,

              transition: VALUE.TRANSITION.NO,
            };
            break;
            
          case ACTION.TOUCH:
            return {
              ...state,

              touch: VALUE.TOUCH.YES,
            }
            break
          case ACTION.NO_TOUCH:
            if (state.move === VALUE.MOVE.WAIT) {
              setTimeout(() => {
                signal('mobile-seq:action', ACTION.ENERTIA_END)
              }, 2000)

              return {
                ...state,

                move: VALUE.MOVE.ENERTIA,
                touch: VALUE.TOUCH.NO,
              }
            }

            return {
              ...state,

              touch: VALUE.TOUCH.NO,
            }
            break
        }

        return state;
      };

      window.addEventListener('touchmove', e => {
        if (state.lock === VALUE.LOCK.YES) {
          e.preventDefault()
        }
      }, {
        passive: false,
      })

      swipeDetect(
        window,
        dir => {
          switch (dir) {
            case 'up':
              state = reducer(state, ACTION.SWIPE_UP);
              console.log(state)
              break;
            case 'down':
              state = reducer(state, ACTION.SWIPE_DOWN);
              console.log(state)
              break;
          }
        },
        0
      );

      window.addEventListener('touchstart', e => {
        if (e.touches.length) {
          state = reducer(state, ACTION.TOUCH)
          console.log(state)
        }
      })
      window.addEventListener('touchend', e => {
        if (!e.touches.length) {
          state = reducer(state, ACTION.NO_TOUCH)
          console.log(state)
        }
      })

      document.querySelector('.expand__scroll').addEventListener('scroll', () => {
        if (state.point === VALUE.POINT.START || state.point === VALUE.POINT.END) {
          const expandScroll = document.querySelector('.expand__scroll')
          const seq = document.querySelector('.seq')
          const seqFullscreen = document.querySelector('.seq__fullscreen')

          const seqRect = seq.getBoundingClientRect()
          const seqFullscreenRect = seqFullscreen.getBoundingClientRect()

          const start =  expandScroll.scrollTop + seqRect.top
          const bottom = expandScroll.scrollTop + seqRect.bottom
          const height = seqFullscreenRect.height
          
          if (state.point === VALUE.POINT.START && expandScroll.scrollTop >= start + 1) {
            state = reducer(state, ACTION.HIT_ABOVE);
            console.log(state)
          } else if (state.point === VALUE.POINT.END && expandScroll.scrollTop <= bottom - height - 1) {
            state = reducer(state, ACTION.HIT_BELOW);
            console.log(state)
          }
        }
      });

      window.addEventListener('mobile-seq:action', ({ detail }) => {
        state = reducer(state, detail)
        console.log(state)
      })
    }
  }
})
