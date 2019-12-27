import FocusTrap from '../utils/focus-trap';

/* Modal plugin
----------------------------- */

export default class Modal {

  constructor() {
    // settings

    this.bodyOpenClass = 'overlay-open';
    this.modalOpenClass = 'open';
    this.overlayClass = 'modal-overlay';
    this.modalClass = 'modal';
    this.openSelector = '[data-modal]';

    // vars

    this.scrollPosition = 0;
    this.modalElement = null;

    // attach click handlers for overlay and close buttons

    $(`.${this.overlayClass}`)
      .on('click.modal', e => {
        if ($(e.target).hasClass(this.overlayClass)) {
          e.preventDefault();
          this.close();
        }
      })
      .find(`.${this.modalClass} [data-close-modal]`)
      .on('click.modal', e => {
        e.preventDefault();
        this.close();
      });

    $(document)
      .off('.modal')
      .on('click.modal', this.openSelector, e => {
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

    if (this.modalElement.length && this.modalElement.hasClass(this.overlayClass)) {
      this.modalElement
        .off('show')
        .on('show', e => {

          // start focus trap

          this.focusTrap.start();

          // reset forms

          this.modalElement
            .find('form')
            .trigger('reset');

          // key listener

          this.modalElement
            .on('keydown', e => this.keyHandler(e));

        });

      // new focus trap
      this.focusTrap = new FocusTrap(this.modalElement);

      // are any modals open?

      if ($(`.${this.overlayClass}.${this.modalOpenClass}`).length && $(`.${this.overlayClass}.${this.modalOpenClass}`)[0] != this.modalElement[0]) {
        this.close($(`.${this.overlayClass}.${this.modalOpenClass}`)); // close any open modals
        delay = 300;
      }

      setTimeout(() => {
        // add css classes

        $('body')
          .addClass(this.bodyOpenClass);

        this.modalElement
          .addClass(this.modalOpenClass)
          .trigger('show');

        // dispatch open event

        $(document)
          .trigger('modal.open', [{ target: this.modalElement }]);

      }, delay); // TO DO - attach to transitionend event

    }

  }

  // close any open modal

  close($modal = false) {
    let modal = $modal || this.modalElement;

    modal
      .off('hide')
      .on('hide', e => {

        // release focus trap

        if (modal == this.modalElement) {
          this.focusTrap.stop();
        }
        // key listener

        modal
          .off('keydown', e => this.keyHandler(e));

      });

    // remove css classes

    $('body')
      .removeClass(this.bodyOpenClass);

    $(`.${this.overlayClass}.${this.modalOpenClass}`)
      .removeClass(this.modalOpenClass)
      .trigger('hide');

    // restore scroll position

    $(window)
      .scrollTop(this.scrollPosition)
      .trigger('scroll');

    // dispatch close event

    $(document)
      .trigger('modal.close', [{ target: modal }]);
  }

  // post-ajax

  refresh($selector) {
    let element = $selector instanceof jQuery ? $selector : $($selector);

    if (element.is(this.modalElement) && this.modalElement.hasClass(this.modalOpenClass)) {
      this.modalElement.trigger('show');
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