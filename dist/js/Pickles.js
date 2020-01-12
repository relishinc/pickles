/*!
 * 
 *    Pickles - Relish's UI toolkit
 *    Author: Relish
 *    Version: v1.0.0
 *    Url: https://reli.sh
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Pickles"] = factory(require("jQuery"));
	else
		root["Pickles"] = factory(root["jQuery"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* CustomEvent polyfill IE9+
------------------------------- */
;

(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "jQuery"
var external_jQuery_ = __webpack_require__(0);

// CONCATENATED MODULE: ./js/utils/focus-trap.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* Focus trap plugin
----------------------------- */
var FocusTrap =
/*#__PURE__*/
function () {
  function FocusTrap() {
    var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, FocusTrap);

    // vars
    this.namespace = 'focusTrap'; // start it

    this.initJqueryPlugins();
    this.attach($el);
  }

  _createClass(FocusTrap, [{
    key: "attach",
    value: function attach($el) {
      if (!$el) {
        console.warn('FocusTrap needs an element to focus on');
        return;
      }

      this.element = $el instanceof jQuery ? $el : $($el);
      this.lastFocusedElement = null;
      this.focusableElements = false;
      this.firstFocusableElement = false;
      this.lastFocusableElement = false;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if ($el) this.attach($el);

      if (!this.element) {
        console.warn('No element set for FocusTrap');
        return;
      }

      if (this.lastFocusedElement == null) {
        this.lastFocusedElement = $(document.activeElement);
      }

      this.focusableElements = this.element.find(':focusable').sort(function (a, b) {
        var aIndex = !isNaN(parseInt($(a).attr('tabindex'))) ? parseInt($(a).attr('tabindex')) : 9999,
            bIndex = !isNaN(parseInt($(b).attr('tabindex'))) ? parseInt($(b).attr('tabindex')) : 9999;
        return aIndex - bIndex;
      });
      this.firstFocusableElement = this.focusableElements.first();
      this.lastFocusableElement = this.focusableElements.last();
      this.firstFocusableElement.focus();
      this.element.off("keydown.".concat(this.namespace)).on("keydown.".concat(this.namespace), function (e) {
        return _this.keyHandler(e);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.element) {
        return;
      }

      this.element.off("keydown.".concat(this.namespace));
      this.lastFocusedElement.focus();
    } // handle key events

  }, {
    key: "keyHandler",
    value: function keyHandler(e) {
      var _this2 = this;

      var KEY_TAB = 9;
      var KEY_ESC = 27; // focus trapping

      var handleBackwardTab = function handleBackwardTab() {
        if ($(document.activeElement).is(_this2.firstFocusableElement)) {
          e.preventDefault();

          _this2.lastFocusableElement.focus();
        }
      };

      var handleForwardTab = function handleForwardTab() {
        if ($(document.activeElement).is(_this2.lastFocusableElement)) {
          e.preventDefault();

          _this2.firstFocusableElement.focus();
        }
      }; // which keys are pressed


      switch (e.keyCode) {
        case KEY_TAB:
          if (this.focusableElements.length === 1) {
            e.preventDefault();
            break;
          }

          if (e.shiftKey) {
            handleBackwardTab();
          } else {
            handleForwardTab();
          }

          break;

        case KEY_ESC:
          break;

        default:
          break;
      }
    } // add :focusable pseudo selector

  }, {
    key: "initJqueryPlugins",
    value: function initJqueryPlugins() {
      jQuery.extend(jQuery.expr[':'], {
        focusable: function focusable(el, index, selector) {
          return $(el).is('button, [href], :input:not([disabled]):not([type="hidden"]), [tabindex]:not([tabindex="-1"]), iframe, object, embed');
        }
      });
    }
  }]);

  return FocusTrap;
}();


// CONCATENATED MODULE: ./js/utils/utils.js
/* Return the right transitionend event type
----------------------------- */
var whichTransitionEvent = function whichTransitionEvent() {
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (var t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};
/* Is element in viewport?
----------------------------- */

var isInViewport = function isInViewport($el) {
  var bounding = $el.getBoundingClientRect();
  return bounding.top >= -bounding.width && bounding.left >= -bounding.height && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + bounding.height && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + bounding.width;
};
/* Debounce
----------------------------- */
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
;
// CONCATENATED MODULE: ./js/ui/modal.js
function modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) modal_defineProperties(Constructor, staticProps); return Constructor; }



