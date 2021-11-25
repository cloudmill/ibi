import swipeDetect from 'swipe-detect';

$(() => {
  swipeDetect(window, (dir) => {
    // console.log(dir)
  }, 0)
})

// document.addEventListener('touchmove', function(e) { 
//   e.preventDefault();
// }, {
//   passive: false,
// });
