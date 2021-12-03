import swipeDetect from 'swipe-detect'

window.addEventListener('DOMContentLoaded', () => {
  const scrollTest = document.querySelector('.scroll-test')

  if (scrollTest) {
    let flag = true

    let touch = false

    let wait = false

    const pre = document.createElement('pre')
    pre.style.cssText = `
      position: fixed;
      z-index: 1000000000;
      top: 0;
      left: 0;
      right: 0;

      pointer-events: none;

      color: green;
    `
    document.body.append(pre)
    setInterval(() => {
      pre.innerHTML = JSON.stringify({
        flag,
        touch,
        wait,
      }, null, '\t')
    })

    window.addEventListener('touchstart', e => {
      if (e.touches.length) {
        touch = true
      }
    })
    window.addEventListener('touchend', e => {
      if (!e.touches.length) {
        touch = false

        if (wait) {
          document.body.style.overflow = ''

          wait = false
        }
      }
    })

    window.addEventListener('scroll', () => {
      const edge = document.querySelector('.scroll-test__edge')
      const edgeRect = edge.getBoundingClientRect()
      const edgeTop = edgeRect.top
      
      if (flag && edgeTop < 0) {
        flag = false
        
        const edgeYOffset = edgeTop + pageYOffset
        window.scrollTo(0, edgeYOffset)
        
        document.body.style.overflow = 'hidden'

        if (touch) {
          wait = true
        }
        
        setTimeout(() => {
          if (!touch) {
            document.body.style.overflow = ''

            wait = false
          }
        }, 1000 / 15)
      }
    })

    swipeDetect(window, console.log, 0)
  }
})
