// map
const BREAKPOINT = 1280;


if ($('.contacts').length) {
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
            center: [55.733209, 37.616029],
            zoom: 19,
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
  
        // ???????????????????? ??????????
        const placemarks = new ymaps.GeoObjectCollection();
        $(".placemarks__item").each(function () {
          // ????????????
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
              //iconImageHref: "assets/images/placemark.svg",
              iconImageHref: "/local/templates/main/assets/images/placemark.svg",
              iconImageSize: [markWidth, markHeight],
              iconImageOffset: [-markWidth / 2, -80],
  
              balloonLayout: layout,
              balloonPanelMaxMapArea: 0,
              hideIconOnBalloonOpen: false,
            }
          );
          placemarks.add(placemark);
        });
  
        // ???????????????????? ???? ??????????
        map.geoObjects.add(placemarks);
  
        // ???????????????????????????????? ???? ????????????
        map
          .setBounds(placemarks.getBounds(), {
            zoomMargin: Math.max(markWidth, markHeight),
          })
          .then(() => {
            if ($(".placemarks__item").length === 1) {
              map.setZoom(15);
            }
          });
  
  
        var multiRoute = new ymaps.multiRouter.MultiRoute({
          referencePoints: [
            [55.731309, 37.612539],
            [55.733241, 37.616043],
          ],
          params: {
            routingMode: "pedestrian"
          }
        }, {
          routeActiveStrokeColor: "#36edff",
          wayPointVisible: false,
          wayPointColor: "#36edff",
          pinVisible: false,
        });
        map.geoObjects.add(multiRoute);
        var multiRoute = new ymaps.multiRouter.MultiRoute({
          referencePoints: [
            '????????????, ?????????? ??????????????',
            [55.733241, 37.616043],
          ],
          params: {
            routingMode: "pedestrian"
          }
        }, {
          routeActiveStrokeColor: "#36edff",
          wayPointVisible: false,
          wayPointColor: "#36edff",
          pinVisible: false,
        });
        map.geoObjects.add(multiRoute);
        map.setCenter([55.734310, 37.616059]);
      }
    });
  } catch (err) {
    console.error(err)
  }
}




// ymaps.ready(function () {
//   if (!ymaps.panorama.isSupported()) {
//     return;
//   }

//   var markerData = {
//     src: {
//       'default': '/local/templates/main/assets/images/placemark.svg',
//       hovered: '/local/templates/main/assets/images/placemark.svg'
//     },
//     position: [-2, -0.8, 0.2]
//   };

//   ymaps.panorama.locate([55.733237, 37.616190]).done(
//     function (panoramas) {
//       // ????????????????????, ?????? ?????????????? ???????? ???? ???????? ????????????????.
//       if (panoramas.length > 0) {
//         var player = new ymaps.panorama.Player(
//           'mapPan',
//           panoramas[0], {
//           direction: [194, 7]
//         });

//       }
//     });
// });
