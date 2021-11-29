const BREAKPOINT = {
  TABLET: 1024,
}

if (!matchMedia(`(min-width: ${BREAKPOINT.TABLET}px)`)) {
  console.log('mobile-seq start')
}
