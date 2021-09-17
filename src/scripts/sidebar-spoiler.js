{
  $(() => {
    const navSpoilerList = $('.nav__list');
    const navSpoiler = navSpoilerList.find('.mission__spoiler');
    const navSpoilerBtn = navSpoilerList.find('.mission__spoiler-button');
    const navSpoilerDrop = navSpoilerList.find('.mission__spoiler-drop');

    navSpoilerBtn.on('click', event => {
      let currentSpoiler = $(event.target).closest('.mission__spoiler');
      let currentSpoilerDrop = currentSpoiler.find('.mission__spoiler-drop');

      console.log(currentSpoiler);

      if (currentSpoiler.hasClass('mission__spoiler--active')) {

        console.log(111);

        currentSpoiler.find('.mission__spoiler-drop').slideUp(500);
        currentSpoiler.removeClass('mission__spoiler--active');
      } else {

        console.log(222);

        $('.mission__spoiler--active').find('.mission__spoiler-drop').slideUp(500);
        $('.mission__spoiler--active').removeClass('mission__spoiler--active');

        currentSpoilerDrop.slideDown(500);
        currentSpoiler.addClass('mission__spoiler--active');
      }
    })
  })
}