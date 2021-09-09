const IMAGE_WIDTH = 1920
const IMAGE_HEIGHT = 915

const ELLIPSE_WIDTH = 383
const ELLIPSE_HEIGHT = 230

const MOUSEMOVE_FPS = 60

$(() => {
  const components = $('.xray')

  components.each(function () {
    const component = $(this)
    const ellipse = component.find('.xray__ellipse')
    const images = component.find('.xray__image')

    function initComponent() {
      component.attr('viewBox', `0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT}`)

      ellipse.attr('cx', -(ELLIPSE_WIDTH / 2))
      ellipse.attr('cy', -(ELLIPSE_HEIGHT / 2))
      ellipse.attr('rx', ELLIPSE_WIDTH / 2)
      ellipse.attr('ry', ELLIPSE_HEIGHT / 2)

      images.attr('width', IMAGE_WIDTH)
      images.attr('height', IMAGE_HEIGHT)
    }

    initComponent()

    function updateEllipse(event) {
      const mouseX = event.originalEvent.clientX
      const mouseY = event.originalEvent.clientY

      const componentPos = component[0].getBoundingClientRect()

      const componentX = componentPos.x
      const componentY = componentPos.y
      const componentWidth = componentPos.width
      const componentHeight = componentPos.height

      const componentRatio = componentWidth / componentHeight
      const imageRatio = IMAGE_WIDTH / IMAGE_HEIGHT

      if (componentRatio < imageRatio) {
        const imageWidth = imageRatio * componentHeight

        const x = mouseX - (componentX - ((imageWidth - componentWidth) / 2))
        const y = mouseY - componentY

        const xNorm = x / imageWidth
        const yNorm = y / componentHeight

        const ellipseX = IMAGE_WIDTH * xNorm
        const ellipseY = IMAGE_HEIGHT * yNorm
        
        ellipse.attr('cx', ellipseX)
        ellipse.attr('cy', ellipseY)
      } else {
        const imageHeight = componentWidth / imageRatio

        const x = mouseX - componentX
        const y = mouseY - (componentY - ((imageHeight - componentHeight) / 2))

        const xNorm = x / componentWidth
        const yNorm = y / imageHeight

        const ellipseX = IMAGE_WIDTH * xNorm
        const ellipseY = IMAGE_HEIGHT * yNorm

        ellipse.attr('cx', ellipseX)
        ellipse.attr('cy', ellipseY)
      }
    }

    function handleMousemove(event) {
      updateEllipse(event)

      setTimeout(() => {
        $(window).one('mousemove', handleMousemove)
      }, 1000 / MOUSEMOVE_FPS)
    }

    $(window).one('mousemove', handleMousemove)
  })
})
