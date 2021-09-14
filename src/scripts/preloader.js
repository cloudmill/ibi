window.addEventListener('DOMContentLoaded', () => {
  const preloader = $('.preloader')

  if (preloader.length) {
    $('body').css('overflow', 'hidden')

    $(window).on('start-video-error', () => {
      console.log('preloader: start-video-error')
    })

    $(window).on('start-video-success', () => {
      console.log('preloader: start-video-success')

      $('body').css('overflow', '')
      preloader.addClass('preloader--hidden')

      const closeEvent = new CustomEvent('preloader-close')
      window.dispatchEvent(new CustomEvent('preloader-close'))
    })
  }
})