/* Modal plugin
----------------------------- */

var modal_Modal =
/*#__PURE__*/
function () {
  function Modal() {
    var _this = this;

    var $options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    modal_classCallCheck(this, Modal);

    // settings
    var defaults = {
      bodyOpenClass: 'modal--open',
      modalOpenClass: 'open',
      overlayClass: 'modal-overlay',
      modalClass: 'modal',
      openSelector: '[data-modal]',
      closeSelector: '[data-close-modal]'
    };
    this.options = Object.assign({}, defaults, $options); // vars

    this.namespace = 'modal';
    this.scrollPosition = 0;
    this.modalElement = null; // attach click handlers for overlay and close buttons

    $(".".concat(this.options.overlayClass)).on("click.".concat(this.namespace), function (e) {
      if ($(e.target).hasClass(_this.options.overlayClass)) {
        e.preventDefault();

        _this.close();
      }
    }).find(".".concat(this.options.modalClass, " ").concat(this.options.closeSelector)).on("click.".concat(this.namespace), function (e) {
      e.preventDefault();

      _this.close();
    });
    $(document).off(".".concat(this.namespace)).on("click.".concat(this.namespace), this.options.openSelector, function (e) {
      e.preventDefault();

      _this.open($(e.currentTarget).attr('href'));
    });
  } // open modal by selector


  modal_createClass(Modal, [{
    key: "open",
    value: function open($selector) {
      var _this2 = this;

      // remember scroll position
      this.scrollPosition = $(window).scrollTop();
      this.modalElement = $selector instanceof jQuery ? $selector : $($selector);

      if (this.modalElement.length && this.modalElement.hasClass(this.options.overlayClass)) {
        this.modalElement.off("show.".concat(this.namespace)).on("show.".concat(this.namespace), function (e) {
          // start focus trap
          _this2.focusTrap.start(); // reset forms


          _this2.modalElement.find('form').trigger('reset'); // key listener


          _this2.modalElement.on("keydown.".concat(_this2.namespace), function (e) {
            return _this2.keyHandler(e);
          });
        }); // new focus trap

        this.focusTrap = new FocusTrap(this.modalElement); // function to open modal

        var open = function open() {
          // add css classes
          $('body').addClass(_this2.options.bodyOpenClass);

          _this2.modalElement.addClass(_this2.options.modalOpenClass).trigger("show.".concat(_this2.namespace)); // dispatch open event


          document.dispatchEvent(new CustomEvent("".concat(_this2.namespace, "Open"), {
            detail: {
              el: _this2.modalElement
            }
          }));
        }; // are any modals open?


        if ($(".".concat(this.options.overlayClass, ".").concat(this.options.modalOpenClass)).length && $(".".concat(this.options.overlayClass, ".").concat(this.options.modalOpenClass))[0] != this.modalElement[0]) {
          this.close($(".".concat(this.options.overlayClass, ".").concat(this.options.modalOpenClass)), function () {
            return open();
          }); // close any open modals
        } else {
          open();
        }
      }
    } // close any open modal

  }, {
    key: "close",
    value: function close() {
      var _this3 = this;

      var $modal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var $callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return null;
      };
      var modal = $modal || this.modalElement;
      modal.off("hide.".concat(this.namespace)).on("hide.".concat(this.namespace), function (e) {
        // release focus trap
        if (modal == _this3.modalElement) {
          _this3.focusTrap.stop();
        } // key listener


        modal.off("keydown.".concat(_this3.namespace), function (e) {
          return _this3.keyHandler(e);
        });
      }); // remove css classes

      $('body').removeClass(this.options.bodyOpenClass);
      $(".".concat(this.options.overlayClass, ".").concat(this.options.modalOpenClass)).off("".concat(whichTransitionEvent(), ".").concat(this.namespace)).one("".concat(whichTransitionEvent(), ".").concat(this.namespace), function (e) {
        $callback();
      }).removeClass(this.options.modalOpenClass).trigger("hide.".concat(this.namespace)); // restore scroll position

      $(window).scrollTop(this.scrollPosition).trigger("scroll.".concat(this.namespace)); // dispatch close event

      document.dispatchEvent(new CustomEvent("".concat(this.namespace, "Close"), {
        detail: {
          el: modal
        }
      }));
    } // post-ajax

  }, {
    key: "refresh",
    value: function refresh($selector) {
      var element = $selector instanceof jQuery ? $selector : $($selector);

      if (element.is(this.modalElement) && this.modalElement.hasClass(this.options.modalOpenClass)) {
        this.modalElement.trigger("show.".concat(this.namespace));
      }
    } // handle key events

  }, {
    key: "keyHandler",
    value: function keyHandler(e) {
      var KEY_ESC = 27; // which keys are pressed

      switch (e.keyCode) {
        case KEY_ESC:
          this.close();
          break;

        default:
          break;
      }
    }
  }]);

  return Modal;
}();


