window.addEventListener('load', () => {
  if ($('.tab-nav').length !== 0) {
  
  // скролл эл-та .tab-nav к активному эл-ту
  $('.tab-nav').scrollLeft(
    $('.category__item--active').offset().left - 20
    )}
});