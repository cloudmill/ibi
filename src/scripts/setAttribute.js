function setAttribute(element, attribute, value) {
  return new Promise(resolve => {
    const observer = new MutationObserver(() => {
      observer.disconnect()

      resolve()
    })
    observer.observe(element, {
      attributes: true,
    })

    element.setAttribute(attribute, value)
  })
}

export { setAttribute }