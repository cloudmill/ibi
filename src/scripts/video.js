$(() => {
  $('.index__video').on('ended', () => {
    $('.index__video').css('display', 'none')
  })
})