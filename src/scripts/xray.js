import { mediaQuery } from 'scripts/mediaQueries.js'
import { signal } from 'scripts/communication.js'
import { setAttribute } from 'scripts/setAttribute.js'

// ###
window.addEventListener('DOMContentLoaded', () => {
  const comp = document.querySelector('.xray')

  if (comp) {
    if (mediaQuery.matches) {
      // [desktop]
      // data
      const ellipse = comp.querySelector('.xray__ellipse')
      const images = comp.querySelectorAll('.xray__image')

      let IMAGE_SIZE

      const ELLIPSE_WIDTH = 383
      const ELLIPSE_HEIGHT = 230
      const ELLIPSE_ANGLE = 15

      const MOUSEMOVE_FPS = 60

      // methods
      const loadImages = (() => {
        // data
        let loadCount = 0

        // methods
        function isLoaded() {
          return loadCount >= images.length
        }

        function onLoadImage(callback) {
          loadCount++

          if (isLoaded()) {
            callback()
          }
        }

        function initHref(image, callback) {
          const observer = new MutationObserver(() => {
            callback()

            observer.disconnect()
          })
          observer.observe(image, {
            attributes: true,
          })

          setTimeout(() => {
            const href = image.getAttribute('data-href')

            image.setAttribute('href', href)
          })
        }

        // function
        return callback => {
          if (isLoaded()) {
            callback()
          } else {
            images.forEach(
              image => initHref(image, () =>
                image.addEventListener('load', () =>
                  onLoadImage(callback)
                )
              )
            )
          }
        }
      })()

      function getSize(element) {
        const rect = element.getBoundingClientRect()

        return {
          width: rect.width,
          height: rect.height,
        }
      }

      function initImageSize() {
        if (!IMAGE_SIZE) {
          IMAGE_SIZE = getSize(images[0])
        }
      }

      function updateEllipse(event) {
        function setEllipseAttrs(cx, cy) {
          setAttribute(ellipse, 'cx', cx)
          setAttribute(ellipse, 'cy', cy)
          setAttribute(ellipse, 'transform', `rotate(${ELLIPSE_ANGLE} ${cx} ${cy})`)
        }

        const mouseX = event.clientX
        const mouseY = event.clientY
  
        const compRect = comp.getBoundingClientRect()
  
        const compX = compRect.x
        const compY = compRect.y
        const compWidth = compRect.width
        const compHeight = compRect.height

        const compRatio = compWidth / compHeight;
        const imageRatio = IMAGE_SIZE.width / IMAGE_SIZE.height;

        if (compRatio < imageRatio) {
          const imageWidth = imageRatio * compHeight
  
          const x = mouseX - (compX - (imageWidth - compWidth) / 2)
          const y = mouseY - compY
  
          const xNorm = x / imageWidth
          const yNorm = y / compHeight
  
          const ellipseX = IMAGE_SIZE.width * xNorm
          const ellipseY = IMAGE_SIZE.height * yNorm
  
          setEllipseAttrs(ellipseX, ellipseY)
        } else {
          const imageHeight = compWidth / imageRatio
  
          const x = mouseX - compX
          const y = mouseY - (compY - (imageHeight - compHeight) / 2)
  
          const xNorm = x / compWidth
          const yNorm = y / imageHeight
  
          const ellipseX = IMAGE_SIZE.width * xNorm
          const ellipseY = IMAGE_SIZE.height * yNorm
  
          setEllipseAttrs(ellipseX, ellipseY)
        }
      }

      const handleMousemove = (() => {
        let enabled = true

        return event => {
          if (enabled) {
            enabled = false

            updateEllipse(event)

            setTimeout(() => enabled = true, 1000 / MOUSEMOVE_FPS)
          }
        }
      })()

      // events
      window.addEventListener('psx:1', () => signal('psx:2', getSize(comp)))

      window.addEventListener('psx:5', () => {
        loadImages(() => {
          initImageSize()

          Promise.all([
            setAttribute(comp, 'viewBox', `0 0 ${IMAGE_SIZE.width} ${IMAGE_SIZE.height}`),

            setAttribute(ellipse, 'cx', -(ELLIPSE_WIDTH / 2)),
            setAttribute(ellipse, 'cy', -(ELLIPSE_HEIGHT / 2)),
            setAttribute(ellipse, 'rx', ELLIPSE_WIDTH / 2),
            setAttribute(ellipse, 'ry', ELLIPSE_HEIGHT / 2),
            setAttribute(ellipse, 'style', 'opacity: 0;'),

            ...(() => {
              const tasks = []

              for (let i = 0; i < images.length; i++) {
                tasks.push(setAttribute(images[i], 'width', IMAGE_SIZE.width))
                tasks.push(setAttribute(images[i], 'height', IMAGE_SIZE.height))
              }

              return tasks
            })()
          ]).then(() => signal('psx:6'))
        })
      })

      window.addEventListener('psx:7', () => {
        window.addEventListener('mousemove', handleMousemove)
        window.addEventListener('mousemove', () => setAttribute(ellipse, 'style', ''), {
          once: true,
        })
      })

      window.addEventListener('psx:8', () => signal('psx:9', getSize(comp)))
    }
  }
})
// ###

