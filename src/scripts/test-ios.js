console.log('test-ios')

function getHeight(element) {
  try {
    const elementRect = element.getBoundingClientRect()
    return elementRect.height
  } catch (err) {
    console.error(err)
    return 0
  }
}

function setConsole(...msgs) {
  try {
    const consoleEl = document.querySelector('.test-ios-console')
    consoleEl.innerHTML = msgs.map(msg => `${msg}<br>`).join('')
  } catch (err) {
    console.log(err)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.test-ios')) {
    setInterval(() => {
      setConsole(
        `inset: 0 - ${getHeight(document.querySelector('.test-ios-1'))}`,
        `100vh - ${getHeight(document.querySelector('.test-ios-2'))}`
      )
    }, 1000 / 60)
  }
})
