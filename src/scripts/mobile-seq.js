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
      };

      const VALUE = {
        POINT: {
          START: 0,
          END: 3,
        },
        LOCK: {
          YES: 'YES',
          NO: 'NO',
        },
        ENERTIA: {
          YES: 'YES',
          NO: 'NO',
        },
        TRANSITION: {
          YES: 'YES',
          NO: 'NO',
        },
      };

      const INIT_STATE = {
        point: VALUE.POINT.START,
        lock: VALUE.LOCK.NO,
        enertia: VALUE.ENERTIA.NO,
        transition: VALUE.TRANSITION.NO,
      };

      let state = INIT_STATE;
      console.log(state)

      const reducer = (state, action) => {
        switch (action) {
          case ACTION.HIT_ABOVE:
            if (state.point === VALUE.POINT.START) {
              setTimeout(() => {
                signal('mobile-seq:action', ACTION.ENERTIA_END)
              }, 2000)

              document.querySelector('.expand__scroll').style.overflow = 'hidden'

              return {
                ...state,

                point: state.point + 1,
                lock: VALUE.LOCK.YES,
                enertia: VALUE.ENERTIA.YES,
              };
            }
            break;
          case ACTION.HIT_BELOW:
            if (state.point === VALUE.POINT.END) {
              setTimeout(() => {
                signal('mobile-seq:action', ACTION.ENERTIA_END)
              }, 2000)

              document.querySelector('.expand__scroll').style.overflow = 'hidden'

              return {
                ...state,

                point: state.point - 1,
                lock: VALUE.LOCK.YES,
                enertia: VALUE.ENERTIA.YES,
              };
            }
            break;

          case ACTION.SWIPE_UP:
            if (
              state.point > VALUE.POINT.START &&
              state.point < VALUE.POINT.END - 1 &&
              state.transition === VALUE.TRANSITION.NO
            ) {
              const expandScroll = document.querySelector('.expand__scroll')
              const seq = document.querySelector('.seq')
              expandScroll.scrollTo(
                0,
                seq.getBoundingClientRect().bottom + expandScroll.scrollTop - innerHeight
              )

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
              state.enertia === VALUE.ENERTIA.NO
            ) {
              document.querySelector('.expand__scroll').style.overflow = ''

              return {
                ...state,

                point: state.point + 1,
                lock: VALUE.LOCK.NO,
              };
            }
            break;
          case ACTION.SWIPE_DOWN:
            if (
              state.point > VALUE.POINT.START + 1 &&
              state.point < VALUE.POINT.END &&
              state.transition === VALUE.TRANSITION.NO
            ) {
              const expandScroll = document.querySelector('.expand__scroll')
              const seq = document.querySelector('.seq')
              expandScroll.scrollTo(
                0,
                seq.getBoundingClientRect().top + expandScroll.scrollTop + 1
              )
            
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
              state.enertia === VALUE.ENERTIA.NO
            ) {
              document.querySelector('.expand__scroll').style.overflow = ''

              return {
                ...state,

                point: state.point - 1,
                lock: VALUE.LOCK.NO,
              };
            }
            break;

          case ACTION.ENERTIA_END:
            return {
              ...state,

              enertia: VALUE.ENERTIA.NO,
            };
            break;

          case ACTION.TRANSITION_END:
            return {
              ...state,

              transition: VALUE.TRANSITION.NO,
            };
            break;
        }

        return state;
      };

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

      document.querySelector('.expand__scroll').addEventListener('scroll', () => {
        if (state.point === VALUE.POINT.START && document.querySelector('.seq').getBoundingClientRect().top <= 0) {
          state = reducer(state, ACTION.HIT_ABOVE);
          console.log(state)
        } else if (state.point === VALUE.POINT.END && document.querySelector('.seq').getBoundingClientRect().bottom >= innerHeight) {
          state = reducer(state, ACTION.HIT_BELOW);
          console.log(state)
        }
      });

      window.addEventListener('mobile-seq:action', ({ detail }) => {
        state = reducer(state, detail)
        console.log(state)
      })
    }
  }
})
