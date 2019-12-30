import FocusTrap from '../utils/focus-trap';

/* Modal plugin
----------------------------- */

export default class Modal {

  constructor($options = {}) {
    // settings

    let defaults = {
      bodyOpenClass: 'overlay-open',
      modalOpenClass: 'open',
      overlayClass: 'modal-overlay',
      modalClass: 'modal',
      openSelector: '[data-modal]',
      closeSelector: '[data-close-modal]'
    };
    this.options = Object.assign({}, defaults, $options);

    // vars

    this.namespace = 'modal';
    this.scrollPosition = 0;
    this.modalElement = null;

    // attach click handlers for overlay and close buttons

    $(`.${this.options.overlayClass}`)
      .on(`click.${this.namespace}`, e => {
        if ($(e.target).hasClass(this.options.overlayClass)) {
          e.preventDefault();
          this.close();
        }
      })
      .find(`.${this.options.modalClass} ${this.options.closeSelector}`)
      .on(`click.${this.namespace}`, e => {
        e.preventDefault();
        this.close();
      });

    $(document)
      .off(`.${this.namespace}`)
      .on(`click.${this.namespace}`, this.options.openSelector, e => {
        e.preventDefault();
        this.open($(e.currentTarget).attr('href'));
      });
  }

  // open modal by selector

  open($selector) {
    // remember scroll position

    this.scrollPosition = $(window).scrollTop();
    this.modalElement = $selector instanceof jQuery ? $selector : $($selector);

    let
      delay = 0;

    if (this.modalElement.length && this.modalElement.hasClass(this.options.overlayClass)) {
      this.modalElement
        .off(`${this.namespace}.show`)
        .on(`${this.namespace}.show`, e => {

          // start focus trap

          this.focusTrap.start();

          // reset forms

          this.modalElement
            .find('form')
            .trigger('reset');

          // key listener

          this.modalElement
            .on(`keydown.${this.namespace}`, e => this.keyHandler(e));

        });

      // new focus trap
      this.focusTrap = new FocusTrap(this.modalElement);

      // are any modals open?

      if ($(`.${this.options.overlayClass}.${this.options.modalOpenClass}`).length && $(`.${this.options.overlayClass}.${this.options.modalOpenClass}`)[0] != this.modalElement[0]) {
        this.close($(`.${this.options.overlayClass}.${this.options.modalOpenClass}`)); // close any open modals
        delay = 300;
      }

      setTimeout(() => {
        // add css classes

        $('body')
          .addClass(this.options.bodyOpenClass);

        this.modalElement
          .addClass(this.options.modalOpenClass)
          .trigger(`${this.namespace}.show`);

        // dispatch open event

        $(document)
          .trigger(`${this.namespace}.open`, [{ target: this.modalElement }]);

      }, delay); // TO DO - attach to transitionend event

    }

  }

  // close any open modal

  close($modal = false) {
    let modal = $modal || this.modalElement;

    modal
      .off(`${this.namespace}.hide`)
      .on(`${this.namespace}.hide`, e => {

        // release focus trap

        if (modal == this.modalElement) {
          this.focusTrap.stop();
        }
        // key listener

        modal
          .off(`keydown.${this.namespace}`, e => this.keyHandler(e));

      });

    // remove css classes

    $('body')
      .removeClass(this.options.bodyOpenClass);

    $(`.${this.options.overlayClass}.${this.options.modalOpenClass}`)
      .removeClass(this.options.modalOpenClass)
      .trigger(`${this.namespace}.hide`);

    // restore scroll position

    $(window)
      .scrollTop(this.scrollPosition)
      .trigger(`scroll.${this.namespace}`);

    // dispatch close event

    $(document)
      .trigger(`${this.namespace}.close`, [{ target: modal }]);
  }

  // post-ajax

  refresh($selector) {
    let element = $selector instanceof jQuery ? $selector : $($selector);

    if (element.is(this.modalElement) && this.modalElement.hasClass(this.options.modalOpenClass)) {
      this.modalElement.trigger(`${this.namespace}.show`);
    }
  }

  // handle key events

  keyHandler(e) {
    const KEY_ESC = 27;

    // which keys are pressed

    switch (e.keyCode) {
      case KEY_ESC:
        this.close();
        break;
      default:
        break;
    }

  }

}