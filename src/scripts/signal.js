const sendSignal = (type, detail) => dispatchEvent(new CustomEvent(type, { detail }))

const onSignal = (type, callback) => window.addEventListener(type, ({ detail }) => callback(detail))



export { sendSignal, onSignal }
