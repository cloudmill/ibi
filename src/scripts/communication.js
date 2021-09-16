function signal(msg, detail) {
  console.log(msg)
  
  window.dispatchEvent(new CustomEvent(msg, { detail }))
}

function delay(callback, delay = 1000 / 24) {
  console.log('delay', delay)

  callback()
}

export { signal, delay }
