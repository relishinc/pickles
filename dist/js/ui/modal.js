import FocusTrap from '../utils/focus-trap';
import { whichTransitionEvent } from '../utils/utils';
import '../polyfills/custom-event';

/* Modal plugin
----------------------------- */

export default class Modal {

  constructor($options = {}) {
    // settings

    let defaults = {
      bodyOpenClass: 'modal--open',
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

    if (this.modalElement.length && this.modalElement.hasClass(this.options.overlayClass)) {
      this.modalElement
        .off(`show.${this.namespace}`)
        .on(`show.${this.namespace}`, e => {

          // start focus trap

          this.focusTrap.start();

          // reset forms

          this.modalElement
            .find('form')
            .trigger('reset');

          // key listener

          $(document)
            .on(`keydown.${this.namespace}`, e => this.keyHandler(e));

        });

      // new focus trap

      this.focusTrap = new FocusTrap(this.modalElement);

      // function to open modal

      let open = () => {
        // add css classes

        $('body')
          .addClass(this.options.bodyOpenClass);

        this.modalElement
          .addClass(this.options.modalOpenClass)
          .trigger(`show.${this.namespace}`);

        // dispatch open event

        document
          .dispatchEvent(new CustomEvent(`${this.namespace}Open`, {
            detail:
            {
              el: this.modalElement
            }
          }));

      };

      // are any modals open?

      if ($(`.${this.options.overlayClass}.${this.options.modalOpenClass}`).length && $(`.${this.options.overlayClass}.${this.options.modalOpenClass}`)[0] != this.modalElement[0]) {
        this.close($(`.${this.options.overlayClass}.${this.options.modalOpenClass}`), () => open()); // close any open modals
      }
      else {
        open();
      }

    }

  }

  // close any open modal

  close($modal = false, $callback = () => null) {
    let modal = $modal || this.modalElement;

    modal
      .off(`hide.${this.namespace}`)
      .on(`hide.${this.namespace}`, e => {

        // release focus trap

        if ( modal == this.modalElement ) {
          this.focusTrap.stop();
        }
        
        // key listener

        $(document)
          .off(`keydown.${this.namespace}`, e => this.keyHandler(e));

      });

    // remove css classes

    $('body')
      .removeClass(this.options.bodyOpenClass);

    $(`.${this.options.overlayClass}.${this.options.modalOpenClass}`)
      .off(`${whichTransitionEvent()}.${this.namespace}`)
      .one(`${whichTransitionEvent()}.${this.namespace}`, e => {
        $callback();
      })
      .removeClass(this.options.modalOpenClass)
      .trigger(`hide.${this.namespace}`)

    // restore scroll position

    $(window)
      .scrollTop(this.scrollPosition)
      .trigger(`scroll.${this.namespace}`);

    // dispatch close event

    document
      .dispatchEvent(new CustomEvent(`${this.namespace}Close`, {
        detail:
        {
          el: modal
        }
      }));
  }

  // post-ajax

  refresh($selector) {
    let element = $selector instanceof jQuery ? $selector : $($selector);

    if (element.is(this.modalElement) && this.modalElement.hasClass(this.options.modalOpenClass)) {
      this.modalElement.trigger(`show.${this.namespace}`);
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