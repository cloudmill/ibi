$(window).on('load', () => {
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: 'O6zUpjtU6hE',
      
    });
  }

  onYouTubeIframeAPIReady();

  const video = document.querySelector('[data-video]')
  const button = video.querySelector('[data-video-button]')
  const img = video.querySelector('.video-preview__img')

  button.onclick = function() {
    player.playVideo()
    img.classList.add('video-preview__img--hide')
  }
})