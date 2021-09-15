function signal(msg, detail) {
  window.dispatchEvent(new CustomEvent(msg, { detail }))
}

export { signal }