// CONCATENATED MODULE: ./js/ui/lightbox.js
function lightbox_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function lightbox_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function lightbox_createClass(Constructor, protoProps, staticProps) { if (protoProps) lightbox_defineProperties(Constructor.prototype, protoProps); if (staticProps) lightbox_defineProperties(Constructor, staticProps); return Constructor; }


/* Lightbox plugin
----------------------------- */

var lightbox_Lightbox =
/*#__PURE__*/
function () {
  function Lightbox() {
    var $options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    lightbox_classCallCheck(this, Lightbox);

    // settings
    var defaults = {
      bodyOpenClass: 'lightbox--open',
      selector: '[data-lightbox]'
    };
    this.options = Object.assign({}, defaults, $options); // vars

    this.namespace = 'lightbox';
    this.lightboxes = $(this.options.selector);
    this.lightboxElement = null; // go

    this.init();
  }

  lightbox_createClass(Lightbox, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.lightboxes.off("click.".concat(this.namespace)).on("click.".concat(this.namespace), function (e) {
        e.preventDefault();

        _this.createLightbox(e);
      });
    }
  }, {
    key: "getNextLightbox",
    value: function getNextLightbox(el) {
      var index = this.lightboxes.index(el);

      if (index < this.lightboxes.length - 1) {
        index++;
        return this.lightboxes.get(index);
      }

      return false;
    }
  }, {
    key: "getPrevLightbox",
    value: function getPrevLightbox(el) {
      var index = this.lightboxes.index(el);

      if (index > 0) {
        index--;
        return this.lightboxes.get(index);
      }

      return false;
    }
  }, {
    key: "createLightbox",
    value: function createLightbox(e) {
      var _this2 = this;

      var img = $('<img />'),
          src = e.currentTarget.href,
          navEl = $('<div class="lightbox__nav" />'),
          imgEl = $('<div class="lightbox__image" />'),
          captionEl = $('<div class="lightbox__caption" />'),
          $next = this.getNextLightbox(e.currentTarget),
          $prev = this.getPrevLightbox(e.currentTarget),
          nextBtn = $('<span class="nav nav--next">Next</span>'),
          prevBtn = $('<span class="nav nav--prev">Previous</span>');
      this.lightboxElement = $('<div class="lightbox" />'); // listen for load event

      img.attr('src', src).on('load', function (e) {
        _this2.lightboxElement.trigger("loaded.".concat(_this2.namespace)).addClass('lightbox--loaded');
      }); // set background image   

      imgEl.css('backgroundImage', "url(".concat(src, ")")); // append to body    

      this.lightboxElement.prependTo($('body')).append(imgEl); // add caption

      if ($(e.currentTarget).attr('alt') || $(e.currentTarget).attr('title')) {
        captionEl.text($(e.currentTarget).attr('alt') || $(e.currentTarget).attr('title')).appendTo(this.lightboxElement);
      } // add nav


      if ($next || $prev) {
        navEl.prependTo(this.lightboxElement);
      }

      if ($next) {
        nextBtn.on("click.".concat(this.namespace), function () {
          _this2.destroy();

          _this2.createLightbox({
            currentTarget: $next
          });
        }).appendTo(navEl);
      }

      if ($prev) {
        prevBtn.on("click.".concat(this.namespace), function () {
          _this2.destroy();

          _this2.createLightbox({
            currentTarget: $prev
          });
        }).appendTo(navEl);
      } // click handler


      this.lightboxElement.on("click.".concat(this.namespace), function (e) {
        _this2.hide();
      }); // show it

      if ($('body').hasClass('lightbox--open')) {
        this.show();
      } else {
        setTimeout(function () {
          _this2.show();
        }, 50);
      }
    }
  }, {
    key: "show",
    value: function show() {
      this.lightboxElement.trigger("show.".concat(this.namespace)).addClass('lightbox--open');
      $('body').addClass(this.options.bodyOpenClass);
      document.dispatchEvent(new CustomEvent("".concat(this.namespace, "Open"), {
        detail: {
          el: this.lightboxElement
        }
      }));
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      this.lightboxElement.one("".concat(whichTransitionEvent()), function (e) {
        _this3.destroy();
      }).trigger("hide.".concat(this.namespace)).removeClass('lightbox--open');
      $('body').removeClass(this.options.bodyOpenClass);
      document.dispatchEvent(new CustomEvent("".concat(this.namespace, "Close"), {
        detail: {}
      }));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.lightboxElement.remove();
    }
  }]);

  return Lightbox;
}();


