(()=>{"use strict";var t,e={728:(t,e,o)=>{o(563);var a=o(638);a((function(){!function(){function t(){var t=[],e=a("[data-type=js-team-list]");a("[data-type=js-team-filter-tag]").each((function(){a(this).hasClass("active")&&(t[t.length]=a(this).attr("data-id"))})),console.log(t),a.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}console.log("teamFilter"),a("[data-type=js-team-filter-tag]").on("click",(function(e){e.preventDefault(),a(this).toggleClass("active"),t()})),a("[data-type=js-team-filter-clear]").on("click",(function(e){e.preventDefault(),a("[data-type=js-team-filter-tag]").each((function(){a(this).hasClass("active")&&a(this).removeClass("active")})),t()}))}(),function(){function t(){console.log("libraryFilter ajax");var t=[],e=a("[data-type=js-library-list]");a("[data-type=js-library-filter-tag]").each((function(){a(this).hasClass("active")&&(t[t.length]=a(this).attr("data-id"))})),console.log(t),a.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}console.log("libraryFilter"),a("[data-type=js-library-filter-tag]").on("click",(function(e){e.preventDefault(),console.log("libraryFilter click tag"),a(this).toggleClass("active"),t()})),a("[data-type=js-library-filter-clear]").on("click",(function(e){console.log("libraryFilter click tag"),e.preventDefault(),a("[data-type=js-library-filter-tag]").each((function(){a(this).hasClass("active")&&a(this).removeClass("active")})),t()}))}(),function(){function t(){console.log("bafFilter ajax");var t=[],e=a("[data-type=js-baf-list]");a("[data-type=js-baf-filter-tag]").each((function(){a(this).hasClass("active")&&(t[t.length]=a(this).attr("data-id"))})),console.log(t),a.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}console.log("bafFilter"),a("[data-type=js-baf-filter-tag]").on("click",(function(e){e.preventDefault(),console.log("bafFilter click tag"),a(this).toggleClass("active"),t()})),a("[data-type=js-baf-filter-clear]").on("click",(function(e){console.log("bafFilter click tag"),e.preventDefault(),a("[data-type=js-baf-filter-tag]").each((function(){a(this).hasClass("active")&&a(this).removeClass("active")})),t()}))}(),function(){function t(){console.log("faqFilter ajax");var t=[],e=a("[data-type=js-faq-list]");a("[data-type=js-faq-filter-tag]").each((function(){a(this).hasClass("active")&&(t[t.length]=a(this).attr("data-id"))})),console.log(t),a.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}console.log("faqFilter"),a("[data-type=js-faq-filter-tag]").on("click",(function(e){e.preventDefault(),console.log("faqFilter click tag"),a(this).toggleClass("active"),t()})),a("[data-type=js-faq-filter-clear]").on("click",(function(e){console.log("faqFilter click tag"),e.preventDefault(),a("[data-type=js-faq-filter-tag]").each((function(){a(this).hasClass("active")&&a(this).removeClass("active")})),t()}))}(),function(){function t(){console.log("publicFilter ajax");var t=[],e=a("[data-type=js-public-list]");a("[data-type=js-public-filter-tag]").each((function(){a(this).hasClass("active")&&(t[t.length]=a(this).attr("data-id"))})),console.log(t),a.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}console.log("publicFilter"),a("[data-type=js-public-filter-tag]").on("click",(function(e){e.preventDefault(),console.log("publicFilter click tag"),a(this).toggleClass("active"),t()})),a("[data-type=js-public-filter-clear]").on("click",(function(e){console.log("publicFilter click tag"),e.preventDefault(),a("[data-type=js-public-filter-tag]").each((function(){a(this).hasClass("active")&&a(this).removeClass("active")})),t()}))}(),a(document).on("click","[data-type=show_more_click]",(function(t){var e=a(this),o=(window.location.pathname.split("/"),e.attr("data-url")),n=e.attr("data-tags"),i=e.parents("[data-type-container=main-items-container]").find("[data-container=items]");console.log("show more"),n&&(n=JSON.parse(n)),o&&(e.remove(),a.ajax({method:"POST",url:o,data:{ajax:1,tags:n}}).done((function(t){var e=null,o=a(t).find("[data-type=show_more_click]");e=a(t).find("[data-type=item]"),i.append(e),o&&i.after(o),window.scroller.update()})))}))}));var n=o(566),i=(o(917),o(164)),s=o.n(i),c=o(660),r=o.n(c),l=o(638);function d(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var o=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null==o)return;var a,n,i=[],s=!0,c=!1;try{for(o=o.call(t);!(s=(a=o.next()).done)&&(i.push(a.value),!e||i.length!==e);s=!0);}catch(t){c=!0,n=t}finally{try{s||null==o.return||o.return()}finally{if(c)throw n}}return i}(t,e)||f(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){if(t){if("string"==typeof t)return u(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?u(t,e):void 0}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var o=0,a=new Array(e);o<e;o++)a[o]=t[o];return a}function h(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,a)}return o}function p(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?h(Object(o),!0).forEach((function(e){v(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):h(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function v(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var m,g=1280;l((function(){var t=l(".header");if(0!==t.length){var e={id:null,close:function(){l('[data-modal-id="'.concat(this.id,'"]')).removeAttr("data-modal-active"),l('[data-modal-button="'.concat(this.id,'"]')).removeAttr("data-modal-active")},open:function(){l('[data-modal-id="'.concat(this.id,'"]')).attr("data-modal-active",""),l('[data-modal-button="'.concat(this.id,'"]')).attr("data-modal-active","")},update:function(t){this.id=t},change:function(t){this.close(),this.update(t===this.id?null:t),this.open()}};l("[data-modal-button]").on("click",(function(){var o=l(this).data("modal-button");e.change(o),0!==t.find("[data-modal-active]").length?t.addClass("header--modal"):t.removeClass("header--modal")})),l(window).on("click",(function(o){0!==l(o.target).closest(".header__container").length&&!l(o.target).hasClass("header__container")||0!==l(o.target).closest("[data-modal-active]").length||(e.change(null),t.removeClass("header--modal"))})),window.matchMedia("(min-width: ".concat(g,"px)")).addListener((function(t){e.change(null)}))}})),l((function(){if(0!==l(".vacancy").length){var t=l(".vacancy-btn"),e=l(".modal-forms-vacancy"),o=l(".body");t.on("click",(function(){e.hasClass("vacancy--modal-open")?(e.removeClass("vacancy--modal-open"),o.removeClass("body-fixed")):(e.addClass("vacancy--modal-open"),o.addClass("body-fixed"))})),l(window).on("click",(function(a){e.hasClass("vacancy--modal-open")&&0===l(a.target).closest(t).length&&0===l(a.target).closest(".modal-forms__form").length&&(e.removeClass("vacancy--modal-open"),o.removeClass("body-fixed"))}))}})),l((function(){if(0!==l(".header").length){var t=l(".callback-button"),e=l(".modal-forms-header"),o=l(".body");t.on("click",(function(){e.hasClass("vacancy--modal-open")?(e.removeClass("vacancy--modal-open"),o.removeClass("body-fixed")):(e.addClass("vacancy--modal-open"),o.addClass("body-fixed"))})),l(window).on("click",(function(a){e.hasClass("vacancy--modal-open")&&0===l(a.target).closest(t).length&&0===l(a.target).closest(".modal-forms__form").length&&(e.removeClass("vacancy--modal-open"),o.removeClass("body-fixed"))}))}})),l((function(){var t=l("[data-tabs-id]");if(0!==t.length){var e=[];t.each((function(){var t=l(this).data("tabs-id");-1===e.indexOf(t)&&e.push(t)})),e.forEach((function(t){var e=l('[data-tabs-id="'.concat(t,'"][data-tabs-tab]')),o=l('[data-tabs-id="'.concat(t,'"][data-tabs-button]'));if(0!==e.length){var a={id:null,update:function(t){this.id=t},close:function(){e.filter('[data-tabs-tab="'.concat(this.id,'"]')).slideUp(500),o.filter('[data-tabs-button="'.concat(this.id,'"]')).removeAttr("data-tabs-active")},open:function(){e.filter('[data-tabs-tab="'.concat(this.id,'"]')).slideDown(500),o.filter('[data-tabs-button="'.concat(this.id,'"]')).attr("data-tabs-active","")},change:function(t){t&&t!==this.id&&(this.close(),this.update(t),this.open())},init:function(){var t=o.filter("[data-tabs-active]").data("tabs-button");this.update(t)}};a.init(),o.on("click",(function(){var t=l(this).data("tabs-button");a.change(t)}))}}))}})),l(window).on("load",(function(){var t=l("[data-slider-id]");0!==t.length&&t.each((function(){var t=l(this),e=t.data("slider-id"),o=t.data("slider-prev"),a=t.data("slider-next"),i=l('[data-slider-button="'.concat(o,'"]')),s=l('[data-slider-button="'.concat(a,'"]')),c={slidesPerView:"auto",spaceBetween:20,breakpoints:v({},g,{spaceBetween:40})};switch(e){case 1:case 2:c=p(p({},c),{},{loop:!0});break;case 3:c=p(p({},c),{},{breakpoints:v({},g,{spaceBetween:60})});break;case 4:c=p(p({},c),{},{allowTouchMove:!1});break;case 7:c=p(p({},c),{},{loop:!0,breakpoints:v({},g,{spaceBetween:100,allowTouchMove:!1})});break;case 8:c=p(p({},c),{},{loop:!0,centeredSlides:!0});break;case 20:c=p(p({},c),{},{spaceBetween:10,loop:!0,centeredSlides:!0,breakpoints:v({},g,{spaceBetween:40,allowTouchMove:!1,centeredSlides:!1})});break;case 21:c=p(p({},c),{},{allowTouchMove:!1});break;case 100:c=p(p({},c),{},{allowTouchMove:!1,autoHeight:!0,loop:!0});break;case 106:c=p({},c);break;case 105:c=p(p({},c),{},{autoHeight:!0,thumbs:{swiper:106}});break;case 140:case 150:c=p(p({},c),{},{loop:!0})}var r=new n.Z(t[0],c);i.on("click",(function(){r.slidePrev()})),s.on("click",(function(){r.slideNext()}))}))})),l((function(){if(0!==l(".sticky").length)new(r())(".sticky")})),l((function(){var t=l("[data-sticky-id]");0!==t.length&&t.each((function(){var t=l(this),e=t.data("sticky-id"),o=l('[data-sticky-end="'.concat(e,'"]')),a=t.data("sticky-top"),n=l(t).offset().top-a>=0?l(t).offset().top-a:0,i=t.data("sticky-bottom"),s=(0!==o.length?o.offset().top:l(document).height())-i-t.height()-a,c={isSticky:!1,isStickyPrev:!1,isChange:!1,init:function(){this.update(),this.isStickyPrev=this.isSticky,this.isChange=!1},update:function(){var t=window.pageYOffset;this.isStickyPrev=this.isSticky,this.isSticky=t>=n&&t<=s,this.isChange=this.isStickyPrev!==this.isSticky}};c.init(),l(window).on("scroll",(function(){c.update(),c.isChange&&(c.isSticky?t.css("position","fixed").css("top","".concat(a,"px")):t.css("position","").css("top",""))}))}))}));var b=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},y=function(t){for(var e=t,o=0;0!==e.length&&e[0]!==document.body;)o+=e[0].offsetTop,e=l(e[0].offsetParent);return o};l((function(){l(".my-sticky").each((function(){var t=l(this),e=t.data("my-sticky-bottom"),o=l(".footer");function a(){if(e){var t=l("#".concat(e)),a=y(t);n.bottom=b()-a+160}else n.bottom=o[0].offsetHeight+160}var n={top:140,bottom:null,startY:null,y:null,height:null,mode:null};a();var i=t.parent();i.css("position","relative");var s=t.clone();s.css("opacity",0),s.css("pointer-events","none"),s.css("position","absolute"),s.css("top","".concat(t[0].offsetTop,"px")),s.css("width","".concat(t[0].offsetWidth,"px")),i.append(s);var c=t.clone();function r(){a(),s.css("width","".concat(t[0].offsetWidth,"px")),c.css("width","".concat(t[0].offsetWidth,"px")),c.css("top","".concat(n.top,"px")),s.css("top","".concat(t[0].offsetTop,"px"));var e=y(s)+s.height(),o=b()-n.bottom;s.css("transform","\n\t\t\t\t\ttranslateY(".concat(o-e,"px)\t\n\t\t\t\t"));var i=l(window).scrollTop();switch(i<y(t)-n.top?n.mode="default":i+n.top<b()-n.bottom-c.height()?n.mode="fixed":n.mode="bottom",n.mode){case"fixed":console.log("fixed"),t.css("opacity",0),t.css("pointer-events","none"),s.css("opacity",0),s.css("pointer-events","none"),c.css("opacity",""),c.css("pointer-events","");break;case"bottom":console.log("bottom"),t.css("opacity",0),t.css("pointer-events","none"),c.css("opacity",0),c.css("pointer-events","none"),s.css("opacity",""),s.css("pointer-events","");break;default:console.log("default"),c.css("opacity",0),c.css("pointer-events","none"),s.css("opacity","0"),s.css("pointer-events","none"),t.css("opacity",""),t.css("pointer-events","")}}c.css("opacity",0),c.css("pointer-events","none"),c.css("position","fixed"),c.css("top","".concat(n.top,"px")),c.css("width","".concat(t[0].offsetWidth,"px")),i.append(c),r(),l(window).on("scroll",r),l(window).on("resize",r),m=r}))})),l((function(){var t=l(".mission__spoiler");t.each((function(){var e=l(this),o=e.data("spoiler-group");console.log(o);var a=e.find(".mission__spoiler-button"),n=e.find(".mission__spoiler-drop");a.on("click",(function(a){a.preventDefault(),o?t.filter('[data-spoiler-group="'.concat(o,'"]')).each((function(){var t=l(this),e=t.find(".mission__spoiler-drop");t.toggleClass("mission__spoiler--active"),e.slideToggle({progress:m})})):(e.toggleClass("mission__spoiler--active"),n.slideToggle({progress:m}))}))}))}));var _=function(t){return t[0].scrollTop/(t[0].scrollHeight-t[0].clientHeight)},w=function(t,e){requestAnimationFrame((function(){t.css("top","".concat(100*e,"%"))}))},C=function(t,e,o){return t<e?0:t>o?1:(t-e)/(o-e)};l((function(){l(".block").each((function(){var t=l(this),e=t.find(".block__scroll"),o=_(e),a=t.find(".block__scrollbar-thumb"),n=t.find(".block__slide--1"),i=t.find(".block__slide--2");w(a,o);var s=function(){!function(t,e,o,a){var n=C(e,o,a);requestAnimationFrame((function(){t.css("transform","translateY(-".concat(100*n,"%)")),t.css("opacity",1-n)}))}(n,o,.2,.75),function(t,e,o,a){var n=C(e,o,a);requestAnimationFrame((function(){t.css("transform","translateY(".concat(100*(1-n),"%)")),t.css("opacity",n)}))}(i,o,.25,.8)};s(),e.on("scroll",(function(){o=_(e),w(a,o),s()}))}))})),document.addEventListener("DOMContentLoaded",(function(){var t,e=document.querySelectorAll("input[data-tel-input]"),o=function(t){return t.value.replace(/\D/g,"")},a=function(t){var e=t.target,a=o(e),n=t.clipboardData||window.clipboardData;if(n){var i=n.getData("Text");if(/\D/g.test(i))return void(e.value=a)}},n=function(t){var e=t.target,a=o(e),n=e.selectionStart,i="";if(!a)return e.value="";if(e.value.length==n){if(["7","8","9"].indexOf(a[0])>-1){"9"==a[0]&&(a="7"+a);var s="8"==a[0]?"8":"+7";i=e.value=s+" ",a.length>1&&(i+="("+a.substring(1,4)),a.length>=5&&(i+=") "+a.substring(4,7)),a.length>=8&&(i+="-"+a.substring(7,9)),a.length>=10&&(i+="-"+a.substring(9,11))}else i="+"+a.substring(0,16);e.value=i}else t.data&&/\D/g.test(t.data)&&(e.value=a)},i=function(t){var e=t.target.value.replace(/\D/g,"");8==t.keyCode&&1==e.length&&(t.target.value="")},s=function(t,e){var o="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=f(t))||e&&t&&"number"==typeof t.length){o&&(t=o);var a=0,n=function(){};return{s:n,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,c=!1;return{s:function(){o=o.call(t)},n:function(){var t=o.next();return s=t.done,t},e:function(t){c=!0,i=t},f:function(){try{s||null==o.return||o.return()}finally{if(c)throw i}}}}(e);try{for(s.s();!(t=s.n()).done;){var c=t.value;c.addEventListener("keydown",i),c.addEventListener("input",n,!1),c.addEventListener("paste",a,!1)}}catch(t){s.e(t)}finally{s.f()}})),ymaps.ready((function(){if(0!==l("#map").length){var t=new ymaps.Map("map",{center:[55.732433,37.616144],zoom:14,controls:[]}),e=ymaps.templateLayoutFactory.createClass(['<div class="balloon">','<div class="balloon__content">','<p class="balloon__text">',"{{properties.balloon}}","</p>","</div>",'<div class="balloon__arrow"></div>',"</div>"].join(""),{build:function(){this.constructor.superclass.build.call(this),this._$element=l(".balloon",this.getParentElement()),this.applyElementOffset()},onSublayoutSizeChange:function(){e.superclass.onSublayoutSizeChange.apply(this,arguments),this._isElement(this._$element)&&(this.applyElementOffset(),this.events.fire("shapechange"))},applyElementOffset:function(){this._$element.css({left:-this._$element[0].offsetWidth/2,top:-(this._$element[0].offsetHeight+62)})},getShape:function(){if(!this._isElement(this._$element))return e.superclass.getShape.call(this);var t=this._$element.position();return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([[t.left,t.top],[t.left+this._$element[0].offsetWidth,t.top+this._$element[0].offsetHeight]]))},_isElement:function(t){return t&&t[0]}});t.events.add("click",(function(){t.balloon.isOpen()&&t.balloon.close()}));var o=new ymaps.GeoObjectCollection;l(".placemarks__item").each((function(){var t=l(this).find(".placemarks__balloon").text().trim(),a=[l(this).find(".placemarks__latitude").text().trim(),l(this).find(".placemarks__longitude").text().trim()],n=new ymaps.Placemark(a,{balloon:t},{iconLayout:"default#image",iconImageHref:"assets/images/placemark.svg",iconImageSize:[70,62],iconImageOffset:[-35,-62],balloonLayout:e,balloonPanelMaxMapArea:0,hideIconOnBalloonOpen:!1});o.add(n)})),t.geoObjects.add(o),t.setBounds(o.getBounds(),{zoomMargin:Math.max(70,62)})}})),l((function(){var t=new n.Z(l(".development__names")[0],{freeMode:!0,slidesPerView:"auto"});new n.Z(l(".development__desc")[0],{thumbs:{swiper:t}});t.update()})),l((function(){var t="component";l(".".concat(t)).each((function(){var e=l(this),o=(e.find(".".concat(t,"__list")),e.find(".".concat(t,"__item"))),a={isMultiLine:!1};function n(t,e){return Math.abs(t-e)<1}function i(){var t=o.filter(":first"),e=o.filter(":last"),i=t.offset().top,s=e.offset().top;a.isMultiLine=!n(i,s),console.log(a)}i(),l(window).on("resize",i),o.on("click",(function(){var o=l(".".concat(t,"__item--active")),a=l(this),i=o.index(),s=a.index();if(i!==s){var c=i<s?"right":"left",r=o.offset().top,d=a.offset().top,f=o.offset().left,u=a.offset().left;if(n(r,d)){var h=function(){a.addClass("".concat(t,"__item--thumb")),v.remove()},p=Math.abs(f-u),v=document.createElement("div"),m=o.position().top+o.height(),g=o.position().left,b=o.width();v.style.cssText=["transform: ","translate(".concat(g,"px, ").concat(m,"px) "),"scaleX(".concat(b,") ")].join(""),v.classList.add("".concat(t,"__thumb")),e[0].append(v),o.removeClass("".concat(t,"__item--thumb"));var y=a.width(),_=(a.position().left,{FPS:60,DURATION:1e3,startTimestamp:performance.now(),time:null,progress:null});requestAnimationFrame((function t(){var e=performance.now();_.time=e-_.startTimestamp,_.progress=_.time/_.DURATION,_.progress>1&&(_.progress=1);var o=b+(y-b)*_.progress,a=g+p*_.progress*("right"===c?1:-1);v.style.cssText=["transform: ","translate(".concat(a,"px, ").concat(m,"px) "),"scaleX(".concat(o,") ")].join(""),_.progress<1?requestAnimationFrame(t):h()}))}else{e.width(),e.offset().left;if("right"===c);else;}}})),o.on("click",(function(){o.removeClass("".concat(t,"__item--active")),l(this).addClass("".concat(t,"__item--active"))}))}))})),l((function(){l(".tabs").each((function(){var t=l(this),e=t.find(".tabs__item"),o=t.find(".tabs__background");!function(){function t(){var t=0;function a(t){return t.offsetLeft+t.offsetWidth}e.each((function(){t=a(this)>t?a(this):t})),o.css("width","".concat(t,"px"))}t(),setTimeout(t,250);l(window).one("resize",(function e(){t(),setTimeout((function(){t(),l(window).one("resize",e)}),1e3/15)}))}(),e.on("click",(function(){var t=l(".tabs__item--active"),e=l(this);t[0]!==e[0]&&(t.removeClass("tabs__item--active"),e.addClass("tabs__item--active"),c(t,e))}));var a=d(function(){var t,e=document.createElement("div");function a(){var o=t[0].offsetTop+t[0].offsetHeight,a=t[0].offsetLeft,n=t[0].offsetWidth;e.style.transform="translate(".concat(a,"px, ").concat(o,"px) scaleX(").concat(n,")")}e.classList.add("tabs__thumb"),e.style.cssText="\n          position: absolute;\n          bottom: 100%;\n          left: 0;\n          transform-origin: left;\n\n          width: 1px;\n\n          transition: none;\n        ";function n(){a(),setTimeout((function(){a(),window.addEventListener("resize",n,{once:!0})}),1e3/15)}function i(){e.remove(),window.removeEventListener("resize",n)}return[function(s){i(),t=s,a(),o.append(e),window.addEventListener("resize",n,{once:!0})},i]}(),2),n=a[0];a[1];setTimeout((function(){n(t.find(".tabs__item--active"))}),250);var i,s,c=function(t,e){i=t,s=e,Math.abs(i[0].offsetTop-s[0].offsetTop)<1?console.log(1):console.log(2)}}))})),l((function(){l.fancybox.defaults.closeExisting=!0,l.fancybox.defaults.touch=!1,l("[data-fancy-button]").on("click",(function(t){t.preventDefault();var e=l(this).data("fancy-button"),o=l('[data-fancy-modal="'.concat(e,'"]'));l.fancybox.open(o)}))})),l((function(){l.fn.BeerSlider=function(t){return t=t||{},this.each((function(){new(s())(this,t)}))},l(".beer-slider").BeerSlider({start:35})})),l((function(){if(0!==l(".index").length){var t=function(){l(".swiper-slide").each((function(){var t=l(this),e=t.find(".index__mid-img"),o=t.find(".index__mid-description"),a=e.width();o.css("max-width",a)}))},e=30;t(),l(window).one("resize",(function o(){setTimeout((function(){t(),l(window).one("resize",o)}),1e3/e)}))}})),l((function(){l(".index__target").each((function(){for(var t=l(this),e=t.find(".index__target-background"),o=t.find(".index__target-text"),a=[{colorStart:{r:49,g:187,b:162},colorEnd:{r:60,g:196,b:209},textColor:{r:148,g:255,b:250}},{colorStart:{r:65,g:204,b:206},colorEnd:{r:46,g:125,b:230},textColor:{r:146,g:225,b:255}},{colorStart:{r:100,g:178,b:200},colorEnd:{r:47,g:230,b:186},textColor:{r:146,g:255,b:229}}],n=0,i=0,s=a.length,c=[],r=0;r<s;r++){var d={colorStart:{r:a[(r+1)%s].colorStart.r-a[r].colorStart.r,g:a[(r+1)%s].colorStart.g-a[r].colorStart.g,b:a[(r+1)%s].colorStart.b-a[r].colorStart.b},colorEnd:{r:a[(r+1)%s].colorEnd.r-a[r].colorEnd.r,g:a[(r+1)%s].colorEnd.g-a[r].colorEnd.g,b:a[(r+1)%s].colorEnd.b-a[r].colorEnd.b},textColor:{r:a[(r+1)%s].textColor.r-a[r].textColor.r,g:a[(r+1)%s].textColor.g-a[r].textColor.g,b:a[(r+1)%s].textColor.b-a[r].textColor.b}};c.push(d)}function f(){var t,r,l;t={r:a[i].colorStart.r+c[i].colorStart.r*n,g:a[i].colorStart.g+c[i].colorStart.g*n,b:a[i].colorStart.b+c[i].colorStart.b*n},r={r:a[i].colorEnd.r+c[i].colorEnd.r*n,g:a[i].colorEnd.g+c[i].colorEnd.g*n,b:a[i].colorEnd.b+c[i].colorEnd.b*n},l={r:a[i].textColor.r+c[i].textColor.r*n,g:a[i].textColor.g+c[i].textColor.g*n,b:a[i].textColor.b+c[i].textColor.b*n},e.css("background","linear-gradient(261.11deg, rgb(".concat(t.r,", ").concat(t.g,", ").concat(t.b,") 8.47%, rgb(").concat(r.r,", ").concat(r.g,", ").concat(r.b,") 93.81%)")),o.css("color","rgb(".concat(l.r,", ").concat(l.g,", ").concat(l.b,")")),(n+=.047619047619047616)>1&&(n-=1,i=(i+1)%s)}console.log(a,c),l(window).one("mousemove",(function t(){requestAnimationFrame(f),setTimeout((function(){l(window).one("mousemove",t)}),1e3/60)}))}))})),l((function(){var t=l(".header");if(0!==t.length){var e=l(window).scrollTop();l(window).on("scroll",(function(){var o=l(window).scrollTop();t.hasClass("header--modal")||(o<e?(t.removeClass("header--scroll--down"),t.addClass("header--scroll--up")):(t.removeClass("header--scroll--up"),t.addClass("header--scroll--down"))),o<1&&(t.removeClass("header--scroll--up"),t.removeClass("header--scroll--down")),o>=1?t.addClass("header--scroll"):t.removeClass("header--scroll"),e=o})),l(window).scrollTop()>=1&&(t.addClass("header--scroll--up"),t.addClass("header--scroll"))}})),l((function(){var t=l(".header-modal--mobile");if(0!==t.length){var e=t.find(".header-section__button");t.find(".header-section__dropdown");e.on("click",(function(){var t=l(this).closest(".header-section__item");t.hasClass("header-section__item--active")?(t.find(".header-section__dropdown").slideUp(500),t.removeClass("header-section__item--active")):(l(".header-section__item--active").find(".header-section__dropdown").slideUp(650),l(".header-section__item--active").removeClass("header-section__item--active"),t.find(".header-section__dropdown").slideDown(500),t.addClass("header-section__item--active"))})),t.find(".header-section__section").find(".header-section__section-button").on("click",(function(){var t=l(this).closest(".header-section__section");t.hasClass("header-section__section--active")?(t.find(".header-section__section-dropdown").slideUp(500),t.removeClass("header-section__section--active")):(l(".header-section__section--active").find(".header-section__section-dropdown").slideUp(650),l(".header-section__section--active").removeClass("header-section__section--active"),t.find(".header-section__section-dropdown").slideDown(500),t.addClass("header-section__section--active"))}))}})),l((function(){var t=l(".form");if(0!==t.length){var e=l(".response"),o=l(".response__btn");l(".form__btn").on("click",(function(o){o.preventDefault(),t.addClass("form--hidden"),e.addClass("response--active")})),o.on("click",(function(){t.removeClass("form--hidden"),e.removeClass("response--active")}))}}))}},o={};function a(t){var n=o[t];if(void 0!==n)return n.exports;var i=o[t]={exports:{}};return e[t].call(i.exports,i,i.exports,a),i.exports}a.m=e,t=[],a.O=(e,o,n,i)=>{if(!o){var s=1/0;for(l=0;l<t.length;l++){for(var[o,n,i]=t[l],c=!0,r=0;r<o.length;r++)(!1&i||s>=i)&&Object.keys(a.O).every((t=>a.O[t](o[r])))?o.splice(r--,1):(c=!1,i<s&&(s=i));c&&(t.splice(l--,1),e=n())}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[o,n,i]},a.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return a.d(e,{a:e}),e},a.d=(t,e)=>{for(var o in e)a.o(e,o)&&!a.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={143:0,532:0};a.O.j=e=>0===t[e];var e=(e,o)=>{var n,i,[s,c,r]=o,l=0;for(n in c)a.o(c,n)&&(a.m[n]=c[n]);if(r)var d=r(a);for(e&&e(o);l<s.length;l++)i=s[l],a.o(t,i)&&t[i]&&t[i][0](),t[s[l]]=0;return a.O(d)},o=self.webpackChunk=self.webpackChunk||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})();var n=a.O(void 0,[812,532],(()=>a(728)));n=a.O(n)})();