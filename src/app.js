import 'Styles/_app.scss';
import Swiper from 'swiper';

const BREAKPOINT = 1280;

// header
{
  $(() => {
    const header = $('.header');

    if (header.length !== 0) {
      // modal
      {
        const state = {
          id: null,
          close: function () {
            $(`[data-modal-id="${this.id}"]`).removeAttr('data-modal-active');
            $(`[data-modal-button="${this.id}"]`).removeAttr('data-modal-active');
          },
          open: function () {
            $(`[data-modal-id="${this.id}"]`).attr('data-modal-active', '');
            $(`[data-modal-button="${this.id}"]`).attr('data-modal-active', '');
          },
          update: function (id) {
            this.id = id;
          },
          change: function (id) {
            this.close();
            this.update(id === this.id ? null : id);
            this.open();
          }
        };

        const btn = $('[data-modal-button]');
        btn.on('click', function () {
          const id = $(this).data('modal-button');
          state.change(id);
        });

        $(window).on('click', event => {
          // const isClickArea = $(event.target).closest(header).length !== 0; ?

          const isClickArea = ( // ?
            // эл-ты header
            $(event.target).closest('.header__container').length !== 0
            && !$(event.target).hasClass('header__container')
            // модальное окно
            || $(event.target).closest('[data-modal-active]').length !== 0
          );

          if (!isClickArea) {
            state.change(null);
          }
        });

        // media
        const breakpoint = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
        breakpoint.addListener((event) => {
          state.change(null);
        });
      }
    }
  });
}

// tabs
{
  $(() => {
    // attrs:
    // data-tabs-id: id компонента
    // data-tabs-button: id таба
    // data-tabs-tab: id таба
    // data-tabs-active: id активного таба

    const tabs_el = $('[data-tabs-id]');

    // проверка на существование компонентов
    if (tabs_el.length !== 0) {
      const tabs_id = [];

      // сбор id компонентов
      tabs_el.each(function () {
        const cur_id = $(this).data('tabs-id');

        if (tabs_id.indexOf(cur_id) === -1) {
          tabs_id.push(cur_id);
        }
      });

      // обработка компонентов (по id)
      tabs_id.forEach(comp_id => {
        const tab_el = $(`[data-tabs-id="${comp_id}"][data-tabs-tab]`);
        const button_el = $(`[data-tabs-id="${comp_id}"][data-tabs-button]`);

        // проверка на существование табов
        if (tab_el.length !== 0) {
          const state = {
            id: null, // active таб
            update: function (id) {
              this.id = id;
            },
            close: function () {
              // tab_el.filter(`[data-tabs-tab="${this.id}"]`).removeAttr('data-tabs-active');
              tab_el.filter(`[data-tabs-tab="${this.id}"]`).slideUp(500);
              button_el.filter(`[data-tabs-button="${this.id}"]`).removeAttr('data-tabs-active');
            },
            open: function () {
              // tab_el.filter(`[data-tabs-tab="${this.id}"]`).attr('data-tabs-active', '');
              tab_el.filter(`[data-tabs-tab="${this.id}"]`).slideDown(500);
              button_el.filter(`[data-tabs-button="${this.id}"]`).attr('data-tabs-active', '');
            },
            change: function (id) {
              if (id && id !== this.id) {
                this.close();
                this.update(id);
                this.open();
              }
            },
            init: function () {
              const tab_active_id = button_el.filter('[data-tabs-active]').data('tabs-button');
              this.update(tab_active_id);
            }
          };

          state.init();

          button_el.on('click', function () {
            const tab_clicked_id = $(this).data('tabs-button');
            state.change(tab_clicked_id);
          });
        }
      });
    }
  });
}

