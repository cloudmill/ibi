import 'scripts/preloader.js'
import 'scripts/start-video.js'
import 'scripts/xray.js'

import { signal } from 'scripts/communication.js'

window.addEventListener('pl:exist', () => {
  
  window.addEventListener('sv:ready', () => {
    signal('seq:pl:close')
  })
  
})