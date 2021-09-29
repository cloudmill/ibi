window.addEventListener('load', () => {
  const seq = document.querySelector('.seq')

  if (seq) {
    // data
    let seqY = getSeqY()
    let seqMarginTop = 60
  
    let framesLoaded = false

    let stage = 'before'
  
    // methods
    function getSeqY() {
      const seqRect = seq.getBoundingClientRect()
  
      return pageYOffset + seqRect.top
    }
  
    // events
    setTimeout(() => {
      window.scrollTo(0, 0)
    })
  
    window.addEventListener('resize', () => {
      seqY = getSeqY()
    })
  
    // window.addEventListener('scroll', () => {
    //   console.log(
    //     'scroll',
    //     pageYOffset,
    //     seqY
    //   )

    //   const yBreakpoint = seqY - seqMarginTop

    //   switch (stage) {
    //     case 'before':
    //       if (pageYOffset >= yBreakpoint) {
    //         stage = 'seq'

    //         window.scrollTo(0, yBreakpoint)
    //       }
    //     break;
    //     case 'seq':

    //     break;
    //     case 'after':

    //     break;
    //   }
    // })

    // window.addEventListener('wheel', event => {
    //   console.log(
    //     'wheel',
    //     pageYOffset,
    //     seqY
    //   )

    //   if (!framesLoaded || stage === 'seq') {
    //     event.preventDefault()
    //   }
    // }, {
    //   passive: false,
    // })

    window.addEventListener('scroll', event => {
      if (pageYOffset > seqY - seqMarginTop) {
        requestAnimationFrame(() => {
          window.scrollTo(0, seqY - seqMarginTop)
        })
      }
    })

    setTimeout(() => {
      framesLoaded = true
    }, 1000)
  }
})
