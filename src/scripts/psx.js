import 'scripts/preloader.js'
import 'scripts/start-video.js'
import 'scripts/xray.js'

/*
  1 - sv сигнализирует xr, дать ему размеры
  2 - xr отдает размеры sv
  3 - sv обновил свой размер и готов к открытию прелоадера (сигнал для pl)
  4 - pl сообщает sv о том, что pl закрылся
  5 - sv сообщает pl о том, что видео закончилось
*/