// CONCATENATED MODULE: ./js/ui/drawer.js
function drawer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function drawer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function drawer_createClass(Constructor, protoProps, staticProps) { if (protoProps) drawer_defineProperties(Constructor.prototype, protoProps); if (staticProps) drawer_defineProperties(Constructor, staticProps); return Constructor; }

/* Drawer plugin
----------------------------- */
var Drawer =
/*#__PURE__*/
function () {
  function Drawer() {
    var $options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    drawer_classCallCheck(this, Drawer);

    // settings
    var defaults = {
      contentSelector: '#content'
    };
    this.options = Object.assign({}, defaults, $options); // vars

    this.namespace = 'drawer'; // go

    this.init();
  }

  drawer_createClass(Drawer, [{
    key: "init",
    value: function init() {
      var _this = this;

      $(document).on("click.".concat(this.namespace), '[data-drawer-toggle]', function (e) {
        return _this.toggle();
      });
    }
  }, {
    key: "toggle",
    // toggle drawer navigation
    value: function toggle($e) {
      var _this2 = this;

      // fire events
      if (!$('body').hasClass('drawer--open')) {
        document.dispatchEvent(new CustomEvent("".concat(this.namespace, "Open"), {
          detail: {}
        }));
      } else {
        document.dispatchEvent(new CustomEvent("".concat(this.namespace, "Close"), {
          detail: {}
        }));
      } // remove click handler from page content


      $(this.options.contentSelector).off("click.".concat(this.namespace));
      $('body').toggleClass('drawer--open'); // add click handler to page content

      $(".drawer--open ".concat(this.options.contentSelector)).one("click.".concat(this.namespace), function (e) {
        return _this2.toggle();
      });

      if ($e) {
        $e.preventDefault();
      }
    }
  }, {
    key: "open",
    // open drawer navigation
    value: function open() {
      if (!$('body').hasClass('drawer--open')) {
        this.toggle();
      }
    }
  }, {
    key: "close",
    // close drawer navigation
    value: function close() {
      if ($('body').hasClass('drawer--open')) {
        this.toggle();
      }
    }
  }]);

  return Drawer;
}();


