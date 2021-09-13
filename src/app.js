import 'Styles/_app.scss';
import 'scripts/backend.js';
import 'scripts/modal-tooltip.js';
import 'scripts/sliders.js';
import 'scripts/forms.js';
// import 'scripts/map.js';
import 'scripts/test-swiper.js';
import 'scripts/main-interactive.js';
import 'scripts/main-video.js';

import 'scripts/preloader.js';
import 'scripts/start-video.js';

// import Swiper from 'swiper/bundle';
import Parsley from 'parsleyjs';
import 'parsleyjs/dist/i18n/ru';
import '@fancyapps/fancybox';
import BeerSlider from 'beerslider';
import Sticky from 'sticky-js';

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
          leave(event) {
            console.log(event);
          },
          close: function () {
            $(`[data-modal-id="${this.id}"]`).removeAttr('data-modal-active');
            $(`[data-modal-button="${this.id}"]`).removeAttr('data-modal-active');

            $(`[data-modal-id="${this.id}"]`).off('mouseleave', this.leave);
          },
          open: function () {
            $(`[data-modal-id="${this.id}"]`).attr('data-modal-active', '');
            $(`[data-modal-button="${this.id}"]`).attr('data-modal-active', '');

            $(`[data-modal-id="${this.id}"]`).on('mouseleave', this.leave);
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

          const modalActive = header.find('[data-modal-active]');
          if (modalActive.length !== 0) {
            header.addClass('header--modal');
            
            $(window).one('scroll', () => {
              header.removeClass('header--modal');
              state.change(null);
            });
          } else {
            header.removeClass('header--modal')
          }
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
            header.removeClass('header--modal')
          }
        });

        // media
        const breakpoint = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
        breakpoint.addListener(() => {
          state.change(null);
        });
      }
    }
  });
}

// vacancy modal
{
  $(() => {
    const vacancy = $('.vacancy');

    if (vacancy.length !== 0) {
      const navModalButton = $('.vacancy-btn');
      const vacancyCallback = $('.modal-forms-vacancy');
      const body = $('.body');

      // клик по кнопке вызова модального окна (открытие-закрытие)
      navModalButton.on('click', function () {
        if (vacancyCallback.hasClass('vacancy--modal-open')) { // если модальное окно открыто - закрываем
          vacancyCallback.removeClass('vacancy--modal-open'); // обновляем модификатор header (шапка, контейнер модальных окон)
          // navModalButton.removeClass('button-modal--active'); // обновляем модификатор кнопки
          body.removeClass('body-fixed');
        } else { // открывыем, аналогично (выше)
          vacancyCallback.addClass('vacancy--modal-open');
          // navModalButton.addClass('button-modal--active');
          // body.addClass('body-fixed'); // блокируем скролл
        }
      });

      // клик вне модального окна (закрытие)
      $(window).on('click', event => {
        if (
          vacancyCallback.hasClass('vacancy--modal-open') && // если модальное окно открыто
          $(event.target).closest(navModalButton).length === 0 && // + клик не по кнопке
          $(event.target).closest('.modal-forms__form').length === 0 // + клик не по модальному окну
        ) {
          vacancyCallback.removeClass('vacancy--modal-open');
          // navModalButton.removeClass('button-modal--active');
          // body.removeClass('body-fixed');
        }
      });
    }
  });
}

