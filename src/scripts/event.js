const DOMContentLoaded = new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))

const load = new Promise(resolve => window.addEventListener('load', resolve))



export { DOMContentLoaded, load }
