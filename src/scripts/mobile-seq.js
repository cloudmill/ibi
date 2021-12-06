import { mediaQuery, BREAKPOINT } from "./mediaQuery";
import { DOMContentLoaded, load } from "./event";
import { sendSignal, onSignal } from "./signal";
import swipeDetect from "swipe-detect";
import { get } from "jquery";

DOMContentLoaded.then(async () => {
  if (document.querySelector("[data-mobile-seq]")) {
    if (!mediaQuery(BREAKPOINT.TABLET)) {
      await load;

      // ! DATA & METHODS

      const ELEMENT = {
        EXPAND_SCROLL: document.querySelector(".expand__scroll"),

        SEQ: document.querySelector(".seq"),
        SEQ_FULLSCREEN: document.querySelector(".seq__fullscreen"),
      };

      function getY() {
        return ELEMENT.EXPAND_SCROLL.scrollTop;
      }

      function getRect(element) {
        return element.getBoundingClientRect();
      }

      function getStart() {
        return getY() + getRect(ELEMENT.SEQ).top + 1;
      }
      function getEnd() {
        return (
          getY() +
          getRect(ELEMENT.SEQ).bottom -
          getRect(ELEMENT.SEQ_FULLSCREEN).height
        );
      }

      const getDir = (() => {
        let prevY = null;
        let nextY = getY();

        return () => {
          prevY = nextY;
          nextY = getY();

          return prevY < nextY ? "down" : "up";
        };
      })();

      const FPS = 15;

      const DELAY = 1000 / FPS;

      const TRANSITION_DURATION = 250;

      // ! STATE

      const VALUE = {
        POINT: {
          BEFORE: "BEFORE",
          AFTER: "AFTER",

          PRE: "PRE",
          POST: "POST",

          START: 0,
          END: 18,
        },
        LOCK: {
          YES: "YES",
          NO: "NO",
        },
        TOUCH: {
          YES: "YES",
          NO: "NO",
        },
        TRANSITION: {
          YES: "YES",
          NO: "NO",
        },
      };

      const ACTION = {
        HIT_ABOVE: "HIT_ABOVE",
        HIT_BELOW: "HIT_BELOW",

        OUT_ABOVE: "OUT_ABOVE",
        OUT_BELOW: "OUT_BELOW",

        SCROLL_UP: "SCROLL_UP",
        SCROLL_DOWN: "SCROLL_DOWN",

        TOUCH: "TOUCH",
        NO_TOUCH: "NO_TOUCH",

        SWIPE_UP: "SWIPE_UP",
        SWIPE_DOWN: "SWIPE_DOWN",

        TRANSITION_END: "TRANSITION_END",

        PRE_END: "PRE_END",
        POST_END: "POST_END",
      };

      const INITIAL_STATE = {
        point: VALUE.POINT.BEFORE,
        lock: VALUE.LOCK.NO,
        touch: VALUE.TOUCH.NO,
        transition: VALUE.TRANSITION.NO,
      };

      let state = INITIAL_STATE;

      const reducer = (state, action) => {
        action && console.log(action);

        switch (action) {
          case ACTION.TOUCH:
            if (state.point === VALUE.POINT.START) {
              ELEMENT.EXPAND_SCROLL.scrollTo(0, getStart());
            }

            if (state.point === VALUE.POINT.END) {
              ELEMENT.EXPAND_SCROLL.scrollTo(0, getEnd());
            }

            return {
              ...state,

              touch: VALUE.TOUCH.YES,
            };
            break;
          case ACTION.NO_TOUCH:
            if (state.point === VALUE.POINT.PRE) {
              setTimeout(() => {
                sendSignal("mobile-seq:action", ACTION.PRE_END);
              }, DELAY);
            }

            if (state.point === VALUE.POINT.POST) {
              setTimeout(() => {
                sendSignal("mobile-seq:action", ACTION.POST_END);
              }, DELAY);
            }

            return {
              ...state,

              touch: VALUE.TOUCH.NO,
            };
            break;

          case ACTION.SWIPE_UP:
            if (state.transition === VALUE.TRANSITION.NO) {
              if (
                state.point >= VALUE.POINT.START &&
                state.point < VALUE.POINT.END
              ) {
                sendSignal("mobile-seq:next", {
                  from: state.point,
                  timeout: TRANSITION_DURATION,
                });

                setTimeout(() => {
                  sendSignal("mobile-seq:action", ACTION.TRANSITION_END);
                }, TRANSITION_DURATION);
              }

              if (state.point === VALUE.POINT.START) {
                return {
                  ...state,

                  point: state.point + 1,
                  lock: VALUE.LOCK.YES,
                  transition: VALUE.TRANSITION.YES,
                };
              }

              if (
                state.point > VALUE.POINT.START &&
                state.point < VALUE.POINT.END
              ) {
                return {
                  ...state,

                  point: state.point + 1,
                  transition: VALUE.TRANSITION.YES,
                };
              }
            }
            break;
          case ACTION.SWIPE_DOWN:
            if (state.transition === VALUE.TRANSITION.NO) {
              if (
                state.point > VALUE.POINT.START &&
                state.point <= VALUE.POINT.END
              ) {
                sendSignal("mobile-seq:prev", {
                  from: state.point,
                  timeout: TRANSITION_DURATION,
                });

                setTimeout(() => {
                  sendSignal("mobile-seq:action", ACTION.TRANSITION_END);
                }, TRANSITION_DURATION);
              }

              if (state.point === VALUE.POINT.END) {
                return {
                  ...state,

                  point: state.point - 1,
                  lock: VALUE.LOCK.YES,
                  transition: VALUE.TRANSITION.YES,
                };
              }

              if (
                state.point > VALUE.POINT.START &&
                state.point < VALUE.POINT.END
              ) {
                return {
                  ...state,

                  point: state.point - 1,
                  transition: VALUE.TRANSITION.YES,
                };
              }
            }
            break;

          case ACTION.HIT_ABOVE:
            return {
              ...state,

              point:
                state.touch === VALUE.TOUCH.YES
                  ? VALUE.POINT.PRE
                  : VALUE.POINT.START,
            };
            break;
          case ACTION.HIT_BELOW:
            return {
              ...state,

              point:
                state.touch === VALUE.TOUCH.YES
                  ? VALUE.POINT.POST
                  : VALUE.POINT.END,
            };
            break;

          case ACTION.OUT_ABOVE:
            return {
              ...state,

              point: VALUE.POINT.BEFORE,
            };
            break;
          case ACTION.OUT_BELOW:
            return {
              ...state,

              point: VALUE.POINT.AFTER,
            };
            break;

          case ACTION.TRANSITION_END:
            if (state.transition === VALUE.TRANSITION.YES) {
              if (
                state.point > VALUE.POINT.START &&
                state.point < VALUE.POINT.END
              ) {
                return {
                  ...state,

                  transition: VALUE.TRANSITION.NO,
                };
              }

              if (
                state.point === VALUE.POINT.START ||
                state.point === VALUE.POINT.END
              ) {
                return {
                  ...state,

                  lock: VALUE.LOCK.NO,
                  transition: VALUE.TRANSITION.NO,
                };
              }
            }
            break;

          case ACTION.PRE_END:
            if (state.point === VALUE.POINT.PRE) {
              return {
                ...state,

                point: VALUE.POINT.START,
              };
            }
            break;
          case ACTION.POST_END:
            if (state.point === VALUE.POINT.POST) {
              return {
                ...state,

                point: VALUE.POINT.END,
              };
            }
            break;
            
          case ACTION.SCROLL_UP:
            if (state.point === VALUE.POINT.PRE || state.point === VALUE.POINT.START) {
              ELEMENT.EXPAND_SCROLL.scrollTo(0, getStart());
            }
            break;
          case ACTION.SCROLL_DOWN:
            if (state.point === VALUE.POINT.POST || state.point === VALUE.POINT.END) {
              ELEMENT.EXPAND_SCROLL.scrollTo(0, getEnd());
            }
            break;
        }

        return state;
      };

      // ! EVENTS

      window.addEventListener(
        "touchstart",
        (e) =>
          (state = reducer(
            state,
            state.touch === VALUE.TOUCH.NO && e.touches.length
              ? ACTION.TOUCH
              : null
          ))
      );
      window.addEventListener(
        "touchend",
        (e) =>
          (state = reducer(state, !e.touches.length ? ACTION.NO_TOUCH : null))
      );

      swipeDetect(
        window,
        (dir) => {
          switch (dir) {
            case "up":
              state = reducer(state, ACTION.SWIPE_UP);
              break;
            case "down":
              state = reducer(state, ACTION.SWIPE_DOWN);
              break;
          }
        },
        0
      );

      ELEMENT.EXPAND_SCROLL.addEventListener("scroll", () => {
        switch (state.point) {
          case VALUE.POINT.BEFORE:
            state = reducer(
              state,
              getY() >= getStart() + 1 ? ACTION.HIT_ABOVE : null
            );
            break;
          case VALUE.POINT.PRE:
          case VALUE.POINT.START:
            state = reducer(
              state,
              getY() <= getStart() - 1 ? ACTION.OUT_ABOVE : null
            );
            break;
          case VALUE.POINT.POST:
          case VALUE.POINT.END:
            state = reducer(
              state,
              getY() >= getEnd() + 1 ? ACTION.OUT_BELOW : null
            );
            break;
          case VALUE.POINT.AFTER:
            state = reducer(
              state,
              getY() <= getEnd() - 1 ? ACTION.HIT_BELOW : null
            );
            break;
        }

        switch (getDir()) {
          case "up":
            state = reducer(state, ACTION.SCROLL_UP);
            break;
          case "down":
            state = reducer(state, ACTION.SCROLL_DOWN);
            break;
        }
      });

      window.addEventListener(
        "touchmove",
        (e) => {
          if (state.lock === VALUE.LOCK.YES) {
            try {
              e.preventDefault();
            } catch (err) {
              console.error(err);
            }
          }
        },
        {
          passive: false,
        }
      );

      onSignal(
        "mobile-seq:action",
        (action) => (state = reducer(state, action))
      );

      // ! LOGGING

      const pre = document.createElement("pre");
      pre.style.cssText = `
        position: fixed;
        z-index: 1000000000;
        top: 0;
        left: 0;
        right: 0;
        
        pointer-events: none;

        color: green;
      `;
      document.body.append(pre);

      setInterval(() => {
        pre.innerHTML = JSON.stringify(state, null, "\t");
      });
    }
  }
});
