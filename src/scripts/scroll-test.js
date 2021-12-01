window.addEventListener('DOMContentLoaded', () => {
  const scrollTest = document.querySelector('.scroll-test')

  if (scrollTest) {
    let flag = true

    let touch = false

    let wait = false

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
        
        setTimeout(() => {
          if (!touch) {
            document.body.style.overflow = ''
          } else {
            wait = true
          }
        }, 1000 / 15)
      }
    })
  }
})