// CONCATENATED MODULE: ./js/utils/scroll-listener.js
function scroll_listener_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scroll_listener_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function scroll_listener_createClass(Constructor, protoProps, staticProps) { if (protoProps) scroll_listener_defineProperties(Constructor.prototype, protoProps); if (staticProps) scroll_listener_defineProperties(Constructor, staticProps); return Constructor; }

/* Scroll listener
----------------------------- */
var ScrollListener =
/*#__PURE__*/
function () {
  function ScrollListener() {
    var _this = this;

    var $callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
      return null;
    };
    var $immediate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    scroll_listener_classCallCheck(this, ScrollListener);

    // vars
    this.namespace = 'scrollListener';
    this.lastScrollY = 0;
    this.ticking = false; // internal funcs

    var update = function update() {
      $callback();
      _this.ticking = false;
    };

    var requestTick = function requestTick() {
      if (!_this.ticking) {
        window.requestAnimationFrame(update);
        _this.ticking = true;
      }
    };

    this.onScroll = function () {
      _this.lastScrollY = window.scrollY;
      requestTick();
    }; // start it


    this.on();
    if ($immediate) $callback();
  }

  scroll_listener_createClass(ScrollListener, [{
    key: "off",
    value: function off() {
      var _this2 = this;

      $(window).off("scroll.".concat(this.namespace), function (e) {
        return _this2.onScroll();
      });
    }
  }, {
    key: "on",
    value: function on() {
      var _this3 = this;

      $(window).on("scroll.".concat(this.namespace), function (e) {
        return _this3.onScroll();
      });
    }
  }]);

  return ScrollListener;
}();


// CONCATENATED MODULE: ./js/anim/scroll-effects.js
function scroll_effects_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function scroll_effects_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function scroll_effects_createClass(Constructor, protoProps, staticProps) { if (protoProps) scroll_effects_defineProperties(Constructor.prototype, protoProps); if (staticProps) scroll_effects_defineProperties(Constructor, staticProps); return Constructor; }




var scroll_effects_ScrollEffects =
/*#__PURE__*/
function () {
  function ScrollEffects() {
    var _this = this;

    var $options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    scroll_effects_classCallCheck(this, ScrollEffects);

    // settings
    var defaults = {
      selector: '[data-scroll], [data-scroll-from], [data-scroll-to]'
    };
    this.options = Object.assign({}, defaults, $options); // vars

    this.namespace = 'scrollEffects';
    this.items = []; // create timelines

    $(this.options.selector).each(function (index, el) {
      //<div 
      //	data-scroll-from='{ "y": 100, "opacity": 0 }'	 // the properties to animate (starting values)
      // 	data-scroll-start="0"														// when to start animation [ 0 = when element STARTS to enter viewport ]
      //	data-scroll-end="1"															// when to stop animation [ 1 = when element STARTS to leave viewport ]
      // 	data-scroll-exit="true"													// calculate "end" based on when element completely LEAVES viewport
      //>
      try {
        var tl = new TimelineLite({
          paused: true
        }),
            props = $(el).data('scroll-to') || $(el).data('scroll') || $(el).data('scroll-from') || {},
            method = $(el).data('scroll-to') ? 'to' : 'from'; // clear out any old inline styles

        for (var prop in props) {
          el.style[prop] = null;
        }

        tl[method]($(el), 1, props); //$(el).css({ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' })

        _this.items.push({
          el: el,
          tl: tl
        });
      } catch (e) {
        console.log('Could not animate on scroll:', e);
      }
    });
    new ScrollListener(function () {
      return _this.onScroll();
    }, true);
    $(window).on("resize.".concat(this.namespace), debounce(function (e) {
      return _this.onScroll();
    }, 250));
  }

  scroll_effects_createClass(ScrollEffects, [{
    key: "onScroll",
    value: function onScroll() {
      var wh = $(window).height(),
          st = $(window).scrollTop();
      $.each(this.items, function (index, item) {
        if (!isInViewport(item.el)) return;
        var et = $(item.el).offset().top,
            eh = $(item.el).outerHeight(),
            end = $.isNumeric($(item.el).data('scroll-end')) ? $(item.el).data('scroll-end') : 1,
            start = $.isNumeric($(item.el).data('scroll-start')) ? $(item.el).data('scroll-start') : 0,
            enter = et + wh * (start - 1),
            // when element enters "start" point
        exit = $(item.el).data('scroll-exit') ? // when element leaves "end" point 
        et + eh + wh * (end - 1) : // element completely leaves viewport
        et + wh * (end - 1); // element starts to leave viewport

        var progress = Math.max(0, Math.min(1, (st - enter) / (exit - enter)));
        item.tl.progress(progress);
      });
    }
  }]);

  return ScrollEffects;
}();


