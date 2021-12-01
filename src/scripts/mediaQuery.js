const mediaQuery = breakpoint => matchMedia(`(min-width: ${breakpoint}px)`).matches

const BREAKPOINT = {
  DEFAULT: 1280,
  TABLET: 1024,
}



export { mediaQuery, BREAKPOINT }
