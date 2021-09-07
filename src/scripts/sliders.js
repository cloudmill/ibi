import Swiper from 'swiper/bundle';

// slider

const BREAKPOINT = 1280;

{
  $(window).on('load', () => { // ?
    const slider = $('[data-slider-id]');
  
    if (slider.length !== 0) {
      slider.each(function () {
        const slider_el = $(this);
        const slider_id = slider_el.data('slider-id');
        const slider_prev_id = slider_el.data('slider-prev');
        const slider_next_id = slider_el.data('slider-next');
        const slider_prev = $(`[data-slider-button="${slider_prev_id}"]`);
        const slider_next = $(`[data-slider-button="${slider_next_id}"]`);
  
        let slider_options = {
          slidesPerView: 'auto',
  
          spaceBetween: 20,
  
          breakpoints: {
            [BREAKPOINT]: {
              spaceBetween: 40,
            },
          },
        };
  
        switch (slider_id) {
          case 1:
            slider_options = {
              ...slider_options,
  
              loop: true,
  
            }
            break;
  
          case 2:
            slider_options = {
              ...slider_options,
  
              loop: true,
  
            }
            break;
  
          case 3:
            slider_options = {
              ...slider_options,
  
              loop: true,
  
              breakpoints: {
                [BREAKPOINT]: {
                  spaceBetween: 60,
                },
              },
            }
            break;
          case 4:
            slider_options = {
              ...slider_options,
  
              loop: true,
  
              allowTouchMove: false,
            }
            break;
          case 5:
            slider_options = {
              ...slider_options,
  
              loop: true,
            }
            break;
          case 6:
            slider_options = {
              ...slider_options,
  
              loop: true,
            }
            break;
          case 7:
            slider_options = {
              ...slider_options,
  
              loop: true,
  
              breakpoints: {
                [BREAKPOINT]: {
                  spaceBetween: 100,
  
                  allowTouchMove: false,
                },
              },
            }
            break;
          case 8:
            slider_options = {
              ...slider_options,
  
              loop: true,
              centeredSlides: true,
            }
            break;
  
  
          case 20:
            slider_options = {
              ...slider_options,
  
              spaceBetween: 10,
              loop: true,
              centeredSlides: true,
  
              breakpoints: {
                [BREAKPOINT]: {
                  spaceBetween: 40,
                  allowTouchMove: false,
                  centeredSlides: false,
                },
              },
            }
            break;
          case 21:
            slider_options = {
              ...slider_options,
  
              allowTouchMove: false,
            }
            break;
  
          case 100:
            slider_options = {
              ...slider_options,
  
              allowTouchMove: false,
              autoHeight: true,
              loop: true,
            }
            break;
  
          case 106:
            slider_options = {
              ...slider_options,
  
              // allowTouchMove: false,
              // autoHeight: true,
              // loop: true,
              // slideToClickedSlide: true,
  
            }
            break;
  
          case 105:
            slider_options = {
              ...slider_options,
  
              // allowTouchMove: false,
              autoHeight: true,
              // loop: true,
  
              thumbs: {
                swiper: 106,
              },
            }
            break;
  
          case 140:
            slider_options = {
              ...slider_options,
  
              loop: true,
  
            }
            break;
  
          // case 150:
          //   slider_options = {
          //     ...slider_options,
  
          //     loop: true,
  
          //   }
          //   break;
  
          case 160:
            slider_options = {
              ...slider_options,
  
              spaceBetween: 20,
  
              breakpoints: {
                [BREAKPOINT]: {
                  spaceBetween: 40,
                },
              },
  
            }
            break;
  
        }
  
        const slider_swiper = new Swiper(slider_el[0], slider_options);
  
        slider_prev.on('click', () => {
          slider_swiper.slidePrev();
        });
        slider_next.on('click', () => {
          slider_swiper.slideNext();
        });
      });
    }
  });
}

// Development slider
{
  $(() => {
    const swiperThumbs = new Swiper($('.development__names')[0], {
      freeMode: false,
      // loop: true,
      slidesPerView: 'auto',
      initialSlide: 0,

    })
    const swiperSlider = new Swiper($('.development__desc')[0], {
      loop: true,
      freeMode: false,
      spaceBetween: 0,
      slidesPerView: 1,
      initialSlide: 0,

      thumbs: {
        swiper: swiperThumbs,
      },
    })
    swiperThumbs.update()
  })
}

// slide description
{
  $(() => {

    if ($('.index').length !== 0) {
      const fps = 30;

      update()

      function update() {
        const indexSlide = $('.swiper-slide');
        indexSlide.each(function () {
          const slide = $(this);
          const slideImg = slide.find('.index__mid-img');
          const slideDesc = slide.find('.index__mid-description');
          const imgWidth = slideImg.width();

          slideDesc.css('max-width', imgWidth);
        });
      }

      function resize() {
        setTimeout(() => {
          update()
          $(window).one('resize', resize);
        }, 1000 / fps);
      };

      $(window).one('resize', resize)
    }
  });
}