/* Scroll listener
----------------------------- */

export default class ScrollListener {

  constructor($callback = () => null, $immediate = false) {
    this.lastScrollY = 0;

    let ticking = false;

    let update = () => {
      $callback();
      ticking = false;
    };

    let requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    this.onScroll = () => {
      this.lastScrollY = window.scrollY;
      requestTick();
    };

    this.on();

    if ($immediate) $callback();
  }

  off() {
    $(window)
      .off('scroll.scrollListener');
  }

  on() {
    $(window)
      .on('scroll.scrollListener', e => this.onScroll());
  }

}