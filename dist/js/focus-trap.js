!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.initJqueryPlugins(),t&&this.attach(t)}var t,n,l;return t=e,(n=[{key:"attach",value:function(e){this.element=e,this.lastFocusedElement=null,this.focusableElements=!1,this.firstFocusableElement=!1,this.lastFocusableElement=!1}},{key:"start",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t&&this.attach(t),this.element?(null==this.lastFocusedElement&&(this.lastFocusedElement=$(document.activeElement)),this.focusableElements=this.element.find(":focusable"),this.firstFocusableElement=this.focusableElements.first(),this.lastFocusableElement=this.focusableElements.last(),this.firstFocusableElement.focus(),this.element.off("keydown.focustrap").on("keydown.focustrap",(function(t){return e.keyHandler(t)}))):console.warn("No element set for FocusTrap")}},{key:"stop",value:function(){var e=this;this.element&&(this.element.off("keydown.focustrap",(function(t){return e.keyHandler(t)})),this.lastFocusedElement.focus())}},{key:"keyHandler",value:function(e){var t=this;switch(e.keyCode){case 9:if(1===this.focusableElements.length){e.preventDefault();break}e.shiftKey?$(document.activeElement).is(t.firstFocusableElement)&&(e.preventDefault(),t.lastFocusableElement.focus()):$(document.activeElement).is(t.lastFocusableElement)&&(e.preventDefault(),t.firstFocusableElement.focus())}}},{key:"initJqueryPlugins",value:function(){jQuery.extend(jQuery.expr[":"],{focusable:function(e,t,n){return $(e).is('button, [href], :input:not([disabled]):not([type="hidden"]), [tabindex]:not([tabindex="-1"]), iframe, object, embed')}})}}])&&o(t.prototype,n),l&&o(t,l),e}();t.default=l},function(e,t,n){e.exports=n(0)}]);