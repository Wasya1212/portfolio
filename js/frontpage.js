!function(n){var o={};function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=11)}({11:function(t,e){function n(){var t=document.querySelector(".intro"),e=document.querySelector(".intro__animated-block-2");o(e,{w:t.offsetWidth,h:t.offsetHeight}),window.addEventListener("resize",function(){o(e,{w:t.offsetWidth,h:t.offsetHeight})})}function o(t,e){var n=e.w,o=n/1920*486,r=n/1920*1080/e.h*426,e=n/1920*455-o/2,n=660/(1920/n)-r/2;t.style.width="".concat(o,"px"),t.style.height="".concat(r,"px"),t.style.left="".concat(e,"px"),t.style.bottom="".concat(n,"px")}document.addEventListener("DOMContentLoaded",n,!0),document.init?document.init=[function(){n()}]:document.init=[]}});