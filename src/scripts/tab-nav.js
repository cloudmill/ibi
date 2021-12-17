window.addEventListener('load', () => {
  if ($('.tab-nav').length !== 0) {
  // медиа запрос
  // const mediaQuery = window.matchMedia('( min-width: 1280px )');

  // if (mediaQuery.matches) {
  //   // фиксация компонента tab-nav при скролле страницы
  //   const $el = $('.tab-nav');
  //   const $elCopy = $el.clone();
  //   const $elCopyContainer = $('.left-container--tab-nav');

  //   $elCopy.css('pointer-events', 'all');
  //   $elCopyContainer.append($elCopy);

  //   let isSticky = false;
  //   if ($(window).scrollTop() + 40 >= $el.position().top) {
  //     isSticky = true;
  //     toggle();
  //   }

  //   $(window).on('scroll', function () {
  //     if (isSticky) {
  //       if ($(window).scrollTop() + 40 < $el.position().top) {
  //         isSticky = false;
  //         toggle();
  //       }
  //     } else {
  //       if ($(window).scrollTop() + 40 >= $el.position().top) {
  //         isSticky = true;
  //         toggle();
  //       }
  //     }
  //   });

  //   function toggle() {
  //     // синхронизация позиции скролла между фиксированным и компонентом в странице
  //     if ($el.hasClass('tab-nav--sticky')) {
  //       $el.scrollLeft($elCopy.scrollLeft());
  //     } else {
  //       $elCopy.scrollLeft($el.scrollLeft());
  //     }

  //     $el.toggleClass('tab-nav--sticky');

  //     $elCopyContainer.toggleClass('left-container--sticky');
  //   }
  // }
  
  // скролл эл-та .tab-nav к активному эл-ту
  $('.tab-nav').scrollLeft($('.category__item--active').offset().left - $(window).width() / 2 + $('.category__item--active').width() / 2);
  }
});