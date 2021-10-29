import ResizeSensor from './ResizeSensor'
import stickySidebar from 'sticky-sidebar'

// ResizeSensor должна быть доступна глобально, дабы stickySidebar смог ее использовать
// Изначально import не делает ее доступной глобально
window.ResizeSensor = ResizeSensor

window.addEventListener('DOMContentLoaded', () => {
  if ($('.test-container').length) {
    const sidebar = new stickySidebar('.test-sidebar', {
      topSpacing: 20,
      bottomSpacing: 20,
      containerSelector: '.test-container',
      innerWrapperSelector: '.test-sidebar-inner',
      minWidth: 1280,
    })
  
    let flag = true
    $('button').on('click', () => {
      $('.test-my-sidebar').css('height', flag ? '150vh' : '')
      flag = !flag
    })
  }
})
