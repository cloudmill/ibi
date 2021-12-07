import { mediaQuery, BREAKPOINT } from "./mediaQuery";
import { DOMContentLoaded, load } from "./event";
import { sendSignal, onSignal } from "./signal";
import VanillaSwipe from "vanilla-swipe";

DOMContentLoaded.then(async () => {
  if (document.querySelector("[data-mobile-seq]")) {
    if (!mediaQuery(BREAKPOINT.TABLET)) {
      await load;

      // ! DATA & METHODS

      const LOGGING = false;

      let curAction = null;

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
          POST: "POST",
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
        if (LOGGING) {
          console.log("reducer:", action);

          curAction = action;
        }

        switch (action) {
          case ACTION.HIT_ABOVE:
            ELEMENT.EXPAND_SCROLL.scrollTo(0, getStart());
            ELEMENT.EXPAND_SCROLL.style.overflow = "hidden";

            setTimeout(() => {
              sendSignal("mobile-seq:action", ACTION.STOP_END);
            }, DELAY);

            return {
              ...state,

              point:
                state.touch === VALUE.TOUCH.NO
                  ? VALUE.POINT.START
                  : VALUE.POINT.PRE,
            };
          case ACTION.HIT_BELOW:
            ELEMENT.EXPAND_SCROLL.scrollTo(0, getEnd());
            ELEMENT.EXPAND_SCROLL.style.overflow = "hidden";

            setTimeout(() => {
              sendSignal("mobile-seq:action", ACTION.STOP_END);
            }, DELAY);

            return {
              ...state,

              point:
                state.touch === VALUE.TOUCH.NO
                  ? VALUE.POINT.END
                  : VALUE.POINT.POST,
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
            if (
              state.point === VALUE.POINT.POST ||
              state.point === VALUE.POINT.END
            ) {
              ELEMENT.EXPAND_SCROLL.scrollTo(0, getEnd());
            }

            if (state.transition === VALUE.TRANSITION.NO) {
              if (state.point === VALUE.POINT.START) {
                ELEMENT.EXPAND_SCROLL.scrollTo(0, getStart());
                ELEMENT.EXPAND_SCROLL.style.overflow = "hidden";

                setTimeout(() => {
                  sendSignal("mobile-seq:action", ACTION.STOP_END);
                }, DELAY);
              }

              if (
                state.point >= VALUE.POINT.START &&
                state.point < VALUE.POINT.END
              ) {
                sendSignal("mobile-seq:transition", {
                  from: state.point,
                  to: state.point + 1,

                  onComplete: () => {
                    sendSignal("mobile-seq:action", ACTION.TRANSITION_END);
                  },
                });

                return {
                  ...state,

                  point: state.point + 1,
                  lock:
                    state.point === VALUE.POINT.START
                      ? VALUE.LOCK.YES
                      : state.lock,
                  transition: VALUE.TRANSITION.YES,
                };
              }
            }
            break;
          case ACTION.SWIPE_DOWN:
            if (
              state.point === VALUE.POINT.PRE ||
              state.point === VALUE.POINT.START
            ) {
              ELEMENT.EXPAND_SCROLL.scrollTo(0, getStart());
            }

            if (state.transition === VALUE.TRANSITION.NO) {
              if (state.point === VALUE.POINT.END) {
                ELEMENT.EXPAND_SCROLL.scrollTo(0, getEnd());
                ELEMENT.EXPAND_SCROLL.style.overflow = "hidden";

                setTimeout(() => {
                  sendSignal("mobile-seq:action", ACTION.STOP_END);
                }, DELAY);
              }

              if (
                state.point > VALUE.POINT.START &&
                state.point <= VALUE.POINT.END
              ) {
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
                  lock:
                    state.point === VALUE.POINT.END
                      ? VALUE.LOCK.YES
                      : state.lock,
                  transition: VALUE.TRANSITION.YES,
                };
              }
            }
            break;

          case ACTION.TRANSITION_END:
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

            return {
              ...state,

              transition: VALUE.TRANSITION.NO,
            };

          case ACTION.NO_TOUCH:
            switch (state.point) {
              case VALUE.POINT.PRE:
                ELEMENT.EXPAND_SCROLL.scrollTo(0, getStart());
                ELEMENT.EXPAND_SCROLL.style.overflow = "hidden";

                setTimeout(() => {
                  sendSignal("mobile-seq:action", ACTION.STOP_END);
                }, DELAY);

                return {
                  ...state,

                  point: VALUE.POINT.START,
                  touch: VALUE.TOUCH.NO,
                };
              case VALUE.POINT.POST:
                ELEMENT.EXPAND_SCROLL.scrollTo(0, getEnd());
                ELEMENT.EXPAND_SCROLL.style.overflow = "hidden";

                setTimeout(() => {
                  sendSignal("mobile-seq:action", ACTION.STOP_END);
                }, DELAY);

                return {
                  ...state,

                  point: VALUE.POINT.END,
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
              if (LOGGING) {
                console.log(e);
              }
            }
          }
        },
        {
          passive: false,
        }
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

      new VanillaSwipe({
        element: window,
        onSwiping: (e, { directionY }) => {
          switch (directionY) {
            case "TOP":
              state = reducer(state, ACTION.SWIPE_UP);
              break;
            case "BOTTOM":
              state = reducer(state, ACTION.SWIPE_DOWN);
              break;
          }
        },
      }).init();

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

      if (LOGGING) {
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
          pre.innerHTML =
            JSON.stringify(state, null, "\t") +
            "\ny: " +
            getY() +
            "\nlast action: " +
            curAction;
        });

        document.body.append(pre);
      }
    }
  }
});
