import Swiper from 'swiper'

window.addEventListener('load', () => {
  const sliders = document.querySelectorAll('.dates-slider')

  if (sliders.length) {
    const DUPLICATE_COUNT = 5
    const SLIDE_ACTIVE_CLASS = 'dates-slider__slide--active'
    const TAB_ACTIVE_CLASS = 'dates-tab--active'

    function initIndexes(slides) {
      slides.forEach((slide, index) => slide.setAttribute('data-slide-index', index))
    }
    function addDuplicate(wrapper, slides) {
      for (let i = 0; i < DUPLICATE_COUNT; i++) {
        for (let j = 0; j < slides.length; j++) {
          wrapper.prepend(slides[slides.length - j - 1].cloneNode(true))
          wrapper.append(slides[j].cloneNode(true))
        }
      }
    }
    function calcSize(wrapper, slide) {
      const slideClone = slide.cloneNode(true)

      slideClone.style.position = 'fixed'
      slideClone.style.top = '100%'
      slideClone.style.left = '100%'

      slideClone.classList.remove(SLIDE_ACTIVE_CLASS)
      
      wrapper.append(slideClone)

      const slideRect = slideClone.getBoundingClientRect()
      const slideWidth = slideRect.width

      slideClone.remove()

      return slideWidth
    }
    function calcSizes(wrapper, slides) {
      const sizes = []

      slides.forEach(slide => sizes.push(calcSize(wrapper, slide)))

      return sizes
    }
    function calcActiveSize(wrapper, slide) {
      const slideClone = slide.cloneNode(true)

      slideClone.style.position = 'fixed'
      slideClone.style.top = '100%'
      slideClone.style.left = '100%'

      slideClone.classList.add(SLIDE_ACTIVE_CLASS)
      
      wrapper.append(slideClone)

      const slideRect = slideClone.getBoundingClientRect()
      const slideWidth = slideRect.width

      slideClone.remove()

      return slideWidth
    }
    function calcActiveSizes(wrapper, slides) {
      const sizes = []

      slides.forEach(slide => sizes.push(calcActiveSize(wrapper, slide)))

      return sizes
    }
    function calcGap(wrapper, slides) {
      const slide = slides[0]
      const slideClone = slide.cloneNode(true)

      slideClone.style.position = 'fixed'
      slideClone.style.top = '100%'
      slideClone.style.left = '100%'

      wrapper.append(slideClone)

      const slideStyle = getComputedStyle(slideClone)
      const slideMarginRight = slideStyle.marginRight

      slideClone.remove()
      
      return +slideMarginRight.slice(0, -2)
    }
    function getDist(moveWrapper, slide, sizes, gap) {
      const slides = moveWrapper.children

      let i = 0
      let dist = 0
      while (slides[i] !== slide) {
        dist += gap
        dist += sizes[i % sizes.length]

        i++
      }

      return dist
    }
    function getPosition(wrapper, slide) {
      let i = 0
      while (wrapper.children[i] !== slide) {
        i++
      }

      return Math.ceil((i + 1) / (wrapper.children.length / (DUPLICATE_COUNT * 2 + 1)))
    }

    sliders.forEach(async slider => {
      const alignWrapper = slider.querySelector('.dates-slider__wrapper--align')
      const moveWrapper = slider.querySelector('.dates-slider__wrapper--move')
      const slides = slider.querySelectorAll('.dates-slider__slide')
      const tabs = document.querySelectorAll('.dates-tab')
      let sizes
      let activeSizes
      let gap
      let startIndex = 0  
      let enabled = true
      let path = []

      tabs.forEach((tab, index) => {
        tab.setAttribute('data-tab-index', index)

        const slider = tab.querySelector('.dates-tab-slider')
        const swiper = new Swiper(slider, {
          loop: true,
          speed: 500,
          spaceBetween: 20,
          breakpoints: {
            1280: {
              spaceBetween: 60,
            },
          },
          allowTouchMove: false,
        })

        tab.querySelector('.button-arrow--left').addEventListener('click', () => swiper.slidePrev())
        tab.querySelector('.button-arrow--right').addEventListener('click', () => swiper.slideNext())
      })
      moveWrapper.style.transition = 'none'
      alignWrapper.style.transition = 'none'
      initIndexes(slides)
      addDuplicate(moveWrapper, slides)
      sizes = calcSizes(moveWrapper, slides)
      activeSizes = calcActiveSizes(moveWrapper, slides)
      gap = calcGap(moveWrapper, slides)
      slides[startIndex].classList.add(SLIDE_ACTIVE_CLASS)
      tabs[startIndex].classList.add(TAB_ACTIVE_CLASS)
      slider.style.width = sizes.reduce((sum, curSize) => sum + curSize, 0) + gap * (sizes.length - 1) - sizes[startIndex] + activeSizes[startIndex] + (matchMedia('(min-width: 1280)').matches ? 0 : 20) + 'px'
      moveWrapper.style.transform = `translateX(-${getDist(moveWrapper, slides[startIndex], sizes, gap)}px)`
      alignWrapper.style.transform = `translateX(${sizes[(sizes.length + startIndex - 1) % sizes.length] + gap}px)`
      await (new Promise(resolve => setTimeout(resolve)))
      moveWrapper.style.transition = ''
      alignWrapper.style.transition = ''
      window.addEventListener('resize', () => {
        sizes = calcSizes(moveWrapper, slides)
        activeSizes = calcActiveSizes(moveWrapper, slides)
        gap = calcGap(moveWrapper, slides)

        const activeIndex = +moveWrapper.querySelector('.' + SLIDE_ACTIVE_CLASS).getAttribute('data-slide-index')
        slider.style.width = sizes.reduce((sum, curSize) => sum + curSize, 0) + gap * (sizes.length - 1) - sizes[activeIndex] + activeSizes[activeIndex] + (matchMedia('(min-width: 1280)').matches ? 0 : 20) + 'px'
        moveWrapper.style.transform = `translateX(-${getDist(moveWrapper, moveWrapper.querySelector('.' + SLIDE_ACTIVE_CLASS), sizes, gap)}px)`
        alignWrapper.style.transform = `translateX(${sizes[(sizes.length + +moveWrapper.querySelector('.' + SLIDE_ACTIVE_CLASS).previousElementSibling.getAttribute('data-slide-index')) % sizes.length] + gap}px)`
      })
      for (let slide of moveWrapper.children) {
        slide.addEventListener('click', () => {
          if (slide !== moveWrapper.querySelector('.' + SLIDE_ACTIVE_CLASS)) {
            if (enabled) {
              enabled = false

              document.querySelector('.' + TAB_ACTIVE_CLASS).classList.remove(TAB_ACTIVE_CLASS)
              setTimeout(() => {
                document.querySelector(`[data-tab-index="${+slide.getAttribute('data-slide-index')}"]`).classList.add(TAB_ACTIVE_CLASS)
              }, 500)
              
              moveWrapper.querySelector('.' + SLIDE_ACTIVE_CLASS).classList.remove(SLIDE_ACTIVE_CLASS)
              slide.classList.add(SLIDE_ACTIVE_CLASS) 
  
              moveWrapper.style.transform = `translateX(-${getDist(moveWrapper, slide, sizes, gap)}px)`
              alignWrapper.style.transform = `translateX(${sizes[(sizes.length + +slide.previousElementSibling.getAttribute('data-slide-index')) % sizes.length] + gap}px)`
  
              // moveWrapper.addEventListener('transitionend', handleTransitionend)
  
              // function handleTransitionend(event) {
              //   console.log('transitionend')
              //   if (event.path[0] === moveWrapper) {
              //     console.log('transitionend transform')
              //     const position = getPosition(moveWrapper, moveWrapper.querySelector('.' + SLIDE_ACTIVE_CLASS))
    
    
              //     if (position !== DUPLICATE_COUNT + 1) {
              //       const dist = Math.abs((DUPLICATE_COUNT + 1) - position)
    
              //       for (let i = 0; i < dist; i++) {
              //         for (let j = 0; j < slides.length; j++) {
              //           if (position < (DUPLICATE_COUNT + 1)) {
              //             moveWrapper.prepend(moveWrapper.lastElementChild)
              //           } else {
              //             moveWrapper.append(moveWrapper.firstElementChild)
              //           }
              //         }
              //       }
    
              //       moveWrapper.style.transition = 'none'
              //       moveWrapper.style.transform = `translateX(-${getDist(moveWrapper, slide, sizes, gap)}px)`
              //       setTimeout(() => moveWrapper.style.transition = '')
              //     }
    
              //     moveWrapper.removeEventListener('transitionend', handleTransitionend)
  
              //     setTimeout(() => enabled = true)
              //   }
              // }

              setTimeout(() => {
                const position = getPosition(moveWrapper, moveWrapper.querySelector('.' + SLIDE_ACTIVE_CLASS))
  
  
                if (position !== DUPLICATE_COUNT + 1) {
                  const dist = Math.abs((DUPLICATE_COUNT + 1) - position)
  
                  for (let i = 0; i < dist; i++) {
                    for (let j = 0; j < slides.length; j++) {
                      if (position < (DUPLICATE_COUNT + 1)) {
                        moveWrapper.prepend(moveWrapper.lastElementChild)
                      } else {
                        moveWrapper.append(moveWrapper.firstElementChild)
                      }
                    }
                  }

                  setTimeout(() => {
                    moveWrapper.style.transition = 'none'
                    setTimeout(() => {
                      console.log(moveWrapper.getAttribute('style'))
                      moveWrapper.style.transform = `translateX(-${getDist(moveWrapper, slide, sizes, gap)}px)`
                      setTimeout(() => {
                        moveWrapper.style.transition = ''
                        enabled = true
                      }, 500)
                    })
                  })
                } else {
                  setTimeout(() => enabled = true)
                }
              }, 500)
            }
          }
        })
      }
    })
  }
})
