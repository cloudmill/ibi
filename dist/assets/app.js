!function(){var t,e={745:function(t,e,n){"use strict";n(563);var o=n(638);o((function(){!function(){var t=[];function e(){var e=o("[data-type=js-team-list]");o.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}function n(e){for(var n=0;n<t.length;n++)if(t[n]===e)return!0;return!1}o(window).on("click",(function(a){if(0!==o(a.target).closest("[data-type=js-team-filter-tag]").length){var i=o(a.target).closest("[data-type=js-team-filter-tag]").data("id");n(i)?(t=t.filter((function(t){return t!==i})),o('[data-type=js-team-filter-tag][data-id="'.concat(i,'"]')).removeClass("team-filter__item--active")):(t.push(i),o('[data-type=js-team-filter-tag][data-id="'.concat(i,'"]')).addClass("team-filter__item--active")),e()}else 0!==o(a.target).closest("[data-type=js-team-filter-clear]").length&&(t=[],o("[data-type=js-team-filter-tag]").removeClass("team-filter__item--active"),e())}))}(),function(){var t=[];function e(){var e=o("[data-type=js-library-list]");o.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}function n(e){for(var n=0;n<t.length;n++)if(t[n]===e)return!0;return!1}o(window).on("click",(function(a){if(0!==o(a.target).closest("[data-type=js-library-filter-tag]").length){var i=o(a.target).closest("[data-type=js-library-filter-tag]").data("id");n(i)?(t=t.filter((function(t){return t!==i})),o('[data-type=js-library-filter-tag][data-id="'.concat(i,'"]')).removeClass("team-filter__item--active")):(t.push(i),o('[data-type=js-library-filter-tag][data-id="'.concat(i,'"]')).addClass("team-filter__item--active")),e()}else 0!==o(a.target).closest("[data-type=js-library-filter-clear]").length&&(t=[],o("[data-type=js-library-filter-tag]").removeClass("team-filter__item--active"),e())}))}(),function(){var t=[];function e(){var e=o("[data-type=js-event-list]");o.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}function n(e){for(var n=0;n<t.length;n++)if(t[n]===e)return!0;return!1}o(window).on("click",(function(a){if(0!==o(a.target).closest("[data-type=js-event-filter-tag]").length){var i=o(a.target).closest("[data-type=js-event-filter-tag]").data("id");n(i)?(t=t.filter((function(t){return t!==i})),o('[data-type=js-event-filter-tag][data-id="'.concat(i,'"]')).removeClass("team-filter__item--active")):(t.push(i),o('[data-type=js-event-filter-tag][data-id="'.concat(i,'"]')).addClass("team-filter__item--active")),e()}else 0!==o(a.target).closest("[data-type=js-event-filter-clear]").length&&(t=[],o("[data-type=js-event-filter-tag]").removeClass("team-filter__item--active"),e())}))}(),function(){function t(){console.log("bafFilter ajax");var t=[],e=o("[data-type=js-baf-list]");o("[data-type=js-baf-filter-tag]").each((function(){o(this).hasClass("team-filter__item--active")&&(t[t.length]=o(this).attr("data-id"))})),console.log(t),o.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}console.log("bafFilter"),o("[data-type=js-baf-filter-tag]").on("click",(function(e){e.preventDefault(),console.log("bafFilter click tag"),o(this).toggleClass("team-filter__item--active"),t()})),o("[data-type=js-baf-filter-clear]").on("click",(function(e){console.log("bafFilter click tag"),e.preventDefault(),o("[data-type=js-baf-filter-tag]").each((function(){o(this).hasClass("team-filter__item--active")&&o(this).removeClass("team-filter__item--active")})),t()}))}(),function(){function t(){console.log("faqFilter ajax");var t=[],e=o("[data-type=js-faq-list]");o("[data-type=js-faq-filter-tag]").each((function(){o(this).hasClass("team-filter__item--active")&&(t[t.length]=o(this).attr("data-id"))})),console.log(t),o.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t}}).done((function(t){e.html(t)}))}console.log("faqFilter"),o("[data-type=js-faq-filter-tag]").on("click",(function(e){e.preventDefault(),console.log("faqFilter click tag"),o(this).toggleClass("team-filter__item--active"),t()})),o("[data-type=js-faq-filter-clear]").on("click",(function(e){console.log("faqFilter click tag"),e.preventDefault(),o("[data-type=js-faq-filter-tag]").each((function(){o(this).hasClass("team-filter__item--active")&&o(this).removeClass("team-filter__item--active")})),t()}))}(),function(){var t=[],e=[];function n(){var n=o("[data-type=js-public-list]");console.log(t),console.log(e),o.ajax({method:"POST",url:window.location.href,data:{ajax:1,tags:t,authors:e}}).done((function(t){n.html(t)}))}function a(e){for(var n=0;n<t.length;n++)if(t[n]===e)return!0;return!1}o(window).on("click",(function(e){if(0!==o(e.target).closest("[data-type=js-public-filter-tag]").length){var i=o(e.target).closest("[data-type=js-public-filter-tag]").data("id");a(i)?(t=t.filter((function(t){return t!==i})),o('[data-type=js-public-filter-tag][data-id="'.concat(i,'"]')).removeClass("team-filter__item--active")):(t.push(i),o('[data-type=js-public-filter-tag][data-id="'.concat(i,'"]')).addClass("team-filter__item--active")),n()}else 0!==o(e.target).closest("[data-type=js-public-filter-clear]").length&&(t=[],o("[data-type=js-public-filter-tag]").removeClass("team-filter__item--active"),n())})),o(window).on("click",(function(t){if(0!==o(t.target).closest("[data-type=js-public-filter-authors]").length){var i=o(t.target).closest("[data-type=js-public-filter-authors]"),r=i.data("id"),s=i.data("key");r&&(r=JSON.parse(r),console.log(r)),console.log(r),a(r)?(e=e.filter((function(t){return t!==r})),o('[data-type=js-public-filter-authors][data-key="'.concat(s,'"]')).removeClass("articles-authors__item--active")):(e.push(r),o('[data-type=js-public-filter-authors][data-key="'.concat(s,'"]')).addClass("articles-authors__item--active")),n()}else 0!==o(t.target).closest("[data-type=js-public-filter-clear]").length&&(e=[],o("[data-type=js-public-filter-authors]").removeClass("articles-authors__item--active"),n())}))}(),o(document).on("click","[data-type=show_more_click]",(function(t){var e=o(this),n=window.location.pathname.split("/"),a=e.attr("data-url"),i=e.attr("data-tags"),r=e.parents("[data-type-container=main-items-container]").find("[data-container=items]");console.log("show more"),i&&(i=JSON.parse(i)),a&&(e.remove(),o.ajax({method:"POST",url:a,data:{ajax:1,tags:i}}).done((function(t){var e=o(t).find("[data-type=show_more_click]"),a=o(t).find("[data-type=item]");if("library"==n[2]){var i=o(document).find("[data-container=items]");console.log(i),console.log(o(t)),i.append(o(t)),e&&i.after(e)}else if("events"==n[2]){var s=o(document).find("[data-container=items]");console.log(s),console.log(o(t)),s.append(o(t)),e&&s.after(e)}else if("publications"==n[1]){var c=o(document).find("[data-container=items]");console.log(c),console.log(o(t)),c.append(o(t)),e&&c.after(e)}else r.append(a);e&&r.after(e),window.scroller.update()})))})),console.log("services Section Filter Types"),o("[data-type=js-sec-serv-filter-tag]").on("click",(function(t){t.preventDefault(),o("[data-type=js-sec-serv-filter-tag]").each((function(){o(this).hasClass("development__names-item--active")&&o(this).removeClass("development__names-item--active")})),console.log("click Section Filter Types"),o(this).addClass("development__names-item--active");var e=o(".development__names-item--active").html();o("[data-type=item-filter-serv-types]").each((function(){var t=o(this).attr("data-tag");e==t?o(this).css("display","block"):o(this).css("display","none")}))})),o(document).on("submit","[data-type=js-form]",(function(t){console.log("form feedback"),t.preventDefault();var e=o(this),n=e.siblings("[data-type=form-response]"),a=e.attr("data-url"),i=e.attr("data-event-type"),r="application/x-www-form-urlencoded; charset=UTF-8",s=!0,c=[],l=[],d={};if(console.log(i),"FILE"==i){console.log("- if FILE -"),d=new FormData,r=!1,s=!1;var f=e.find("[data-type=file]").prop("files")[0];console.log(f),d.append("file",f),o("[data-type=tooth]").each((function(){o(this).hasClass("tooth-button--destroyed")&&c.push(o(this).attr("data-tooth-id")),o(this).hasClass("tooth-button--removed")&&l.push(o(this).attr("data-tooth-id"))})),d.append("UF_DESTROYED",c),d.append("UF_REMOVED",l)}e.find("[data-type=get-field]").each((function(){var t=o(this).attr("data-uf"),e=o(this).val();"FILE"==i?d.append(t,e):d[t]=e})),console.log(d),o.ajax({type:"POST",url:a,dataType:"json",contentType:r,processData:s,data:d,success:function(t){!0===t.success&&(e.addClass("form--hidden"),n.addClass("response--active"))}})}))}));n(679);var a=n(566),i=n(638);function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}i((function(){var t=i(".index-lab-slider"),e=t.find(".block__nav-item"),n=t.find(".slider-control__item");n.length&&n.on("click",(function(){console.log(111),e.toggleClass("block__nav-item--active")}))}));var l=1280;i(window).on("load",(function(){var t=i("[data-slider-id]");0!==t.length&&t.each((function(){var t=i(this),e=t.data("slider-id"),n=t.data("slider-prev"),o=t.data("slider-next"),r=i('[data-slider-button="'.concat(n,'"]')),d=i('[data-slider-button="'.concat(o,'"]')),f={slidesPerView:"auto",spaceBetween:20,breakpoints:c({},l,{spaceBetween:40})};switch(e){case 1:case 2:f=s(s({},f),{},{loop:!0});break;case 3:case 4:f={};break;case 5:case 6:f=s(s({},f),{},{loop:!0});break;case 7:f=s(s({},f),{},{loop:!0,breakpoints:c({},l,{spaceBetween:100,allowTouchMove:!1})});break;case 8:f=s(s({},f),{},{loop:!0,centeredSlides:!0});break;case 20:f=s(s({},f),{},{spaceBetween:10,loop:!0,centeredSlides:!0,breakpoints:c({},l,{spaceBetween:40,allowTouchMove:!1,centeredSlides:!1})});break;case 21:f=s(s({},f),{},{loop:!0,allowTouchMove:!1});break;case 100:f=s(s({},f),{},{allowTouchMove:!1,autoHeight:!0,loop:!0});break;case 106:f=s({},f);break;case 105:f=s(s({},f),{},{autoHeight:!0,thumbs:{swiper:106}});break;case 140:f=s(s({},f),{},{loop:!0});break;case 160:f=s(s({},f),{},{spaceBetween:20,breakpoints:c({},l,{spaceBetween:40})})}var u=new a.Z(t[0],f);r.on("click",(function(){u.slidePrev()})),d.on("click",(function(){u.slideNext()}))}))})),i((function(){var t=new a.Z(".development__names",{slidesPerView:"auto",slideToClickedSlide:!0,spaceBetween:0,breakpoints:c({},l,{spaceBetween:0})}),e=new a.Z(".development__desc",{loop:!0,thumbs:{swiper:t},spaceBetween:0,breakpoints:c({},l,{spaceBetween:0})}),n=i(".lab-btn-prev"),o=i(".lab-btn-next");n.on("click",(function(){t.slidePrev(),e.slidePrev()})),o.on("click",(function(){t.slideNext(),e.slideNext()}))})),i((function(){var t=new a.Z(".mission__thumbs",{slidesPerView:"auto",initialSlide:1,slideToClickedSlide:!0,spaceBetween:20,slideThumbActiveClass:"swiper-slide-active",freeMode:!0,breakpoints:c({},l,{spaceBetween:60})}),e=new a.Z(".mission__slider",{loop:!0,allowTouchMove:!1,initialSlide:1,thumbs:{swiper:t}}),n=i(".mis-btn-prev"),o=i(".mis-btn-next");n.on("click",(function(){t.slidePrev(),e.slidePrev()})),o.on("click",(function(){t.slideNext(),e.slideNext()}))})),i((function(){if(0!==i(".index").length){function t(){i(".swiper-slide").each((function(){var t=i(this),e=t.find(".index__mid-img"),n=t.find(".index__mid-description"),o=e.width();n.css("max-width",o)}))}t(),i(window).one("resize",(function e(){setTimeout((function(){t(),i(window).one("resize",e)}),1e3/30)}))}}));n(638);var d=n(638);function f(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,r=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return r=t.done,t},e:function(t){s=!0,i=t},f:function(){try{r||null==n.return||n.return()}finally{if(s)throw i}}}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}document.addEventListener("DOMContentLoaded",(function(){var t,e=document.querySelectorAll("input[data-tel-input]"),n=function(t){return t.value.replace(/\D/g,"")},o=function(t){var e=t.target,o=n(e),a=t.clipboardData||window.clipboardData;if(a){var i=a.getData("Text");if(/\D/g.test(i))return void(e.value=o)}},a=function(t){var e=t.target,o=n(e),a=e.selectionStart,i="";if(!o)return e.value="";if(e.value.length==a){if(["7","8","9"].indexOf(o[0])>-1){"9"==o[0]&&(o="7"+o);var r="8"==o[0]?"8":"+7";i=e.value=r+" ",o.length>1&&(i+="("+o.substring(1,4)),o.length>=5&&(i+=") "+o.substring(4,7)),o.length>=8&&(i+="-"+o.substring(7,9)),o.length>=10&&(i+="-"+o.substring(9,11))}else i="+"+o.substring(0,16);e.value=i}else t.data&&/\D/g.test(t.data)&&(e.value=o)},i=function(t){var e=t.target.value.replace(/\D/g,"");8==t.keyCode&&1==e.length&&(t.target.value="")},r=f(e);try{for(r.s();!(t=r.n()).done;){var s=t.value;s.addEventListener("keydown",i),s.addEventListener("input",a,!1),s.addEventListener("paste",o,!1)}}catch(t){r.e(t)}finally{r.f()}}));var h=d(".news-subscribe__form-email"),p=d(".news-subscribe__form-placeholder"),v=d(".news-subscribe__input"),m=d(".news-subscribe__label"),g=d(".form-new__input"),b=d(".form-new__label");d((function(){h.on("click",(function(t){d(t.target).closest(".news-subscribe__form-placeholder").addClass("input-focus")}))})),d((function(){v.on("click",(function(t){d(t.target).closest(".news-subscribe__label").addClass("input-focus")}))})),d((function(){g.on("click",(function(t){d(t.target).closest(".form-new__label").addClass("input-focus")}))})),d(window).on("click",(function(t){0===d(t.target).closest(h).length?p.removeClass("input-focus"):(p.removeClass("input-focus"),d(t.target).closest(p).addClass("input-focus"))})),d(window).on("click",(function(t){0===d(t.target).closest(v).length?m.removeClass("input-focus"):(m.removeClass("input-focus"),d(t.target).closest(m).addClass("input-focus"))})),d(window).on("click",(function(t){0===d(t.target).closest(g).length?b.removeClass("input-focus"):(b.removeClass("input-focus"),d(t.target).closest(b).addClass("input-focus"))}));var _=window.matchMedia("(min-width: ".concat(1280,"px)"));function y(t,e){console.log(t),window.dispatchEvent(new CustomEvent(t,{detail:e}))}window.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector(".preloader");if(t){function e(){t.classList.add("preloader--hidden")}_.matches?window.addEventListener("psx:3",(function(){e(),y("psx:4")})):window.addEventListener("load",e)}})),window.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector(".start-video");if(t&&_.matches){var e,n,o=function(){var e={maxHeight:t.style.maxHeight,height:t.style.height};function o(e){t.style.maxHeight=e.maxHeight,t.style.height=e.height}return function(i,r){var s;if(console.log("upppdate"),a(i)>n){var c=i.width/n;console.log("upppdate",c),s={maxHeight:"none",height:c+"px"}}else s={maxHeight:"",height:""};if(function(t,e){return t.maxHeight===e.height&&t.height===e.height}(e,s))o(s),setTimeout(r);else{var l=new MutationObserver((function(){r(),l.disconnect()}));l.observe(t,{attributes:!0}),setTimeout((function(){return o(s)}))}e=s}}();function a(t){return t.width/t.height}!function(e){var n=new MutationObserver((function(){e(),n.disconnect()}));n.observe(t,{attributes:!0}),setTimeout((function(){var e=t.getAttribute("data-src"),n=t.getAttribute("data-poster");t.setAttribute("src",e),t.setAttribute("poster",n)}))}((function(){t.addEventListener("canplaythrough",(function(){e={width:t.videoWidth,height:t.videoHeight},n=a(e),y("psx:1")})),window.addEventListener("psx:2",(function(t){var e=t.detail;return o(e,(function(){return y("psx:3")}))})),window.addEventListener("psx:4",(function(){return t.play()})),t.addEventListener("ended",(function(){return y("psx:5")}))}))}}));var w,C,x=n(638);function k(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null==n)return;var o,a,i=[],r=!0,s=!1;try{for(n=n.call(t);!(r=(o=n.next()).done)&&(i.push(o.value),!e||i.length!==e);r=!0);}catch(t){s=!0,a=t}finally{try{r||null==n.return||n.return()}finally{if(s)throw a}}return i}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return j(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}window.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector(".xray");if(t&&_.matches){var e=function(){var e=t.querySelectorAll(".xray__image"),n=e.length,o=0;function a(){return o>=n}return function(t){a()?t():e.forEach((function(e){return function(t,e){var n=new MutationObserver((function(){e(),n.disconnect()}));n.observe(t,{attributes:!0}),setTimeout((function(){var e=t.getAttribute("data-href");t.setAttribute("href",e)}))}(e,(function(){return e.addEventListener("load",(function(){return function(t){o++,a()&&t()}(t)}))}))}))}}();window.addEventListener("psx:1",(function(){return y("psx:2",{width:(e=t.getBoundingClientRect()).width,height:e.height});var e})),window.addEventListener("psx:5",(function(){e((function(){}))}))}})),x(window).on("load",(function(){x(".xray").each((function(){var t=x(this),e=t.find(".xray__image"),n=t.find(".xray__ellipse");var o,a,i=k((o=null,a=null,e.each((function(){var t=getComputedStyle(this),e=+t.width.slice(0,-2),n=+t.height.slice(0,-2);o=null===o||e<o?e:o,a=null===a||n<a?n:a})),[o,a]),2);function r(){var e,n=new CustomEvent("xray-change-size",{detail:(e=t[0].getBoundingClientRect(),[e.width,e.height])});window.dispatchEvent(n)}w=i[0],C=i[1],t.attr("viewBox","0 0 ".concat(w," ").concat(C)),n.attr("cx",-191.5),n.attr("cy",-115),n.attr("rx",191.5),n.attr("ry",115),n.css("opacity",0),e.attr("width",w),e.attr("height",C),r(),x(window).one("mousemove",(function e(o){!function(e){n.css("opacity",1);var o=e.originalEvent.clientX,a=e.originalEvent.clientY,i=t[0].getBoundingClientRect(),r=i.x,s=i.y,c=i.width,l=i.height,d=w/C;if(c/l<d){var f=d*l,u=w*((o-(r-(f-c)/2))/f),h=C*((a-s)/l);n.attr("cx",u),n.attr("cy",h),n.attr("transform","rotate(".concat(15," ").concat(u," ").concat(h,")"))}else{var p=c/d,v=w*((o-r)/c),m=C*((a-(s-(p-l)/2))/p);n.attr("cx",v),n.attr("cy",m),n.attr("transform","rotate(".concat(15," ").concat(v," ").concat(m,")"))}}(o),setTimeout((function(){x(window).one("mousemove",e)}),1e3/60)})),x(window).one("mousemove",(function(){n.css("opacity","")})),x(window).on("resize",r)}))}));n(266),n(917);var S=n(164),E=n.n(S),O=n(660),T=n.n(O),A=n(638);function L(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null==n)return;var o,a,i=[],r=!0,s=!1;try{for(n=n.call(t);!(r=(o=n.next()).done)&&(i.push(o.value),!e||i.length!==e);r=!0);}catch(t){s=!0,a=t}finally{try{r||null==n.return||n.return()}finally{if(s)throw a}}return i}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return D(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return D(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}A((function(){var t=A(".header");if(0!==t.length){var e={id:null,leave:function(t){console.log(t)},close:function(){A('[data-modal-id="'.concat(this.id,'"]')).removeAttr("data-modal-active"),A('[data-modal-button="'.concat(this.id,'"]')).removeAttr("data-modal-active"),A('[data-modal-id="'.concat(this.id,'"]')).off("mouseleave",this.leave)},open:function(){A('[data-modal-id="'.concat(this.id,'"]')).attr("data-modal-active",""),A('[data-modal-button="'.concat(this.id,'"]')).attr("data-modal-active",""),A('[data-modal-id="'.concat(this.id,'"]')).on("mouseleave",this.leave)},update:function(t){this.id=t},change:function(t){this.close(),this.update(t===this.id?null:t),this.open()}};A("[data-modal-button]").on("click",(function(){var n=A(this).data("modal-button");e.change(n),0!==t.find("[data-modal-active]").length?(t.addClass("header--modal"),A(window).one("scroll",(function(){t.removeClass("header--modal"),e.change(null)}))):t.removeClass("header--modal")})),A(window).on("click",(function(n){0!==A(n.target).closest(".header__container").length&&!A(n.target).hasClass("header__container")||0!==A(n.target).closest("[data-modal-active]").length||(e.change(null),t.removeClass("header--modal"))})),window.matchMedia("(min-width: ".concat(1280,"px)")).addListener((function(){e.change(null)}))}})),A((function(){if(0!==A(".vacancy").length){var t=A(".vacancy-btn"),e=A(".modal-forms-vacancy"),n=A(".body");t.on("click",(function(){e.hasClass("vacancy--modal-open")?(e.removeClass("vacancy--modal-open"),n.removeClass("body-fixed")):e.addClass("vacancy--modal-open")})),A(window).on("click",(function(n){e.hasClass("vacancy--modal-open")&&0===A(n.target).closest(t).length&&0===A(n.target).closest(".modal-forms__form").length&&e.removeClass("vacancy--modal-open")}))}})),A((function(){if(0!==A(".header").length){var t=A(".callback-button"),e=A(".modal-forms-header");A(".body");t.on("click",(function(){e.hasClass("vacancy--modal-open")?e.removeClass("vacancy--modal-open"):e.addClass("vacancy--modal-open")})),A(window).on("click",(function(n){e.hasClass("vacancy--modal-open")&&0===A(n.target).closest(t).length&&0===A(n.target).closest(".modal-forms__form").length&&e.removeClass("vacancy--modal-open")}))}})),A((function(){var t=A("[data-tabs-id]");if(0!==t.length){var e=[];t.each((function(){var t=A(this).data("tabs-id");-1===e.indexOf(t)&&e.push(t)})),e.forEach((function(t){var e=A('[data-tabs-id="'.concat(t,'"][data-tabs-tab]')),n=A('[data-tabs-id="'.concat(t,'"][data-tabs-button]'));if(0!==e.length){var o={id:null,update:function(t){this.id=t},close:function(){e.filter('[data-tabs-tab="'.concat(this.id,'"]')).slideUp(500),n.filter('[data-tabs-button="'.concat(this.id,'"]')).removeAttr("data-tabs-active")},open:function(){e.filter('[data-tabs-tab="'.concat(this.id,'"]')).slideDown(500),n.filter('[data-tabs-button="'.concat(this.id,'"]')).attr("data-tabs-active","")},change:function(t){t&&t!==this.id&&(this.close(),this.update(t),this.open())},init:function(){var t=n.filter("[data-tabs-active]").data("tabs-button");this.update(t)}};o.init(),n.on("click mouseenter",(function(){var t=A(this).data("tabs-button");o.change(t)}))}}))}})),A((function(){if(0!==A(".sticky").length)new(T())(".sticky")})),A((function(){var t=A("[data-sticky-id]");0!==t.length&&t.each((function(){var t=A(this),e=t.data("sticky-id"),n=A('[data-sticky-end="'.concat(e,'"]')),o=t.data("sticky-top"),a=A(t).offset().top-o>=0?A(t).offset().top-o:0,i=t.data("sticky-bottom"),r=(0!==n.length?n.offset().top:A(document).height())-i-t.height()-o,s={isSticky:!1,isStickyPrev:!1,isChange:!1,init:function(){this.update(),this.isStickyPrev=this.isSticky,this.isChange=!1},update:function(){var t=window.pageYOffset;this.isStickyPrev=this.isSticky,this.isSticky=t>=a&&t<=r,this.isChange=this.isStickyPrev!==this.isSticky}};s.init(),A(window).on("scroll",(function(){s.update(),s.isChange&&(s.isSticky?t.css("position","fixed").css("top","".concat(o,"px")):t.css("position","").css("top",""))}))}))}));{function P(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)}function M(t){for(var e=t,n=0;0!==e.length&&e[0]!==document.body;)n+=e[0].offsetTop,e=A(e[0].offsetParent);return n}A((function(){A(".my-sticky").each((function(){var t=A(this),e=t.data("my-sticky-bottom"),n=A(".footer");function o(){if(e){var t=M(A("#".concat(e)));a.bottom=P()-t+160}else a.bottom=n[0].offsetHeight+160}var a={top:140,bottom:null,startY:null,y:null,height:null,mode:null};o();var i=t.parent();i.css("position","relative");var r=t.clone();r.css("opacity",0),r.css("pointer-events","none"),r.css("position","absolute"),r.css("top","".concat(t[0].offsetTop,"px")),r.css("width","".concat(t[0].offsetWidth,"px")),i.append(r);var s=t.clone();function c(){o(),r.css("width","".concat(t[0].offsetWidth,"px")),s.css("width","".concat(t[0].offsetWidth,"px")),s.css("top","".concat(a.top,"px")),r.css("top","".concat(t[0].offsetTop,"px"));var e=M(r)+r.height(),n=P()-a.bottom;r.css("transform","\n\t\t\t\t\ttranslateY(".concat(n-e,"px)\t\n\t\t\t\t"));var i=A(window).scrollTop();switch(i<M(t)-a.top?a.mode="default":i+a.top<P()-a.bottom-s.height()?a.mode="fixed":a.mode="bottom",a.mode){case"fixed":console.log("fixed"),t.css("opacity",0),t.css("pointer-events","none"),r.css("opacity",0),r.css("pointer-events","none"),s.css("opacity",""),s.css("pointer-events","");break;case"bottom":console.log("bottom"),t.css("opacity",0),t.css("pointer-events","none"),s.css("opacity",0),s.css("pointer-events","none"),r.css("opacity",""),r.css("pointer-events","");break;default:console.log("default"),s.css("opacity",0),s.css("pointer-events","none"),r.css("opacity","0"),r.css("pointer-events","none"),t.css("opacity",""),t.css("pointer-events","")}}s.css("opacity",0),s.css("pointer-events","none"),s.css("position","fixed"),s.css("top","".concat(a.top,"px")),s.css("width","".concat(t[0].offsetWidth,"px")),i.append(s),c(),A(window).on("scroll",c),A(window).on("resize",c),c}))}))}A((function(){var t=A(".mission__spoiler");t.each((function(){var e=A(this),n=e.data("spoiler-group"),o=e.find(".mission__spoiler-button");e.find(".mission__spoiler-drop");o.on("click",(function(o){o.preventDefault(),n?t.filter('[data-spoiler-group="'.concat(n,'"]')).each((function(){var t=A(this);t.find(".mission__spoiler-drop");t.toggleClass("mission__spoiler--active")})):e.toggleClass("mission__spoiler--active")}))}))})),A((function(){var t=A(".nav__list"),e=t.find(".mission__spoiler"),n=t.find(".mission__spoiler-button"),o=t.find(".mission__spoiler-drop");n.on("click",(function(t){var n=A(t.target).closest(".mission__spoiler"),a=n.find(".mission__spoiler-drop");n.hasClass(".mission__spoiler--active")?(e.removeClass("mission__spoiler--active"),o.slideUp(500)):(A(".mission__spoiler--active").find(".mission__spoiler-drop").slideUp(500),A(".mission__spoiler--active").removeClass("mission__spoiler--active"),a.slideDown(500),n.addClass("mission__spoiler--active"))}))}));{function F(t){return t[0].scrollTop/(t[0].scrollHeight-t[0].clientHeight)}function q(t,e){requestAnimationFrame((function(){t.css("top","".concat(100*e,"%"))}))}function H(t,e,n){return t<e?0:t>n?1:(t-e)/(n-e)}A((function(){A(".block").each((function(){var t=A(this),e=t.find(".block__scroll"),n=F(e),o=t.find(".block__scrollbar-thumb"),a=t.find(".block__slide--1"),i=t.find(".block__slide--2");q(o,n);var r=function(){!function(t,e,n,o){var a=H(e,n,o);requestAnimationFrame((function(){t.css("transform","translateY(-".concat(100*a,"%)")),t.css("opacity",1-a)}))}(a,n,.2,.75),function(t,e,n,o){var a=H(e,n,o);requestAnimationFrame((function(){t.css("transform","translateY(".concat(100*(1-a),"%)")),t.css("opacity",a)}))}(i,n,.25,.8)};r(),e.on("scroll",(function(){n=F(e),q(o,n),r()}))}))}))}if(A((function(){var t=A(".prosthetic-slider__filter"),e=t.find(".development__names-item"),n=A(".prosthetic-slider__slide");e.length&&t.on("click",(function(t){e.removeClass("development__names-item--active");var o=A(t.target).closest(e);o.addClass("development__names-item--active");var a=o.data("filter-id");n.css("display","none");var i=A('[data-slide-id="'.concat(a,'"]'));console.log(i),i.css("display","block")}))})),A((function(){var t="component";A(".".concat(t)).each((function(){var e=A(this),n=(e.find(".".concat(t,"__list")),e.find(".".concat(t,"__item"))),o={isMultiLine:!1};function a(t,e){return Math.abs(t-e)<1}function i(){var t=n.filter(":first"),e=n.filter(":last"),i=t.offset().top,r=e.offset().top;o.isMultiLine=!a(i,r),console.log(o)}i(),A(window).on("resize",i),n.on("click",(function(){var n=A(".".concat(t,"__item--active")),o=A(this),i=n.index(),r=o.index();if(i!==r){var s=i<r?"right":"left",c=n.offset().top,l=o.offset().top,d=n.offset().left,f=o.offset().left;if(a(c,l)){var u=Math.abs(d-f),h=document.createElement("div"),p=n.position().top+n.height(),v=n.position().left,m=n.width();h.style.cssText=["transform: ","translate(".concat(v,"px, ").concat(p,"px) "),"scaleX(".concat(m,") ")].join(""),h.classList.add("".concat(t,"__thumb")),e[0].append(h),n.removeClass("".concat(t,"__item--thumb"));var g=o.width(),b=(o.position().left,{FPS:60,DURATION:1e3,startTimestamp:performance.now(),time:null,progress:null});requestAnimationFrame((function e(){var n=performance.now();b.time=n-b.startTimestamp,b.progress=b.time/b.DURATION,b.progress>1&&(b.progress=1);var a=m+(g-m)*b.progress,i=v+u*b.progress*("right"===s?1:-1);h.style.cssText=["transform: ","translate(".concat(i,"px, ").concat(p,"px) "),"scaleX(".concat(a,") ")].join(""),b.progress<1?requestAnimationFrame(e):(o.addClass("".concat(t,"__item--thumb")),h.remove())}))}else{e.width(),e.offset().left;if("right"===s);else;}}})),n.on("click",(function(){n.removeClass("".concat(t,"__item--active")),A(this).addClass("".concat(t,"__item--active"))}))}))})),A((function(){A(".tabs").each((function(){var t=A(this),e=t.find(".tabs__item"),n=t.find(".tabs__background");!function(){function t(){var t=0;function o(t){return t.offsetLeft+t.offsetWidth}e.each((function(){t=o(this)>t?o(this):t})),n.css("width","".concat(t,"px"))}t(),setTimeout(t,250);A(window).one("resize",(function e(){t(),setTimeout((function(){t(),A(window).one("resize",e)}),1e3/15)}))}(),e.on("click",(function(){var t=A(".tabs__item--active"),e=A(this);t[0]!==e[0]&&(t.removeClass("tabs__item--active"),e.addClass("tabs__item--active"),s(t,e))}));var o=L(function(){var t,e=document.createElement("div");function o(){var n=t[0].offsetTop+t[0].offsetHeight,o=t[0].offsetLeft,a=t[0].offsetWidth;e.style.transform="translate(".concat(o,"px, ").concat(n,"px) scaleX(").concat(a,")")}e.classList.add("tabs__thumb"),e.style.cssText="\n          position: absolute;\n          bottom: 100%;\n          left: 0;\n          transform-origin: left;\n          width: 1px;\n          transition: none;\n        ";function a(){o(),setTimeout((function(){o(),window.addEventListener("resize",a,{once:!0})}),1e3/15)}function i(){e.remove(),window.removeEventListener("resize",a)}return[function(r){i(),t=r,o(),n.append(e),window.addEventListener("resize",a,{once:!0})},i]}(),2),a=o[0];o[1];setTimeout((function(){a(t.find(".tabs__item--active"))}),250);var i,r,s=function(t,e){i=t,r=e,Math.abs(i[0].offsetTop-r[0].offsetTop)<1?console.log(1):console.log(2)}}))})),A((function(){A.fancybox.defaults.closeExisting=!0,A.fancybox.defaults.touch=!1,A("[data-fancy-button]").on("click",(function(t){t.preventDefault();var e=A(this).data("fancy-button"),n=A('[data-fancy-modal="'.concat(e,'"]'));A.fancybox.open(n)}))})),A((function(){A.fn.BeerSlider=function(t){return t=t||{},this.each((function(){new(E())(this,t)}))},A(".beer-slider").BeerSlider({start:35})})),A((function(){A(".index__target").each((function(){for(var t=A(this),e=t.find(".index__target-background"),n=t.find(".index__target-text"),o=[{colorStart:{r:49,g:187,b:162},colorEnd:{r:60,g:196,b:209},textColor:{r:148,g:255,b:250}},{colorStart:{r:65,g:204,b:206},colorEnd:{r:46,g:125,b:230},textColor:{r:146,g:225,b:255}},{colorStart:{r:100,g:178,b:200},colorEnd:{r:47,g:230,b:186},textColor:{r:146,g:255,b:229}}],a=0,i=0,r=o.length,s=[],c=0;c<r;c++){var l={colorStart:{r:o[(c+1)%r].colorStart.r-o[c].colorStart.r,g:o[(c+1)%r].colorStart.g-o[c].colorStart.g,b:o[(c+1)%r].colorStart.b-o[c].colorStart.b},colorEnd:{r:o[(c+1)%r].colorEnd.r-o[c].colorEnd.r,g:o[(c+1)%r].colorEnd.g-o[c].colorEnd.g,b:o[(c+1)%r].colorEnd.b-o[c].colorEnd.b},textColor:{r:o[(c+1)%r].textColor.r-o[c].textColor.r,g:o[(c+1)%r].textColor.g-o[c].textColor.g,b:o[(c+1)%r].textColor.b-o[c].textColor.b}};s.push(l)}function d(){var t,c,l;t={r:o[i].colorStart.r+s[i].colorStart.r*a,g:o[i].colorStart.g+s[i].colorStart.g*a,b:o[i].colorStart.b+s[i].colorStart.b*a},c={r:o[i].colorEnd.r+s[i].colorEnd.r*a,g:o[i].colorEnd.g+s[i].colorEnd.g*a,b:o[i].colorEnd.b+s[i].colorEnd.b*a},l={r:o[i].textColor.r+s[i].textColor.r*a,g:o[i].textColor.g+s[i].textColor.g*a,b:o[i].textColor.b+s[i].textColor.b*a},e.css("background","linear-gradient(261.11deg, rgb(".concat(t.r,", ").concat(t.g,", ").concat(t.b,") 8.47%, rgb(").concat(c.r,", ").concat(c.g,", ").concat(c.b,") 93.81%)")),n.css("color","rgb(".concat(l.r,", ").concat(l.g,", ").concat(l.b,")")),(a+=.047619047619047616)>1&&(a-=1,i=(i+1)%r)}console.log(o,s),A(window).one("mousemove",(function t(){requestAnimationFrame(d),setTimeout((function(){A(window).one("mousemove",t)}),1e3/60)}))}))})),A((function(){var t=A(".header");if(0!==t.length){var e=A(window).scrollTop();A(window).on("scroll",(function(){var n=A(window).scrollTop();t.hasClass("header--modal")||(n<e?(t.removeClass("header--scroll--down"),t.addClass("header--scroll--up")):(t.removeClass("header--scroll--up"),t.addClass("header--scroll--down"))),n<1&&(t.removeClass("header--scroll--up"),t.removeClass("header--scroll--down")),n>=1?t.addClass("header--scroll"):t.removeClass("header--scroll"),e=n})),A(window).scrollTop()>=1&&(t.addClass("header--scroll--up"),t.addClass("header--scroll"))}})),A((function(){var t=A(".header-modal--mobile");if(0!==t.length){var e=t.find(".header-section__button");t.find(".header-section__dropdown");e.on("click",(function(){var t=A(this).closest(".header-section__item");t.hasClass("header-section__item--active")?(t.find(".header-section__dropdown").slideUp(500),t.removeClass("header-section__item--active")):(A(".header-section__item--active").find(".header-section__dropdown").slideUp(650),A(".header-section__item--active").removeClass("header-section__item--active"),t.find(".header-section__dropdown").slideDown(500),t.addClass("header-section__item--active"))})),t.find(".header-section__section").find(".header-section__section-button").on("click",(function(){var t=A(this).closest(".header-section__section");t.hasClass("header-section__section--active")?(t.find(".header-section__section-dropdown").slideUp(500),t.removeClass("header-section__section--active")):(A(".header-section__section--active").find(".header-section__section-dropdown").slideUp(650),A(".header-section__section--active").removeClass("header-section__section--active"),t.find(".header-section__section-dropdown").slideDown(500),t.addClass("header-section__section--active"))}))}})),A((function(){A(window).on("click",(function(t){var e=A(t.target).closest(".tooth-button");e.length&&(e.hasClass("tooth-button--destroyed")?(e.removeClass("tooth-button--destroyed"),e.addClass("tooth-button--removed")):e.hasClass("tooth-button--removed")?e.removeClass("tooth-button--removed"):e.addClass("tooth-button--destroyed"))}))})),A((function(){A(window).on("click",(function(t){var e=A(t.target).closest(".articles-authors__filter-item");e.length&&e.toggleClass("articles-authors__item--active")}))})),document.querySelector(".ovo")){console.log("ovo");var B=document.querySelector("#block"),U=document.querySelector("#button");console.log(""===B.style.color),new MutationObserver((function(){console.log("update"),console.log(""===B.style.color)})).observe(B,{attributes:!0}),setTimeout((function(){U.addEventListener("click",(function(){console.log(123),B.style.color=""}))}))}},679:function(t,e,n){var o=n(638);o((function(){var t=o("[data-modal-tooltip-id]");if(t.length){var e="vacancy--modal-open",n={id:null};o(window).on("click",(function(a){var i=o(a.target),r=i.closest(t);if(r.length)n.id=r.data("modal-tooltip-id"),o("#".concat(n.id)).addClass(e);else if(n.id){var s=o("#".concat(n.id)),c=s.find(".modal-forms__form");i.closest(c).length||(s.removeClass(e),n.id=null)}}))}}))}},n={};function o(t){var a=n[t];if(void 0!==a)return a.exports;var i=n[t]={exports:{}};return e[t].call(i.exports,i,i.exports,o),i.exports}o.m=e,t=[],o.O=function(e,n,a,i){if(!n){var r=1/0;for(l=0;l<t.length;l++){n=t[l][0],a=t[l][1],i=t[l][2];for(var s=!0,c=0;c<n.length;c++)(!1&i||r>=i)&&Object.keys(o.O).every((function(t){return o.O[t](n[c])}))?n.splice(c--,1):(s=!1,i<r&&(r=i));s&&(t.splice(l--,1),e=a())}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[n,a,i]},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,{a:e}),e},o.d=function(t,e){for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={143:0,532:0};o.O.j=function(e){return 0===t[e]};var e=function(e,n){var a,i,r=n[0],s=n[1],c=n[2],l=0;for(a in s)o.o(s,a)&&(o.m[a]=s[a]);if(c)var d=c(o);for(e&&e(n);l<r.length;l++)i=r[l],o.o(t,i)&&t[i]&&t[i][0](),t[r[l]]=0;return o.O(d)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var a=o.O(void 0,[795,532],(function(){return o(745)}));a=o.O(a)}();