// slider
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
          case 3:
            slider_options = {
              ...slider_options,

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

              allowTouchMove: false,
            }
            break;
          case 7:
            slider_options = {
              ...slider_options,

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

// sticky
{
  $(() => {
    const elements = $('[data-sticky-id]');

    if (elements.length !== 0) {
      elements.each(function () {
        const element = $(this);
        const element_id = element.data('sticky-id');
        const element_end = $(`[data-sticky-end="${element_id}"]`);

        const top = element.data('sticky-top');
        const start = ($(element).offset().top - top >= 0) ? $(element).offset().top - top : 0;

        const bottom = element.data('sticky-bottom');
        const end = (element_end.length !== 0 ? element_end.offset().top : $(document).height()) - bottom - element.height() - top;

        const state = {
          isSticky: false,
          isStickyPrev: false,
          isChange: false,

          init: function () {
            this.update();

            this.isStickyPrev = this.isSticky; // первое состояние (после инициализации) - предыдущее состояние принимаем равным текущему
            this.isChange = false; // соответственно изменения с предыдущего апдейта не произошло
          },

          update: function () {
            const scrollTop = window.pageYOffset;

            this.isStickyPrev = this.isSticky;
            this.isSticky = scrollTop >= start && scrollTop <= end;

            this.isChange = this.isStickyPrev !== this.isSticky;
          },
        }
        state.init();

        $(window).on('scroll', () => {
          state.update();



          if (state.isChange) {
            if (state.isSticky) {
              element.css('position', 'fixed').css('top', `${top}px`);
            } else {
              element.css('position', '').css('top', '');
            }
          }
        });
      });
    }
  });
}

// spoiler
{
  $(() => {
    const spoilers = $('.mission__spoiler');

    spoilers.each(function () {
      const spoiler = $(this);
      const spoiler_button = spoiler.find('.mission__spoiler-button');
      const spoiler_drop = spoiler.find('.mission__spoiler-drop');

      spoiler_button.on('click', () => {
        spoiler.toggleClass('mission__spoiler--active');
        spoiler_drop.slideToggle();
      });
    });
  });
}

// block
{
  function getScrollProgress(scrollArea) {
    const scrollPos = scrollArea[0].scrollTop
    const scrollDist = scrollArea[0].scrollHeight - scrollArea[0].clientHeight

    return scrollPos / scrollDist
  }

  function updateScrollbarThumb(scrollbarThumb, scrollProgress) {
    requestAnimationFrame(() => {
      scrollbarThumb.css('top', `${scrollProgress * 100}%`)
    })
  }

  function getSlideProgress(scrollProgress, startProgress, endProgress) {
    if (scrollProgress < startProgress) {
      return 0
    } else if (scrollProgress > endProgress) {
      return 1
    } else {
      return (scrollProgress - startProgress) / (endProgress - startProgress)
    }
  }

  function updateSlide1(slide, scrollProgress, startProgress, endProgress) {
    const slideProgress = getSlideProgress(scrollProgress, startProgress, endProgress)

    requestAnimationFrame(() => {
      slide.css('transform', `translateY(-${slideProgress * 100}%)`);
      slide.css('opacity', 1 - slideProgress);
    })
  }

  function updateSlide2(slide, scrollProgress, startProgress, endProgress) {
    const slideProgress = getSlideProgress(scrollProgress, startProgress, endProgress)

    requestAnimationFrame(() => {
      slide.css('transform', `translateY(${(1 - slideProgress) * 100}%)`);
      slide.css('opacity', slideProgress);
    })
  }

  $(() => {
    const blocks = $('.block')

    blocks.each(function () {
      const block = $(this)
      
      const scrollArea = block.find('.block__scroll')
      let scrollProgress = getScrollProgress(scrollArea)
      
      const scrollbarThumb = block.find('.block__scrollbar-thumb')

      const slide1 = block.find('.block__slide--1');
      const slide2 = block.find('.block__slide--2');

      updateScrollbarThumb(scrollbarThumb, scrollProgress)

      const updateAll = () => {
        updateSlide1(slide1, scrollProgress, 0.2, 0.75)
        updateSlide2(slide2, scrollProgress, 0.25, 0.8)
      }

      updateAll()

      scrollArea.on('scroll', () => {
        scrollProgress = getScrollProgress(scrollArea)

        updateScrollbarThumb(scrollbarThumb, scrollProgress)

        updateAll()
      })
    })
  })
}
