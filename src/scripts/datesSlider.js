window.addEventListener('DOMContentLoaded', () => {
  const components = document.querySelectorAll('.dates')

  components.forEach(component => {
    // data
    let tabs
    let activeTabIndex

    // methods
    function init() {
      tabs = component.querySelectorAll('.dates__tab')
      activeTabIndex = 0

      (async () => {
        await openTab(activeTabIndex)
        await closeTab(activeTabIndex)
      })()
    }

    function closeTab(tabIndex) {
      return new Promise(resolve => {
        const tab = tabs[tabIndex]

        if (tab.classList.contains('dates__tab--active')) {
          tab.classList.remove('dates__tab--active')

          tab.addEventListener('transitionend', resolve, { once: true })
        } else {
          resolve()
        }
      })
    }

    function openTab(tabIndex) {
      return new Promise(resolve => {
        const tab = tabs[tabIndex]

        if (tab.classList.contains('dates__tab--active')) {
          resolve()
        } else {
          tab.classList.add('dates__tab--active')

          tab.addEventListener('transitionend', resolve, { once: true })
        }
      })
    }

    // events
    init()
  })
})