import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'

window.addEventListener('DOMContentLoaded', () => {
  const components = document.querySelectorAll('.dates')

  components.forEach(component => {
    const slider = component.querySelector('.dates__slider-dates')

    $(slider).owlCarousel({
      margin:10,
      loop:true,
      autoWidth:true,
    })
  })
})