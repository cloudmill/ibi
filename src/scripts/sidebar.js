import StickySidebar from 'sticky-sidebar'
// import { signal } from 'scripts/communication.js'

window.addEventListener('DOMContentLoaded', () => {
  const sidebarTrack = document.querySelector('.sidebar-track')

  if (sidebarTrack) {
    const updateSidebarTrack = (() => {
      const footer = document.querySelector('.footer')

      return () => {
        const footerRect = footer.getBoundingClientRect()
        const footerPageY = pageYOffset + footerRect.y

        sidebarTrack.style.height = footerPageY + 'px'   
      }
    })()

    const sidebar = sidebarTrack.querySelector('.sidebar')
    const stickySidebar = new StickySidebar(sidebar, {
      containerSelector: '.sidebar-track__inner',
      innerWrapperSelector: '.sidebar__inner',
      topSpacing: 150,
      bottomSpacing: 100,
      resizeSensor: false,
    })
    // signal('sidebar:1', stickySidebar)

    updateSidebarTrack()
    stickySidebar.updateSticky()
    window.addEventListener('load', () => {
      updateSidebarTrack()
      stickySidebar.updateSticky()
    })

    setInterval(() => {
      stickySidebar.updateSticky()
    }, 100)
  }
})
