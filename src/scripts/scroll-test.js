class ScrollStopper {
  constructor(breakpoint) {
    this.enabled = false
    this.breakpoint = breakpoint || { x: 0, y: 0, }

    this.tick = this.tick.bind(this)

    this.init()
  }

  init() {
    requestAnimationFrame(this.tick)
  }

  tick() {
    if (this.enabled) {
      window.scrollTo(this.breakpoint.x, this.breakpoint.y)
    }

    requestAnimationFrame(this.tick)
  }

  start() {
    this.enabled = true
  }
  stop() {
    this.enabled = false
  }

  setBreakpoint(breakpoint) {
    this.breakpoint = breakpoint
  }
}

class RealConsole {
  constructor() {
    this.el = this.createEl()
    document.body.append(this.el)
  }

  createEl() {
    const el = document.createElement('div')
    el.style.cssText = `
      position: fixed;
      z-index: 1000000000;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      overflow-x: hidden;
      overflow-y: auto;
      pointer-events: none;
      
      opacity: 0.5;
    `
    return el
  }

  createMsgsHTML(msgs) {
    return msgs.map(msg => `${msg}<br>`).join('')
  }

  log(...msgs) {
    this.el.innerHTML = this.createMsgsHTML(msgs) + this.el.innerHTML
  }
}

$(() => {
  const breakpointEl = $('[data-scroll-test]')
  if (breakpointEl.length) {
    const realConsole = new RealConsole()
    
    window.addEventListener('scroll', () => realConsole.log('scroll'))
    window.addEventListener('wheel', () => realConsole.log('wheel'))
    window.addEventListener('touchstart', () => realConsole.log('touchstart'))
  }
})
