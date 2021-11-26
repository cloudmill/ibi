import swipeDetect from 'swipe-detect';

window.addEventListener('DOMContentLoaded', async () => {
  const scrollTest = document.querySelector('.scroll-test')

  // тест?
  if (scrollTest) {
    console.log('scroll-test')

    // эл-ты expand
    const expand = document.querySelector('.expand')
    const expandScroll = document.querySelector('.expand__scroll')

    // скролл в топ на старте
    expandScroll.scrollTo(0, 0)

    // состояние
    let state = {
      prev: 'out',
      next: 'out',

      calcState(seq) {
        const rect = seq.getBoundingClientRect()
        return rect.top ? 'out' : 'in'
      },

      updateState(seq) {
        this.prev = this.next
        this.next = this.calcState(seq)
      },

      getState() {
        const prev = this.prev
        const next = this.next   

        return {
          prev,
          next,
        }
      },

      getChange() {
        return this.prev !== this.next
      },

      getPos(seq) {
        const rect = seq.getBoundingClientRect()
        return rect.top ? (
          rect.top < 0 ? 'after' : 'before'
        ) : 'in'
      }
    }

    // эл-ты секв
    const rails = document.querySelector('.scroll-test__rails')
    const seq = document.querySelector('.scroll-test__seq')

    // слайдер
    const slider = {
      LENGTH: 5,

      el: document.querySelector('.scroll-test__slider'),
      index: 0,

      update() {
        this.el.innerHTML = this.index + 1
      },

      next() {
        this.index = Math.min(this.LENGTH - 1, ++this.index)
        this.update()
      },
      prev() {
        this.index = Math.max(0, --this.index)
        this.update()
      },
    }
    slider.update()

    // скролл
    expandScroll.addEventListener('scroll', () => {
      state.updateState(seq)

      console.log(state.getState(), state.getPos(seq))
    })

    // touchmove
    window.addEventListener('touchmove', (e) => {
      if (state.getPos(seq) === 'in') {
        e.preventDefault()
      }
    }, {
      passive: false,
    })

    // свайпы
    swipeDetect(window, (dir) => {
      if (state.getPos(seq) === 'in') {
        switch (dir) {
          case 'up':
            slider.next()
            break
          case 'down':
            slider.prev()
            break
        }
      }
    }, 0)
  }
})

/*



*/
