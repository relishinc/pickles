/* Scroll listener
----------------------------- */

export default class ScrollListener {

  constructor($callback = () => null, $immediate = false) {

    // vars

    this.namespace = 'scrollListener';
    this.lastScrollY = 0;
    this.ticking = false;

    // internal funcs

    let update = () => {
      $callback();
      this.ticking = false;
    };

    let requestTick = () => {
      if (!this.ticking) {
        window.requestAnimationFrame(update);
        this.ticking = true;
      }
    };

    this.onScroll = () => {
      this.lastScrollY = window.scrollY;
      requestTick();
    };

    // start it

    this.on();

    if ($immediate) $callback();
  }

  off() {
    $(window)
      .off(`scroll.${this.namespace}`);
  }

  on() {
    $(window)
      .on(`scroll.${this.namespace}`, e => this.onScroll());
  }

}