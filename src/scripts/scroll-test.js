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

      overflow: hidden;
      pointer-events: none;

      text-align: right;
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

class ScrollStopper {
  constructor() {
    this.enabled = false
    this.position = {
      x: 0,
      y: 0,
    }

    this.tick = this.tick.bind(this)

    requestAnimationFrame(() => this.tick)
  }

  tick() {
    if (this.enabled) {
      window.scrollTo(this.position.x, this.position.y)
    }

    requestAnimationFrame(() => this.tick)
  }
}

$(() => {
  const breakpointEl = $('[data-scroll-test]')
  if (breakpointEl.length) {
    console.log('scroll-test')

    const realConsole = new RealConsole()

    // window.postMessage('wow')
    // window.addEventListener('message', (e) => {
    //   console.log(e.data)
    // })

    // const realConsole = new RealConsole()
    // const scrollStopper = new ScrollStopper()

    // let flag = false

    // breakpointEl.on('click', () => {
    //   flag = !flag

    //   if (flag) {
    //     scrollStopper.position = {
    //       x: 0,
    //       y: pageYOffset,
    //     }
    //     scrollStopper.enabled = true
    //   } else {
    //     scrollStopper.enabled = false
    //   }
      
    //   realConsole.log(flag)
    // })

    window.addEventListener('scroll', () => realConsole.log('scroll'))
    window.addEventListener('wheel', () => realConsole.log('wheel'))
    window.addEventListener('touchstart', () => realConsole.log('touchstart'))
  }
})
