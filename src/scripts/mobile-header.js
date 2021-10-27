import { mediaQuery } from 'scripts/mediaQueries.js'

if (!mediaQuery.matches) {
  $(() => {
    // data
    const elements = {
      root: $('.mobile-header'),
    }
  
    if (elements.root.length) {
      const CLASS = {
        PANEL: {
          HIDE: 'mobile-header__panel--hide',
          BACKGROUND: 'mobile-header__panel--background',
        },
        MENU: {
          OPEN: 'mobile-header__menu--open',
        },
      }
  
      elements.panel = elements.root.find('.mobile-header__panel')
      elements.menu = elements.root.find('.mobile-header__menu')
      elements.menuClose = elements.root.find('.mobile-header__menu-close')

      let isScreenAnimation = false
      let curScreen = null
  
      // methods
      const updatePanelHide = (() => {
        let prevScrollY = pageYOffset
        let curScrollY = pageYOffset
  
        return function () {
          prevScrollY = curScrollY
          curScrollY = pageYOffset
  
          if (prevScrollY < curScrollY) {
            elements.panel.addClass(CLASS.PANEL.HIDE)
          } else {
            elements.panel.removeClass(CLASS.PANEL.HIDE)
          }
        }
      })()
      function updatePanelBackground() {
        if (pageYOffset < 1) {
          elements.panel.removeClass(CLASS.PANEL.BACKGROUND)
        } else {
          elements.panel.addClass(CLASS.PANEL.BACKGROUND)
        }
      }
      function initScreen() {
        const startScreenID = elements.menuClose.data('screen-id')
        const startScreen = elements.menu.find(`.mobile-header__screen[data-screen-id="${startScreenID}"]`).clone()

        elements.menu.append(startScreen)

        curScreen = startScreen
      }
  
      // init
      updatePanelBackground()
      initScreen()
  
      // ui events
      elements.menuClose.on('click', () => {
        // body
        {
          const body = document.body
          const bodyStyle = getComputedStyle(body)
          const bodyOverflow = bodyStyle.overflow
  
          if (bodyOverflow !== 'visible') {
            body.style.overflow = ''
          } else {
            body.style.overflow = 'hidden'
          }
        }
  
        // menu
        {
          elements.menu.toggleClass(CLASS.MENU.OPEN)
        }
  
        // panel
        {
          if (elements.menu.hasClass(CLASS.MENU.OPEN)) {
            elements.panel.removeClass(CLASS.PANEL.HIDE)
            elements.panel.addClass(CLASS.PANEL.BACKGROUND)
          } else {
            if (pageYOffset < 1) {
              elements.panel.removeClass(CLASS.PANEL.BACKGROUND)
            } else {
              elements.panel.addClass(CLASS.PANEL.BACKGROUND)
            }
          }
        }
      })
      $(window).on('scroll', () => {
        // panel
        {
          // background
          updatePanelBackground()
  
          // hide
          updatePanelHide()
        }
      })
      elements.menu.on('click', (e) => {
        const screenLink = $(e.target).closest('a[data-screen-id]')

        if (!isScreenAnimation && screenLink.length) {
          e.preventDefault()
          
          isScreenAnimation = true
          setTimeout(() => {
            isScreenAnimation = false
          }, 500)

          const nextScreenID = screenLink.data('screen-id')
          const nextScreen = elements.menu.find(`.mobile-header__screen[data-screen-id="${nextScreenID}"]`).clone()
          
          const screenAnimation = screenLink.data('screen-animation')

          nextScreen.css('transform', `translateX(${screenAnimation === 'left' ? '-' : ''}100%)`)

          elements.menu.append(nextScreen)

          setTimeout(() => {
            curScreen.css('transform', `translateX(${screenAnimation === 'left' ? '' : '-'}100%)`)
            nextScreen.css('transform', '')

            setTimeout(() => {
              curScreen.remove()
              curScreen = nextScreen
            }, 500)
          })
        }
      })
    }
  })
}

