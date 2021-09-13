// preloader
// принимает сигнал от start-videо об ошибке/готовности

window.addEventListener('DOMContentLoaded', () => {
  const preloader = $('.preloader')

  if (preloader.length) {
    $(window).on('start-video-error', () => {
      console.log('preloader: start-video-error')
    })

    $(window).on('start-video-success', () => {
      console.log('preloader: start-video-success')
    })
  }
})

