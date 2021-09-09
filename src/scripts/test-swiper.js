import Swiper from 'swiper'

$(() => {
  $('.prev').on('click', () => {
    console.log('prev');
  })
  $('.next').on('click', () => {
    console.log('next');
  })

  const a = new Swiper($('.a')[0], {
    slidesPerView: 'auto',
    freeMode: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
  })
  const b = new Swiper($('.b')[0], {
    allowTouchMove: false,
  })

  a.controller.control = b
  a.controller.by = 'container'
  
  b.controller.control = a
  b.controller.by = 'container'
})