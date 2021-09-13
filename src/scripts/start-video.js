// start-video
// отдает сигнал (custom event) preloader'у об ошибке/готовности

window.addEventListener('DOMContentLoaded', () => {
  const startVideo = $('.start-video')

  if (startVideo.length) {
    startVideo.on('error', () => {
      console.log('start-video: error')

      const errorEvent = new CustomEvent('start-video-error')

      window.dispatchEvent(errorEvent)
    })

    startVideo.on('canplaythrough', () => {
      console.log('start-video: canplaythrough')

      const successEvent = new CustomEvent('start-video-success')

      window.dispatchEvent(successEvent)
    })
  }
})