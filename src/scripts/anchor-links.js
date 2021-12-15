import { mediaQuery } from './mediaQueries';

$(window).on('load', () => {

  if ((!mediaQuery.matches) && $('.implant-price-page').length) {

    $('.mobile-header__panel').addClass('mobile-header__panel--big');

    const headerHeight = $('.header').height();
    const list = $('.category--mobile');

    // nav links in header
    cloneList()
  
    function cloneList() {
      const headerPanel = $('.mobile-header__price-tabs')
      const clone = list.clone()

      headerPanel.append(clone)
    }
  
    // const listOffset = list.offset().top

    // $(window).on('scroll', function () {
    //   const scrollPos = this.pageYOffset;

    //   if ((scrollPos + 65) > listOffset) {
    //     list.addClass('hidden')
    //     $('.header').addClass('header--show');
    //   }

    //   if ((scrollPos + headerHeight) < listOffset) {
    //     list.removeClass('hidden')
    //     $('.header').removeClass('header--show')
    //   }
    // });
  }
  
  if ($('.implant-price-page').length) {
    
    const headerHeight = $('.header').height();

    // scroll active change
    const FPS = 60

    const items = $('.category-price');

    let positions = [],
    currentActive = null,
    links = items;

    // update offset
    upadateOffset()
    $(window).one('resize', handleResize)

    function upadateOffset() {
      positions.length = 0
      $('[data-section]').each(function(){
        positions.push({
          top: $(this).offset().top,
          a: links.filter('[data-scroll="#'+$(this).attr('id')+'"]')
        });
      });

      positions = positions.reverse();
    }

    function handleResize() {
      setTimeout(() => {
        upadateOffset()

        $(window).one('resize', handleResize)
      }, 1000 / FPS);
    }
    
    updateActive()
    $(window).one('scroll', scrollHandler)

    function updateActive() {
      const winTop = $(window).scrollTop()

      for(let i = 0; i < positions.length; i++){
        if(positions[i].top - headerHeight < winTop + headerHeight){
          if(currentActive !== i){
            currentActive = i;
            items.removeClass('category__item--active');
            positions[i].a.addClass('category__item--active');
          }
          break;
        }
      }

      if (positions[positions.length - 1].top - headerHeight > winTop + headerHeight) {
        items.removeClass('category__item--active');
        positions[positions.length - 1].a.addClass('category__item--active')
      }
    }

    function scrollHandler() {
      setTimeout(() => {
        updateActive()

        $(window).one('scroll', scrollHandler)
      }, 1000 / FPS);
    }

    

    // anchor scroll
    $('[data-scroll]').on('click', function(event) {

      event.preventDefault();
  
      const elementId = $(this).data('scroll');
      const elementOffset = $(elementId).offset().top;
  
      $('html, body').animate({
        scrollTop: elementOffset - (headerHeight + 10)
      }, 700);
    })
  }
})