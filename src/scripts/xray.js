const UPDATE_FPS = 1

const log = (...msg) => {
  console.log(['xray:', ...msg].join(' '))
}

$(() => {
  const components = $('.xray')

  components.each(function () {
    const $component = $(this)
    const component = $component[0]
    const $image = $component.find('.xray__image')

    const update = () => {
      const style = getComputedStyle(component)
      const width = style.width.slice(0, -2)
      const height = style.height.slice(0, -2)

      $component.attr('viewBox', `0 0 ${width} ${height}`)
      $image.attr('width', width)
      $image.attr('height', height)

      log('update', width, height)
    }

    setInterval(update, 1000 / UPDATE_FPS)
  })
})
