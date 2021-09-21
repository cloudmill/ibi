{
  $(() => {
    const navSpoilerList = $('.nav__list');
    const navSpoiler = navSpoilerList.find('.sidebar-nav-spoiler');
    const navSpoilerBtn = navSpoilerList.find('.sidebar-nav-spoiler__button');
    const navSpoilerDrop = navSpoilerList.find('.sidebar-nav-spoiler__drop');

    // console.log(() => {navSpoilerList.getBoundingClientRect()});

    navSpoilerBtn.on('click', event => {
      let currentSpoiler = $(event.target).closest('.sidebar-nav-spoiler');
      let currentSpoilerDrop = currentSpoiler.find('.sidebar-nav-spoiler__drop');

      // console.log(currentSpoiler);

      if (currentSpoiler.hasClass('sidebar-nav-spoiler--active')) {

        // console.log(111);

        currentSpoiler.find('.sidebar-nav-spoiler__drop').slideUp(500);
        currentSpoiler.removeClass('sidebar-nav-spoiler--active');
      } else {

        // console.log(222);

        $('.sidebar-nav-spoiler--active').find('.sidebar-nav-spoiler__drop').slideUp(500);
        $('.sidebar-nav-spoiler--active').removeClass('sidebar-nav-spoiler--active');

        currentSpoilerDrop.slideDown(500);
        currentSpoiler.addClass('sidebar-nav-spoiler--active');
      }
    })
  })
}

