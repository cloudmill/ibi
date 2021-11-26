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
          SHOW: 'mobile-header__panel--show',
        },
        MENU: {
          OPEN: 'mobile-header__menu--open',
        },
      }
      const ANIMATION_DURATION = 500

      const expand = document.querySelector('.expand')
      const expandScroll = expand.querySelector('.expand__scroll')
  
      elements.panel = elements.root.find('.mobile-header__panel')
      elements.menu = elements.root.find('.mobile-header__menu')
      elements.menuClose = elements.root.find('.header__button-button')
      elements.screens = elements.root.find('.mobile-header__screens')

      const state = {
        curScreen: null,
        isScreenAnimation: false,
      }
  
      // methods
      function checkExpand() {
        return expand && !matchMedia(`(min-width: 1024px)`).matches
      }
      function getScrollY() {
        return checkExpand() ? expandScroll.scrollTop : window.scrollY
      }
      const updatePanelHide = (() => {
        let prevScrollY = getScrollY()
        let curScrollY = getScrollY()
  
        return function () {
          prevScrollY = curScrollY
          curScrollY = getScrollY()
  
          if (prevScrollY < curScrollY) {
            elements.panel.addClass(CLASS.PANEL.HIDE)
          } else {
            elements.panel.removeClass(CLASS.PANEL.HIDE)
          }

          if (curScrollY < 1) {
            elements.panel.removeClass(CLASS.PANEL.HIDE)
          }
        }
      })()
      function updatePanelBackground() {
        if (getScrollY() < 1) {
          elements.panel.removeClass(CLASS.PANEL.BACKGROUND)
        } else {
          elements.panel.addClass(CLASS.PANEL.BACKGROUND)
        }
      }
      function initScreen() {
        const startScreenID = elements.menuClose.data('screen-id')
        const startScreen = elements.screens.find(`.mobile-header__screen[data-screen-id="${startScreenID}"]`).clone()

        elements.menu.append(startScreen)

        state.curScreen = startScreen
      }
      function scrollHandler() {
        // panel
        {
          // background
          updatePanelBackground()
  
          // hide
          updatePanelHide()
        }
      }
  
      // init
      updatePanelBackground(scrollY)
      initScreen()
  
      // ui events
      elements.menuClose.on('click', () => {
        // menuClose
        {
          if (elements.menuClose[0].hasAttribute('data-modal-active')) {
            elements.menuClose[0].removeAttribute('data-modal-active')
          } else {
            elements.menuClose[0].setAttribute('data-modal-active', '')
          }
        }

        // body
        {
          const body = document.body
          const bodyStyle = getComputedStyle(body)
          const bodyOverflow = bodyStyle.overflow
  
          if (bodyOverflow !== 'visible') {
            body.style.cssText = ''
          } else {
            body.style.cssText = `
              position: relative;
              height: 100%;
              overflow: hidden;
            `
          }

          $('.wrapper').css('overlfow')
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
            if (getScrollY() < 1) {
              elements.panel.removeClass(CLASS.PANEL.BACKGROUND)
            } else {
              elements.panel.addClass(CLASS.PANEL.BACKGROUND)
            }
          }
          
          $(elements.panel).toggleClass(CLASS.PANEL.SHOW)
        }
      })

      if (checkExpand()) {
        expandScroll.addEventListener('scroll', scrollHandler)
      } else {
        $(window).on('scroll', scrollHandler)
      }

      elements.menu.on('click', (e) => {
        const link = $(e.target).closest('a[data-screen-id]')

        if (!state.isScreenAnimation && link.length) {
          e.preventDefault()
          state.isScreenAnimation = true

          const nextScreenID = link.data('screen-id')
          const nextScreen = elements.screens.find(`.mobile-header__screen[data-screen-id="${nextScreenID}"]`).clone()
          
          const animationType = link.data('screen-animation')

          switch (animationType) {
            case 'left':
              state.curScreen.addClass('mobile-header__screen--to--right')
              nextScreen.addClass('mobile-header__screen--from--left')
              break
            case 'right':
              state.curScreen.addClass('mobile-header__screen--to--left')
              nextScreen.addClass('mobile-header__screen--from--right')
              break
          }

          elements.menu.append(nextScreen)

          setTimeout(() => {
            state.isScreenAnimation = false

            state.curScreen.remove()
            state.curScreen = nextScreen
          }, ANIMATION_DURATION)
        }
      })
    }
  })
}