// CONCATENATED MODULE: ./js/utils/ajax-forms.js
function ajax_forms_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ajax_forms_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ajax_forms_createClass(Constructor, protoProps, staticProps) { if (protoProps) ajax_forms_defineProperties(Constructor.prototype, protoProps); if (staticProps) ajax_forms_defineProperties(Constructor, staticProps); return Constructor; }

/* AJAX form plugin
----------------------------- */
var AjaxForms =
/*#__PURE__*/
function () {
  function AjaxForms() {
    var $options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    ajax_forms_classCallCheck(this, AjaxForms);

    // settings
    var defaults = {
      selector: 'form[data-ajax]',
      alertClass: 'alert',
      submittedClass: 'form--submitting',
      ajaxUrl: ''
    };
    this.options = Object.assign({}, defaults, $options); // vars

    this.namespace = 'ajax'; // go

    this.init();
  }

  ajax_forms_createClass(AjaxForms, [{
    key: "init",
    value: function init() {
      var _this = this;

      $(this.options.selector).each(function (index, el) {
        var form = $(el),
            ajaxUrl = _this.options.ajaxUrl || form.data('ajax') || form.attr('action');
        form.on("clear.".concat(_this.namespace), function () {
          // clear out any old alerts
          form.find(".".concat(_this.options.alertClass)).remove();
        }).on("submit.".concat(_this.namespace), function () {
          var formData = form.serialize(); // disable input and clear old alerts

          form.addClass(_this.options.submittedClass);
          form.trigger("clear.".concat(_this.namespace)); // confirm ajax url exists

          if (!ajaxUrl) {
            console.warn('No AJAX url!');
            return;
          } // subit to ajax endpoint


          $.getJSON({
            url: ajaxUrl,
            type: 'post',
            data: formData
          }).done(function (response) {
            form.removeClass(_this.options.submittedClass);
            var message, alert;

            if (response.success) {
              message = response.data.message || 'Your submission was received';
              alert = '<div class="' + _this.options.alertClass + ' success">' + message + '</div>';
              form.trigger("reset.".concat(_this.namespace));
            } else {
              message = response.data.message || 'There was a problem – please try again';
              alert = '<div class="' + _this.options.alertClass + ' error">' + message + '</div>';
            }

            form.append(alert);
          });
          return false;
        });
      });
    }
  }]);

  return AjaxForms;
}();


// EXTERNAL MODULE: ./js/polyfills/custom-event.js
var custom_event = __webpack_require__(1);

// CONCATENATED MODULE: ./js/index.js









/* harmony default export */ var js = __webpack_exports__["default"] = ({
  Modal: modal_Modal,
  Lightbox: lightbox_Lightbox,
  Drawer: Drawer,
  AjaxForms: AjaxForms,
  FocusTrap: FocusTrap,
  ScrollListener: ScrollListener,
  ScrollEffects: scroll_effects_ScrollEffects
});

/***/ })
/******/ ])["default"];
});