/*
$(window).on('load', () => {
  const components = $(".xray");

  components.each(function () {
    const component = $(this);

    const images = component.find(".xray__image");
    const ellipse = component.find(".xray__ellipse");

    function getImageSize() {
      let minImageWidth = null;
      let minImageHeight = null;

      images.each(function () {
        const imageStyle = getComputedStyle(this);

        const imageWidth = +imageStyle.width.slice(0, -2);
        const imageHeight = +imageStyle.height.slice(0, -2);

        minImageWidth =
          minImageWidth === null
            ? imageWidth
            : imageWidth < minImageWidth
            ? imageWidth
            : minImageWidth;

        minImageHeight =
          minImageHeight === null
            ? imageHeight
            : imageHeight < minImageHeight
            ? imageHeight
            : minImageHeight;
      });

      return [minImageWidth, minImageHeight];
    }

    [IMAGE_WIDTH, IMAGE_HEIGHT] = getImageSize();

    function initComponent() {
      component.attr("viewBox", `0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT}`)

      ellipse.attr("cx", -(ELLIPSE_WIDTH / 2))
      ellipse.attr("cy", -(ELLIPSE_HEIGHT / 2))
      ellipse.attr("rx", ELLIPSE_WIDTH / 2)
      ellipse.attr("ry", ELLIPSE_HEIGHT / 2)
      ellipse.css('opacity', 0)

      images.attr("width", IMAGE_WIDTH)
      images.attr("height", IMAGE_HEIGHT)
    }

    initComponent();

    function getComponentSize() {
      const componentRect = component[0].getBoundingClientRect()

      return [componentRect.width, componentRect.height]
    }

    function sendComponentSize() {
      const changeSizeEvent = new CustomEvent('xray-change-size', {
        detail: getComponentSize(),
      })
      window.dispatchEvent(changeSizeEvent)
    }

    sendComponentSize()

    function updateEllipse(event) {
      ellipse.css('opacity', 1)

      const mouseX = event.originalEvent.clientX;
      const mouseY = event.originalEvent.clientY;

      const componentPos = component[0].getBoundingClientRect();

      const componentX = componentPos.x;
      const componentY = componentPos.y;
      const componentWidth = componentPos.width;
      const componentHeight = componentPos.height;

      const componentRatio = componentWidth / componentHeight;
      const imageRatio = IMAGE_WIDTH / IMAGE_HEIGHT;

      if (componentRatio < imageRatio) {
        const imageWidth = imageRatio * componentHeight;

        const x = mouseX - (componentX - (imageWidth - componentWidth) / 2);
        const y = mouseY - componentY;

        const xNorm = x / imageWidth;
        const yNorm = y / componentHeight;

        const ellipseX = IMAGE_WIDTH * xNorm;
        const ellipseY = IMAGE_HEIGHT * yNorm;

        ellipse.attr("cx", ellipseX);
        ellipse.attr("cy", ellipseY);
        ellipse.attr(
          "transform",
          `rotate(${ELLIPSE_ANGLE} ${ellipseX} ${ellipseY})`
        );
      } else {
        const imageHeight = componentWidth / imageRatio;

        const x = mouseX - componentX;
        const y = mouseY - (componentY - (imageHeight - componentHeight) / 2);

        const xNorm = x / componentWidth;
        const yNorm = y / imageHeight;

        const ellipseX = IMAGE_WIDTH * xNorm;
        const ellipseY = IMAGE_HEIGHT * yNorm;

        ellipse.attr("cx", ellipseX);
        ellipse.attr("cy", ellipseY);
        ellipse.attr(
          "transform",
          `rotate(${ELLIPSE_ANGLE} ${ellipseX} ${ellipseY})`
        );
      }
    }

    function handleMousemove(event) {
      updateEllipse(event);

      setTimeout(() => {
        $(window).one("mousemove", handleMousemove);
      }, 1000 / MOUSEMOVE_FPS);
    }

    $(window).one("mousemove", handleMousemove);

    $(window).one("mousemove", () => {
      ellipse.css('opacity', '')
    })

    $(window).on('resize', sendComponentSize)
  });
})
*/
