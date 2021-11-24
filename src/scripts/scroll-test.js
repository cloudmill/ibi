import VirtualScroll from 'virtual-scroll'

$(() => {
  console.log('scroll-test');
  
  const scroller = new VirtualScroll()
  scroller.on((e) => {
    console.log(e);
  })
})

// document.addEventListener('touchmove', function(e) { 
//   e.preventDefault();
// }, {
//   passive: false,
// });
