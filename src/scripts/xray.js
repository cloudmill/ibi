import { signal } from 'scripts/communication.js'

let IMAGE_WIDTH
let IMAGE_HEIGHT

const ELLIPSE_WIDTH = 383
const ELLIPSE_HEIGHT = 230
const ELLIPSE_ANGLE = 15

const MOUSEMOVE_FPS = 60

// ###
window.addEventListener('DOMContentLoaded', () => {
  const comp = document.querySelector('.xray')

  if (comp) {
    // methods
    function getSize() {
      const rect = comp.getBoundingClientRect()

      return {
        width: rect.width,
        height: rect.height,
      }
    }

    // events
    window.addEventListener('psx:1', () => {
      signal('psx:2', getSize())
    })
  }
})
// ###

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
      component.attr("viewBox", `0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT}`);

      ellipse.attr("cx", -(ELLIPSE_WIDTH / 2));
      ellipse.attr("cy", -(ELLIPSE_HEIGHT / 2));
      ellipse.attr("rx", ELLIPSE_WIDTH / 2);
      ellipse.attr("ry", ELLIPSE_HEIGHT / 2);
      ellipse.css('opacity', 0)

      images.attr("width", IMAGE_WIDTH);
      images.attr("height", IMAGE_HEIGHT);
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


window.addEventListener('DOMContentLoaded', () => {
  const xray = $('.xray')

  if (xray.length) {
    // data

    // functions

    // events
    window.addEventListener('sv:ready', () => {
      // init
    })

    window.addEventListener('sv:end', () => {
      // start

      setTimeout(console.log(123))
    })
  }
})

window.addEventListener('sv ready', () => {
  console.log(199);
})
