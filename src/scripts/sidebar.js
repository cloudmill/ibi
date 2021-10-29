import { mediaQuery } from './mediaQueries'
import ResizeSensor from './ResizeSensor'
import stickySidebar from 'sticky-sidebar'

if (mediaQuery.matches) {
  window.addEventListener('DOMContentLoaded', () => {
    if ($('.sidebar').length) {
      const OFFSET_TOP = 140
  
      // ResizeSensor должна быть доступна глобально, дабы stickySidebar смог ее использовать
      // Изначально import не делает ее доступной глобально
      window.ResizeSensor = ResizeSensor

      const sidebar = new stickySidebar('.sidebar__sidebar', {
        topSpacing: OFFSET_TOP,
        containerSelector: '.sidebar__container',
        innerWrapperSelector: '.sidebar__sidebar-inner',
      })
    }
  })
}
