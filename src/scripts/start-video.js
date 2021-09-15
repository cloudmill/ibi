import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', () => {
  const startVideo = document.querySelector('.start-video')
  
  if (startVideo) {

    startVideo.addEventListener('canplaythrough', () => {
      signal('sv:ready')
    })
    
  }
})

// window.addEventListener('DOMContentLoaded', () => {
//   const startVideo = $('.start-video')
//   const startVideoEl = startVideo[0]

//   if (startVideo.length) {
//     startVideo.on('error', () => {
//       console.log('start-video: error')

//       const errorEvent = new CustomEvent('start-video-error')
//       window.dispatchEvent(errorEvent)
//     })

//     startVideo.on('canplaythrough', () => {
//       console.log('start-video: canplaythrough')

//       const successEvent = new CustomEvent('start-video-success')
//       window.dispatchEvent(successEvent)
//     })

//     window.addEventListener('preloader-close', () => {
//       console.log('start-video: start');

//       startVideoEl.play()
//     })

//     startVideo.on('ended', () => {
//       console.log('start-video: end')

//       startVideo.addClass('start-video--hidden')

//       const successEvent = new CustomEvent('start-video-end')
//       window.dispatchEvent(successEvent)
//     })

//     function getComponentSize() {
//       const componentRect = startVideoEl.getBoundingClientRect()

//       return [componentRect.width, componentRect.height]
//     }

//     function getComponentAspect() {
//       const componentSize = getComponentSize()

//       return componentSize[0] / componentSize[1]
//     }

//     window.addEventListener('xray-change-size', event => {
//       const containerSize = event.detail
//       const containerAspect = containerSize[0] / containerSize[1]

//       const componentAspect = getComponentAspect()

//       if (containerAspect > componentAspect) {
//         const componentSize = getComponentSize()

//         const newComponentHeight = componentSize[1] * (containerSize[0] / componentSize[0])

//         startVideo.css('max-height', 'none')
//         startVideo.css('height', newComponentHeight + 'px')
//       } else {
//         startVideo.css('max-height', '')
//         startVideo.css('height', '')
//       }
//     })
//   }
// })