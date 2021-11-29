{
  $(() => {
    const navSpoilerList = $('.nav__list');
    // const navSpoiler = navSpoilerList.find('.sidebar-nav-spoiler');
    const navSpoilerBtn = navSpoilerList.find('.sidebar-nav-spoiler__button');
    // const navSpoilerDrop = navSpoilerList.find('.sidebar-nav-spoiler__drop');
    const spoilerArrow = navSpoilerList.find('.sidebar-nav-spoiler__arrow');

    console.log(spoilerArrow);

    // console.log(() => {navSpoilerList.getBoundingClientRect()});

    if (spoilerArrow.length !== 0) {
      
      console.log('halo1');

      spoilerArrow.on('click', event => {

        console.log('halo2');

        let currentSpoiler = $(event.target).closest('.sidebar-nav-spoiler');
        let currentSpoilerDrop = currentSpoiler.find('.sidebar-nav-spoiler__drop');
  
        // currentSpoilerDrop.slideToggle(500);
        // currentSpoiler.toggleClass('sidebar-nav-spoiler--active');
  
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
    }
  })
}