// callback modal
{
  $(() => {
    const header = $('.header');

    if (header.length !== 0) {
      const navModalButton = $('.callback-button');
      const headerCallback = $('.modal-forms-header');
      const body = $('.body');

      // клик по кнопке вызова модального окна (открытие-закрытие)
      navModalButton.on('click', function () {
        if (headerCallback.hasClass('vacancy--modal-open')) { // если модальное окно открыто - закрываем
          headerCallback.removeClass('vacancy--modal-open'); // обновляем модификатор header (шапка, контейнер модальных окон)
          // navModalButton.removeClass('button-modal--active'); // обновляем модификатор кнопки
          // body.removeClass('body-fixed');
        } else { // открывыем, аналогично (выше)
          headerCallback.addClass('vacancy--modal-open');
          // navModalButton.addClass('button-modal--active');
          // body.addClass('body-fixed'); // блокируем скролл
        }
      });

      // клик вне модального окна (закрытие)
      $(window).on('click', event => {
        if (
          headerCallback.hasClass('vacancy--modal-open') && // если модальное окно открыто
          $(event.target).closest(navModalButton).length === 0 && // + клик не по кнопке
          $(event.target).closest('.modal-forms__form').length === 0 // + клик не по модальному окну
        ) {
          headerCallback.removeClass('vacancy--modal-open');
          // navModalButton.removeClass('button-modal--active');
          // body.removeClass('body-fixed');
        }
      });
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

          button_el.on('click mouseenter', function () {
            const tab_clicked_id = $(this).data('tabs-button');
            state.change(tab_clicked_id);
          });
        }
      });
    }
  });
}

