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

      // ! STATE

      const VALUE = {
        POINT: {
          BEFORE: "BEFORE",
          START: 0,
          END: 18,
          AFTER: "AFTER",
        },
        TRANSITION: {
          NO: "NO",
          YES: "YES",
        },
      };

      const INITIAL_STATE = {
        point: VALUE.POINT.BEFORE,
        transition: VALUE.TRANSITION.NO,
      };

      let state = INITIAL_STATE;

      const ACTION = {
        HIT_ABOVE: "HIT_ABOVE",
        HIT_BELOW: "HIT_BELOW",

        OUT_ABOVE: "OUT_ABOVE",
        OUT_BELOW: "OUT_BELOW",

        SWIPE_UP: "SWIPE_UP",
        SWIPE_DOWN: "SWIPE_DOWN",
      };

      const reducer = (state, action) => {
        console.log("reducer:", action);

        switch (action) {
          case ACTION.HIT_ABOVE:
            return {
              ...state,

              point: VALUE.POINT.START,
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
            if (
              state.point === VALUE.POINT.START &&
              state.transition === VALUE.TRANSITION.NO
            ) {
              // вызов анимации

              return {
                ...state,

                point: state.point + 1,
                transition: VALUE.TRANSITION.YES,
              };
            }
        }

        return { ...state };
      };

      // ! EVENTS

      ELEMENT.EXPAND_SCROLL.addEventListener("scroll", () => {
        switch (state.point) {
          case VALUE.POINT.BEFORE:
            if (getY() >= getStart() + 1) {
              state = reducer(state, ACTION.HIT_ABOVE);
            }
            break;
          case VALUE.POINT.START:
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
