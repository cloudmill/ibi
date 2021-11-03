// map
const BREAKPOINT = 1280;

try {
  ymaps.ready(() => {
    const mapContainer = $("#map");

    if (mapContainer.length !== 0) {
      // vars
      const markWidth = 120;
      const markHeight = 126;

      // init
      const map = new ymaps.Map(
        "map",
        {
          center: [55.732433, 37.616144],
          zoom: 14,
          controls: [],
        },
        {
          maxZoom: 22,
        }
      );

      const zoomControl = new ymaps.control.ZoomControl({
        options: {
          size: "small",
          position: {
            top: 205,
            right: 10,
          },
        },
      });

      // adaptive
      const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
      function mediaQueryChange() {
        if (mediaQuery.matches) {
          // desktop
          map.controls.add(zoomControl);
        } else {
          // mobile
          map.controls.remove(zoomControl);
        }
      }
      mediaQueryChange();
      mediaQuery.addListener(mediaQueryChange);

      // balloon layout
      const layout = ymaps.templateLayoutFactory.createClass(
        [
          '<div class="balloon">',
          '<div class="balloon__content">',
          '<p class="balloon__text">',
          "{{properties.balloon}}",
          "</p>",
          "</div>",
          '<div class="balloon__arrow"></div>',
          "</div>",
        ].join(""),
        {
          build: function () {
            this.constructor.superclass.build.call(this);

            this._$element = $(".balloon", this.getParentElement());

            this.applyElementOffset();
          },
          onSublayoutSizeChange: function () {
            layout.superclass.onSublayoutSizeChange.apply(this, arguments);

            if (!this._isElement(this._$element)) {
              return;
            }

            this.applyElementOffset();

            this.events.fire("shapechange");
          },
          applyElementOffset: function () {
            this._$element.css({
              left: -(this._$element[0].offsetWidth / 2),
              top: -(this._$element[0].offsetHeight + markHeight),
            });
          },
          getShape: function () {
            if (!this._isElement(this._$element)) {
              return layout.superclass.getShape.call(this);
            }

            var position = this._$element.position();

            return new ymaps.shape.Rectangle(
              new ymaps.geometry.pixel.Rectangle([
                [position.left, position.top],
                [
                  position.left + this._$element[0].offsetWidth,
                  position.top + this._$element[0].offsetHeight,
                ],
              ])
            );
          },
          _isElement: function (element) {
            return element && element[0];
          },
        }
      );

      // balloon close
      map.events.add("click", () => {
        if (map.balloon.isOpen()) {
          map.balloon.close();
        }
      });

      // добавление точек
      const placemarks = new ymaps.GeoObjectCollection();
      $(".placemarks__item").each(function () {
        // данные
        const balloon = $(this).find(".placemarks__balloon").text().trim();
        const latitude = $(this).find(".placemarks__latitude").text().trim();
        const longitude = $(this).find(".placemarks__longitude").text().trim();

        // placemark
        const coordinates = [latitude, longitude];
        const placemark = new ymaps.Placemark(
          coordinates,
          {
            balloon,
          },
          {
            iconLayout: "default#image",
            iconImageHref: "assets/images/placemark.svg",
            // iconImageHref: "/local/templates/main/assets/images/placemark.svg",
            iconImageSize: [markWidth, markHeight],
            iconImageOffset: [-markWidth / 2, -80],

            balloonLayout: layout,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
          }
        );
        placemarks.add(placemark);
      });

      // добавление на карту
      map.geoObjects.add(placemarks);

      // позиционирование на точках
      map
        .setBounds(placemarks.getBounds(), {
          zoomMargin: Math.max(markWidth, markHeight),
        })
        .then(() => {
          if ($(".placemarks__item").length === 1) {
            map.setZoom(18);
          }
        });
    }
  });
} catch (err) {
  console.error(err)
}
