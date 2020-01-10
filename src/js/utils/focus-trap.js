/* Focus trap plugin
----------------------------- */

export default class FocusTrap {

  constructor($el = null) {

    // vars

    this.namespace = 'focusTrap';

    // start it

    this.initJqueryPlugins();
    this.attach($el);
  }

  attach($el) {
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

  start($el = null) {
    if ($el) this.attach($el);

    if (!this.element) {
      console.warn('No element set for FocusTrap'); return;
    }

    if (this.lastFocusedElement == null) {
      this.lastFocusedElement = $(document.activeElement);
    }

    this.focusableElements = this.element.find(':focusable').sort((a, b) => {
      let
        aIndex = ! isNaN(parseInt($(a).attr('tabindex'))) ? parseInt($(a).attr('tabindex')) : 9999,
        bIndex = ! isNaN(parseInt($(b).attr('tabindex'))) ? parseInt($(b).attr('tabindex')) : 9999;
      return aIndex - bIndex;
    });

    this.firstFocusableElement = this.focusableElements.first();
    this.lastFocusableElement = this.focusableElements.last();

    this.firstFocusableElement.focus();

    this.element
      .off(`keydown.${this.namespace}`)
      .on(`keydown.${this.namespace}`, e => this.keyHandler(e));

  }

  stop() {
    if (!this.element) {
      return;
    }

    this.element
      .off(`keydown.${this.namespace}`);

    this.lastFocusedElement.focus();
  }

  // handle key events

  keyHandler(e) {
    const KEY_TAB = 9;
    const KEY_ESC = 27;

    // focus trapping

    let handleBackwardTab = () => {
      if ($(document.activeElement).is(this.firstFocusableElement)) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      }
    };

    let handleForwardTab = () => {
      if ($(document.activeElement).is(this.lastFocusableElement)) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    };

    // which keys are pressed

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

  }

  // add :focusable pseudo selector

  initJqueryPlugins() {
    jQuery.extend(jQuery.expr[':'], {
      focusable: function (el, index, selector) {
        return $(el).is('button, [href], :input:not([disabled]):not([type="hidden"]), [tabindex]:not([tabindex="-1"]), iframe, object, embed');
      }
    });
  }

}