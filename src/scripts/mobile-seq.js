import { mediaQuery, BREAKPOINT } from "./mediaQuery";
import { DOMContentLoaded, load } from "./event";
import { sendSignal, onSignal } from "./signal";
import swipeDetect from "swipe-detect";

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

      const FPS = 15;

      const DELAY = 1000 / FPS;

      // ! STATE

      const VALUE = {
        POINT: {
          BEFORE: "BEFORE",
          PRE: "PRE",
          START: 0,
          END: 18,
          AFTER: "AFTER",
        },
        TRANSITION: {
          NO: "NO",
          YES: "YES",
        },
        TOUCH: {
          NO: "NO",
          YES: "YES",
        },
        LOCK: {
          NO: "NO",
          YES: "YES",
        },
      };

      const INITIAL_STATE = {
        point: VALUE.POINT.BEFORE,
        transition: VALUE.TRANSITION.NO,
        touch: VALUE.TOUCH.NO,
        lock: VALUE.LOCK.NO,
      };

      let state = INITIAL_STATE;

      const ACTION = {
        HIT_ABOVE: "HIT_ABOVE",
        HIT_BELOW: "HIT_BELOW",

        OUT_ABOVE: "OUT_ABOVE",
        OUT_BELOW: "OUT_BELOW",

        SWIPE_UP: "SWIPE_UP",
        SWIPE_DOWN: "SWIPE_DOWN",

        TRANSITION_END: "TRANSITION_END",

        NO_TOUCH: "NO_TOUCH",
        TOUCH: "TOUCH",

        STOP_END: "STOP_DELAY",
      };

      const reducer = (state, action) => {
        console.log("reducer:", action);

        switch (action) {
          case ACTION.HIT_ABOVE:
            return {
              ...state,

              point:
                state.touch === VALUE.TOUCH.NO
                  ? VALUE.POINT.START
                  : VALUE.POINT.PRE,
            };
          case ACTION.HIT_BELOW:
            return {
              ...state,

              point: VALUE.POINT.END,
            };

          case ACTION.OUT_ABOVE:
            return {
              ...state,

              point: VALUE.POINT.BEFORE,
            };
          case ACTION.OUT_BELOW:
            return {
              ...state,

              point: VALUE.POINT.AFTER,
            };

          case ACTION.SWIPE_UP:
            if (state.transition === VALUE.TRANSITION.NO) {
              if (state.point === VALUE.POINT.START) {
                sendSignal("mobile-seq:transition", {
                  from: state.point,
                  to: state.point + 1,

                  onComplete: () => {
                    sendSignal("mobile-seq:action", ACTION.TRANSITION_END);
                  },
                });

                ELEMENT.EXPAND_SCROLL.scrollTo(0, getStart());
                ELEMENT.EXPAND_SCROLL.style.overflow = "hidden";

                setTimeout(() => {
                  sendSignal("mobile-seq:action", ACTION.STOP_END);
                }, DELAY);

                return {
                  ...state,

                  point: state.point + 1,
                  transition: VALUE.TRANSITION.YES,
                  lock: VALUE.LOCK.YES,
                };
              }
            }
            break;
          case ACTION.SWIPE_DOWN:
            if (state.transition === VALUE.TRANSITION.NO) {
              if (state.point === VALUE.POINT.START + 1) {
                sendSignal("mobile-seq:transition", {
                  from: state.point,
                  to: state.point - 1,

                  onComplete: () => {
                    sendSignal("mobile-seq:action", ACTION.TRANSITION_END);
                  },
                });

                return {
                  ...state,

                  point: state.point - 1,
                  transition: VALUE.TRANSITION.YES,
                };
              }
            }
            break;

          case ACTION.TRANSITION_END:
            if (state.point === VALUE.POINT.START) {
              return {
                ...state,

                transition: VALUE.TRANSITION.NO,
                lock: VALUE.LOCK.NO,
              };
            }
            return {
              ...state,

              transition: VALUE.TRANSITION.NO,
            };

          case ACTION.NO_TOUCH:
            if (state.point === VALUE.POINT.PRE) {
              return {
                ...state,

                point: VALUE.POINT.START,
                touch: VALUE.TOUCH.NO,
              };
            }
            return {
              ...state,

              touch: VALUE.TOUCH.NO,
            };
          case ACTION.TOUCH:
            return {
              ...state,

              touch: VALUE.TOUCH.YES,
            };

          case ACTION.STOP_END:
            ELEMENT.EXPAND_SCROLL.style.overflow = "";
            break;
        }

        return { ...state };
      };

      // ! EVENTS

      onSignal(
        "mobile-seq:action",
        (action) => (state = reducer(state, action))
      );

      window.addEventListener(
        "touchmove",
        (e) => {
          if (state.lock === VALUE.LOCK.YES) {
            try {
              e.preventDefault();
            } catch (e) {
              console.log(e);
            }
          }
        },
        {
          passive: false,
        }
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

      window.addEventListener("touchstart", (e) => {
        if (state.touch === VALUE.TOUCH.NO) {
          state = reducer(state, ACTION.TOUCH);
        }
      });
      window.addEventListener("touchend", (e) => {
        if (!e.touches.length) {
          state = reducer(state, ACTION.NO_TOUCH);
        }
      });

      ELEMENT.EXPAND_SCROLL.addEventListener("scroll", () => {
        switch (state.point) {
          case VALUE.POINT.BEFORE:
            if (getY() >= getStart() + 1) {
              state = reducer(state, ACTION.HIT_ABOVE);
            }
            break;
          case VALUE.POINT.START:
          case VALUE.POINT.PRE:
            if (getY() <= getStart() - 1) {
              state = reducer(state, ACTION.OUT_ABOVE);
            }
            break;
          case VALUE.POINT.END:
            if (getY() >= getEnd() + 1) {
              state = reducer(state, ACTION.OUT_BELOW);
            }
            break;
          case VALUE.POINT.AFTER:
            if (getY() <= getEnd() - 1) {
              state = reducer(state, ACTION.HIT_BELOW);
            }
            break;
        }
      });

      // ! LOGGING

      const pre = document.createElement("pre");
      pre.style.cssText = `
        position: fixed;
        z-index: 1000000000;
        top: 0;
        left: 0;
        right: 0;

        pointer-events: none;

        color: red;
      `;

      setInterval(() => {
        pre.innerHTML = JSON.stringify(state, null, "\t");
      });

      document.body.append(pre);
    }
  }
});