// sticky
{
  $(() => {
    if ($('.sticky').length !== 0) {
      const sticky = new Sticky('.sticky');
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

// my-sticky
var updateMySticky
{
  $(() => {
    const stickyAll = $('.my-sticky')

    stickyAll.each(function () {
      const sticky = $(this)

      const BOTTOM_OFFSET = 160
      const bottomID = sticky.data('my-sticky-bottom')
      const footer = $('.footer')

      function updateBottom() {
        if (bottomID) {
          const bottomElem = $(`#${bottomID}`)
          const bottomY = getY(bottomElem)

          state.bottom = getDocumentHeight() - bottomY + BOTTOM_OFFSET
        } else {
          state.bottom = footer[0].offsetHeight + BOTTOM_OFFSET
        }
      }

      const state = {
        // offset
        top: 140,
        bottom: null,
        // pos
        startY: null,
        y: null,
        // size
        height: null,
        // mode
        mode: null,
      }

      updateBottom()

      const stickyPlace = sticky.parent()
      // готовим place для добавления stickyBottom и stickyFixed
      stickyPlace.css('position', 'relative')

      const stickyBottom = sticky.clone()
      // готовим stickyBottom
      stickyBottom.css('opacity', 0)
      stickyBottom.css('pointer-events', 'none')
      stickyBottom.css('position', 'absolute')
      stickyBottom.css('top', `${sticky[0].offsetTop}px`)
      stickyBottom.css('width', `${sticky[0].offsetWidth}px`)
      stickyPlace.append(stickyBottom)

      const stickyFixed = sticky.clone()
      // готовим stickyFixed
      stickyFixed.css('opacity', 0)
      stickyFixed.css('pointer-events', 'none')
      stickyFixed.css('position', 'fixed')
      stickyFixed.css('top', `${state.top}px`)
      stickyFixed.css('width', `${sticky[0].offsetWidth}px`)
      stickyPlace.append(stickyFixed)

      update()

      $(window).on('scroll', update)
      $(window).on('resize', update)

      function update() {
        // console.log('update');

        updateBottom()

        // апдейтим размеры (width) копий
        stickyBottom.css('width', `${sticky[0].offsetWidth}px`)
        stickyFixed.css('width', `${sticky[0].offsetWidth}px`)

        // апдейтим позицию stickyFixed
        stickyFixed.css('top', `${state.top}px`)

        // апдейтим позицию stickyBottom
        stickyBottom.css('top', `${sticky[0].offsetTop}px`)
        const stickyBottomYBottom = getY(stickyBottom) + stickyBottom.height()
        const bottomY = getDocumentHeight() - state.bottom
        stickyBottom.css('transform', `
					translateY(${bottomY - stickyBottomYBottom}px)	
				`)

        const scrollY = $(window).scrollTop()
        if (scrollY < (getY(sticky) - state.top)) {
          state.mode = 'default'
        } else if ((scrollY + state.top) < getDocumentHeight() - state.bottom - stickyFixed.height()) {
          state.mode = 'fixed'
        } else {
          state.mode = 'bottom'
        }

        switch (state.mode) {
          case 'fixed':
            console.log('fixed');

            sticky.css('opacity', 0)
            sticky.css('pointer-events', 'none')
            stickyBottom.css('opacity', 0)
            stickyBottom.css('pointer-events', 'none')

            stickyFixed.css('opacity', '')
            stickyFixed.css('pointer-events', '')
            break
          case 'bottom':
            console.log('bottom')

            sticky.css('opacity', 0)
            sticky.css('pointer-events', 'none')
            stickyFixed.css('opacity', 0)
            stickyFixed.css('pointer-events', 'none')

            stickyBottom.css('opacity', '')
            stickyBottom.css('pointer-events', '')
            break
          default:
            console.log('default');

            stickyFixed.css('opacity', 0)
            stickyFixed.css('pointer-events', 'none')
            stickyBottom.css('opacity', '0')
            stickyBottom.css('pointer-events', 'none')

            sticky.css('opacity', '')
            sticky.css('pointer-events', '')
        }
      }

      updateMySticky = update
    })
  })

  function getDocumentHeight() {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )
  }

  function getViewportHeight() {
    return document.documentElement.clientHeight
  }

  function getY(element) {
    let elem = element

    let y = 0

    while (elem.length !== 0 && elem[0] !== document.body) {
      y += elem[0].offsetTop

      elem = $(elem[0].offsetParent)
    }

    return y
  }
}

// spoiler
{
  $(() => {
    const spoilers = $('.mission__spoiler');

    spoilers.each(function () {
      const spoiler = $(this);
      const spoiler_group = spoiler.data('spoiler-group')

      console.log(spoiler_group);

      const spoiler_button = spoiler.find('.mission__spoiler-button');
      const spoiler_drop = spoiler.find('.mission__spoiler-drop');

      spoiler_button.on('click', event => {
        event.preventDefault()

        if (spoiler_group) {
          spoilers.filter(`[data-spoiler-group="${spoiler_group}"]`).each(function () {
            const spoiler = $(this)
            const spoiler_drop = spoiler.find('.mission__spoiler-drop')

            spoiler.toggleClass('mission__spoiler--active')
            spoiler_drop.slideToggle({
              progress: updateMySticky,
            })
          })
        } else {
          spoiler.toggleClass('mission__spoiler--active')
          spoiler_drop.slideToggle({
            progress: updateMySticky,
          })
        }
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
// team filter

{
  // let memberCard = document.querySelectorAll('.team-member');

  // document.querySelector('.team-filter').addEventListener('click', event => {
  //   if (event.target.tagName != 'LI') return false;

  //   let filterClass = event.target.dataset['id'];
  //   // console.log(filterClass);

  //   memberCard.forEach(elem => {
  //     elem.classList.remove('hide');
  //     if (!elem.classList.contains(filterClass)) {
  //       elem.classList.add('hide'); 
  //     }
  //   });
  // });
}

// prosthetics filter

{
  $(() => {
    const filterPros = $('.prosthetic-slider__filter');
    const filterBtn = filterPros.find('.development__names-item');
    const filterSlide = $('.prosthetic-slider__slide');

    if (filterBtn.length) {
      filterPros.on('click', event => {
        filterBtn.removeClass('development__names-item--active');

        const activeBtn = $(event.target).closest(filterBtn);
        activeBtn.addClass('development__names-item--active');

        const currentId = activeBtn.data('filter-id');

        filterSlide.css('display', 'none');
        const currentSlides = $(`[data-slide-id="${currentId}"]`);

        console.log(currentSlides);
        
        currentSlides.css('display', 'block');
      })
    }
  })
}

// component
{
  $(() => {
    const COMPONENT_CLASS = 'component'

    const components = $(`.${COMPONENT_CLASS}`)

    components.each(function () {
      // elements
      const component = $(this)

      const list = component.find(`.${COMPONENT_CLASS}__list`)
      const items = component.find(`.${COMPONENT_CLASS}__item`)

      // state
      const state = {
        isMultiLine: false,
      }

      function topEqual(top1, top2) {
        return Math.abs(top1 - top2) < 1
      }

      function updateState() {
        // isMultiLine
        {
          const firstItem = items.filter(':first')
          const lastItem = items.filter(':last')

          const firstItemY = firstItem.offset().top
          const lastItemY = lastItem.offset().top

          state.isMultiLine = !topEqual(firstItemY, lastItemY)
        }

        console.log(state);
      }

      // init state
      updateState()

      // window resize
      $(window).on('resize', updateState)

      // move thumb
      items.on('click', function () {
        const prevItem = $(`.${COMPONENT_CLASS}__item--active`)
        const nextItem = $(this)

        const prevIndex = prevItem.index()
        const nextIndex = nextItem.index()

        // move
        if (prevIndex !== nextIndex) {
          const direction = prevIndex < nextIndex ? 'right' : 'left'

          const prevTop = prevItem.offset().top
          const nextTop = nextItem.offset().top

          const prevLeft = prevItem.offset().left
          const nextLeft = nextItem.offset().left

          // one line
          if (topEqual(prevTop, nextTop)) {
            const distance = Math.abs(prevLeft - nextLeft)

            // создаем thumb
            const thumb = document.createElement('div')

            const thumbTop = prevItem.position().top + prevItem.height()
            const thumbLeft = prevItem.position().left

            const thumbWidth = prevItem.width()

            thumb.style.cssText = [
              `transform: `,
              `translate(${thumbLeft}px, ${thumbTop}px) `,
              `scaleX(${thumbWidth}) `,
            ].join('')

            thumb.classList.add(`${COMPONENT_CLASS}__thumb`)

            component[0].append(thumb)

            // удаляем нативный (css) thumb (модификатор --thumb) у item'a
            prevItem.removeClass(`${COMPONENT_CLASS}__item--thumb`)

            // анимируем thumb
            const thumbWidthEnd = nextItem.width()
            const thumbLeftEnd = nextItem.position().left

            const animation = {
              FPS: 60,
              DURATION: 1000,

              startTimestamp: performance.now(),

              time: null,
              progress: null,
            }

            function frame() {
              const currentTimestamp = performance.now()

              animation.time = currentTimestamp - animation.startTimestamp
              animation.progress = animation.time / animation.DURATION

              if (animation.progress > 1) {
                animation.progress = 1
              }

              // update позиции и размера (анимация)
              {
                // размер
                const thumbWidthCurrent = thumbWidth + ((thumbWidthEnd - thumbWidth) * animation.progress)

                // позиция
                const thumbLeftCurrent = thumbLeft + (distance * animation.progress * (direction === 'right' ? 1 : -1))

                // "рендер" свойств
                thumb.style.cssText = [
                  `transform: `,
                  `translate(${thumbLeftCurrent}px, ${thumbTop}px) `,
                  `scaleX(${thumbWidthCurrent}) `,
                ].join('')
              }

              if (animation.progress < 1) {
                requestAnimationFrame(frame)
              } else {
                animationEnd()
              }
            }

            requestAnimationFrame(frame)

            // после анимации
            function animationEnd() {
              // добавляем нативный (css) thumb (модификатор --thumb) item'у
              nextItem.addClass(`${COMPONENT_CLASS}__item--thumb`)

              // удаляем анимируемый, временный thumb (js)
              thumb.remove()
            }
          } else { // cross line
            const componentWidth = component.width()

            const componentLeft = component.offset().left

            const prevLeftComponent = prevLeft - componentLeft
            const nextLeftComponent = nextLeft - componentLeft

            // to the right
            if (direction === 'right') {
              const prevDistance = componentWidth - prevLeftComponent
              const nextDistance = nextLeftComponent

              const distance = prevDistance + nextDistance

              // *здесь движение между строк вправо*
            } else { // to the left
              // расстояние такое же, как если бы prev было next, а next - prev И direction === 'right'
              // 'зеркально'
              const prevDistance = prevLeftComponent
              const nextDistance = componentWidth - nextLeftComponent

              const distance = prevDistance + nextDistance

              // *здесь движение между строк влево*
            }
          }
        }
      })

      // switch active
      items.on('click', function () {
        items.removeClass(`${COMPONENT_CLASS}__item--active`)

        const clickedItem = $(this)

        clickedItem.addClass(`${COMPONENT_CLASS}__item--active`)
      })
    })
  })
}

// tabs
{
  $(() => {
    $('.tabs').each(function () {
      const tabs = $(this)

      const items = tabs.find('.tabs__item')
      const background = tabs.find('.tabs__background')

        // background
        ; (() => {
          function update() {
            let width = 0

            function getWidth(elem) {
              return elem.offsetLeft + elem.offsetWidth
            }

            items.each(function () {
              width = (getWidth(this) > width) ? getWidth(this) : width
            })

            background.css('width', `${width}px`)
          }

          update()

          // скачок шрифта
          setTimeout(update, 250)

          const fps = 15

          function resize() {
            update()

            setTimeout(() => {
              update()

              $(window).one('resize', resize)
            }, 1000 / fps)
          }

          $(window).one('resize', resize)
        })()

        // change
        ; (() => {
          items.on('click', function () {
            const prev = $('.tabs__item--active')
            const next = $(this)

            if (prev[0] !== next[0]) {
              prev.removeClass('tabs__item--active')
              next.addClass('tabs__item--active')

              animation(prev, next)
            }
          })
        })()

      // static
      var [attach, dettach] = (() => {
        let item

        const thumb = document.createElement('div')

        thumb.classList.add('tabs__thumb')

        thumb.style.cssText = `
          position: absolute;
          bottom: 100%;
          left: 0;
          transform-origin: left;
          width: 1px;
          transition: none;
        `

        function update() {
          const top = item[0].offsetTop + item[0].offsetHeight
          const left = item[0].offsetLeft

          const width = item[0].offsetWidth

          thumb.style.transform = `translate(${left}px, ${top}px) scaleX(${width})`
        }

        const fps = 15

        function resize() {
          update()

          setTimeout(() => {
            update()

            window.addEventListener('resize', resize, {
              once: true,
            })
          }, 1000 / fps)
        }

        function attach(attachItem) {
          dettach()

          item = attachItem

          update()

          background.append(thumb)

          window.addEventListener('resize', resize, {
            once: true,
          })
        }

        function dettach() {
          thumb.remove()

          window.removeEventListener('resize', resize)
        }

        return [attach, dettach]
      })()

      // скачок шрифта
      setTimeout(() => {
        attach(tabs.find('.tabs__item--active'))
      }, 250)

      // animation
      var animation = (() => {
        let prev
        let next

        function inOneLine() {
          return Math.abs(prev[0].offsetTop - next[0].offsetTop) < 1
        }

        function animation(prevItem, nextItem) {
          prev = prevItem
          next = nextItem

          if (inOneLine()) {
            simpleAnimation()
          } else {
            complexAnimation()
          }
        }

        function createThumb() {
          const thumb = document.createElement('div')

          thumb.classList.add('tabs__thumb')

          thumb.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: left;
            transform: scaleX(30);
            
            width: 1px;
          `

          return thumb
        }

        function simpleAnimation() {
          console.log(1);
        }

        function complexAnimation() {
          console.log(2);
        }

        return animation
      })()
    })
  })
}

// fancybox
{
  $(() => {
    $.fancybox.defaults.closeExisting = true;
    $.fancybox.defaults.touch = false;

    $('[data-fancy-button]').on('click', function (event) {
      event.preventDefault();

      const id = $(this).data('fancy-button');
      const modal = $(`[data-fancy-modal="${id}"]`);

      $.fancybox.open(modal);
    });
  });
}

// before-after
{
  $(() => {
    $.fn.BeerSlider = function (options) {
      options = options || {};
      return this.each(function () {
        new BeerSlider(this, options);
      });
    };
    $('.beer-slider').BeerSlider({ start: 35 });
  });
}

// target section animation (main page, mouse move, linear-gradient)
; (() => {
  $(() => {
    const components = $('.index__target')

    components.each(function () {
      const component = $(this)

      const background = component.find('.index__target-background')
      const text = component.find('.index__target-text')

      // data
      const points = [
        {
          colorStart: {
            r: 49,
            g: 187,
            b: 162,
          },
          colorEnd: {
            r: 60,
            g: 196,
            b: 209,
          },
          textColor: {
            r: 148,
            g: 255,
            b: 250,
          },
        },
        {
          colorStart: {
            r: 65,
            g: 204,
            b: 206,
          },
          colorEnd: {
            r: 46,
            g: 125,
            b: 230,
          },
          textColor: {
            r: 146,
            g: 225,
            b: 255,
          },
        },
        {
          colorStart: {
            r: 100,
            g: 178,
            b: 200,
          },
          colorEnd: {
            r: 47,
            g: 230,
            b: 186,
          },
          textColor: {
            r: 146,
            g: 255,
            b: 229,
          },
        },
      ]

      // options
      const fps = 60

      let progress = 0
      const progressDuration = 350
      const progressIncrement = 1 / ((progressDuration / 1000) * fps)

      let step = 0
      const stepsCount = points.length

      // calc
      const pointsDelta = []

      for (let i = 0; i < stepsCount; i++) {
        const pointDelta = {
          colorStart: {
            r: points[(i + 1) % stepsCount].colorStart.r - points[i].colorStart.r,
            g: points[(i + 1) % stepsCount].colorStart.g - points[i].colorStart.g,
            b: points[(i + 1) % stepsCount].colorStart.b - points[i].colorStart.b,
          },
          colorEnd: {
            r: points[(i + 1) % stepsCount].colorEnd.r - points[i].colorEnd.r,
            g: points[(i + 1) % stepsCount].colorEnd.g - points[i].colorEnd.g,
            b: points[(i + 1) % stepsCount].colorEnd.b - points[i].colorEnd.b,
          },
          textColor: {
            r: points[(i + 1) % stepsCount].textColor.r - points[i].textColor.r,
            g: points[(i + 1) % stepsCount].textColor.g - points[i].textColor.g,
            b: points[(i + 1) % stepsCount].textColor.b - points[i].textColor.b,
          },
        }

        pointsDelta.push(pointDelta)
      }

      console.log(points, pointsDelta);

      function update() {
        const currentColorStart = {
          r: points[step].colorStart.r + pointsDelta[step].colorStart.r * progress,
          g: points[step].colorStart.g + pointsDelta[step].colorStart.g * progress,
          b: points[step].colorStart.b + pointsDelta[step].colorStart.b * progress,
        }
        const currentColorEnd = {
          r: points[step].colorEnd.r + pointsDelta[step].colorEnd.r * progress,
          g: points[step].colorEnd.g + pointsDelta[step].colorEnd.g * progress,
          b: points[step].colorEnd.b + pointsDelta[step].colorEnd.b * progress,
        }
        const currentTextColor = {
          r: points[step].textColor.r + pointsDelta[step].textColor.r * progress,
          g: points[step].textColor.g + pointsDelta[step].textColor.g * progress,
          b: points[step].textColor.b + pointsDelta[step].textColor.b * progress,
        }

        background.css(
          'background',
          `linear-gradient(261.11deg, rgb(${currentColorStart.r}, ${currentColorStart.g}, ${currentColorStart.b}) 8.47%, rgb(${currentColorEnd.r}, ${currentColorEnd.g}, ${currentColorEnd.b}) 93.81%)`
        )
        text.css(
          'color',
          `rgb(${currentTextColor.r}, ${currentTextColor.g}, ${currentTextColor.b})`
        )
      }

      function tick() {
        update()

        progress += progressIncrement

        if (progress > 1) {
          progress = progress - 1

          step = (step + 1) % stepsCount
        }
      }

      function move() {
        requestAnimationFrame(tick)

        setTimeout(() => {
          $(window).one('mousemove', move)
        }, 1000 / fps)
      }

      $(window).one('mousemove', move)
    })
  })
})()

// fixed header
{
  $(() => {
    const header = $('.header');

    if (header.length !== 0) {
      let previousTop = $(window).scrollTop()

      $(window).on('scroll', function () {
        const currentTop = $(window).scrollTop();
        if (!header.hasClass('header--modal')) {
          if (currentTop < previousTop) {
            header.removeClass('header--scroll--down');
            header.addClass('header--scroll--up');
          } else {
            header.removeClass('header--scroll--up');
            header.addClass('header--scroll--down');
          }
        }

        if (currentTop < 1) {
          header.removeClass('header--scroll--up');
          header.removeClass('header--scroll--down');
        }

        if (currentTop >= 1) {
          header.addClass('header--scroll');
        } else {
          header.removeClass('header--scroll');
        }

        previousTop = currentTop;
      });

      if ($(window).scrollTop() >= 1) {
        header.addClass('header--scroll--up');
        header.addClass('header--scroll');
      }
    };
  });
}

// header modal mobile
{
  $(() => {
    const navModal = $('.header-modal--mobile');

    if (navModal.length !== 0) {
      const navModalButton = navModal.find('.header-section__button');
      const navModalDropdown = navModal.find('.header-section__dropdown');

      navModalButton.on('click', function () {
        const navModalSectionClicked = $(this).closest('.header-section__item');

        if (navModalSectionClicked.hasClass('header-section__item--active')) {
          navModalSectionClicked.find('.header-section__dropdown').slideUp(500);
          navModalSectionClicked.removeClass('header-section__item--active')
        } else {
          $('.header-section__item--active').find('.header-section__dropdown').slideUp(650);
          $('.header-section__item--active').removeClass('header-section__item--active');

          navModalSectionClicked.find('.header-section__dropdown').slideDown(500);
          navModalSectionClicked.addClass('header-section__item--active');
        }
      });

      // section
      const navModalSection = navModal.find('.header-section__section');
      const navModalSectionButton = navModalSection.find('.header-section__section-button');

      navModalSectionButton.on('click', function () {
        const navModalSectionClicked = $(this).closest('.header-section__section');

        if (navModalSectionClicked.hasClass('header-section__section--active')) {
          navModalSectionClicked.find('.header-section__section-dropdown').slideUp(500);
          navModalSectionClicked.removeClass('header-section__section--active')
        } else {
          $('.header-section__section--active').find('.header-section__section-dropdown').slideUp(650);
          $('.header-section__section--active').removeClass('header-section__section--active');

          navModalSectionClicked.find('.header-section__section-dropdown').slideDown(500);
          navModalSectionClicked.addClass('header-section__section--active');
        }
      });
    }
  });
}

// Калькулятор с зубами

{
  $(() => {

    $(window).on('click', event => {
      const tooth = $(event.target).closest('.tooth-button');
      // const calcList = $('.calc__list');
      // let toothId = tooth.attr('data-tooth-id');

      if (tooth.length) {

        // let listItem = document.createElement('li');
        // listItem.setAttribute('data-tooth-id', toothId);
        // listItem.className = "calc__list-item";
        // listItem.innerHTML = `<img src=assets/images/calc/calc-list-ico.png alt=''>
        // <div class=calc__list-circle>${toothId}</div>
        // <div class="tooth-destroyed-txt">Зуб разрушен</div>
        // <div class="tooth-removed-txt">Зуб отсутствует</div>`;

        if (tooth.hasClass('tooth-button--destroyed')) {
          tooth.removeClass('tooth-button--destroyed');
          tooth.addClass('tooth-button--removed');

          // $(`.calc__list-item[data-tooth-id=${toothId}]`).addClass('calc__list-removed');

        } else if (tooth.hasClass('tooth-button--removed')) {
          tooth.removeClass('tooth-button--removed')

          // $(`.calc__list-item[data-tooth-id=${toothId}]`).remove();

        } else {
          tooth.addClass('tooth-button--destroyed');
          // calcList.append(listItem);
        }
      }
    })
  });
};

// Добавление активного состояния на автора в публикации

{
  $(() => {
    $(window).on('click', event => {
      const authorTag = $(event.target).closest('.articles-authors__filter-item')

      if (authorTag.length) {
        authorTag.toggleClass('articles-authors__item--active')
      }
    })
  });
};