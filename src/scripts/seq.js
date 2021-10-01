window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.seq__canvas')

  if (canvas) {
    const ctx = canvas.getContext('2d')

    let imageReady = false
    
    let image = new Image()
    image.src = 'assets/images/seq/desktop/teeth_final_000.jpg'

    image.onload = () => {
      imageReady = true

      render()
    }

    function clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function render() {
      if (imageReady) {
        clear()

        ctx.drawImage(image, 0, 0)
      }
    }

    function updateCanvasSize() {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight

      render()
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    window.addEventListener('load', updateCanvasSize)

    const images = []

    Promise.all((() => {
      const loads = []

      for (let i = 0; i < 176; i++) {
        loads.push(new Promise(resolve => {
          const image = new Image()
          image.src = `assets/images/seq/desktop/teeth_final_${i < 10 ? ('00' + i) : (i < 100 ? ('0' + i) : i)}.jpg`

          images.push(image)

          image.onload = resolve
        }))
      }

      return loads
    })()).then(() => {
      console.log('all loaded')

      const container = canvas.closest('.seq')

      window.addEventListener('scroll', () => {
        const containerRect = container.getBoundingClientRect()

        if (containerRect.top <= 0 && containerRect.bottom >= window.innerHeight) {
          image = images[Math.floor(images.length * (-containerRect.top / (containerRect.height - window.innerHeight)))]
          render()
        } else {
          console.log('out')
        }
      })
    })
  }
})
