import ScrollListener from '../utils/scroll-listener';

/* Drawer plugin
----------------------------- */

export default class Drawer {

    constructor($options = {}) {
        // settings

        let defaults = {
            contentSelector: '#content',
            scrolledBodyClass: 'page-scrolled',
            scrollMin: 100
        };
        this.options = Object.assign({}, defaults, $options);

        // vars

        this.namespace = 'drawer';

        // go

        this.init();
    }

    init() {
        $(document)
            .on(`click.${this.namespace}`, '[data-drawer-toggle]', e => this.toggle());

        new ScrollListener(() => {
            $('body')
                .toggleClass(this.options.scrolledBodyClass, $(window).scrollTop() > this.options.scrollMin);
        }, true);
    };

    // toggle drawer navigation

    toggle($e) {

        $(this.options.contentSelector)
            .off(`click.${this.namespace}`);

        $('body')
            .toggleClass('drawer--open');

        $(`.drawer--open ${this.options.contentSelector}`)
            .one(`click.${this.namespace}`, e => this.toggle());

        if ($e) {
            $e.preventDefault();
        }

    };

    // open drawer navigation

    open() {
        if (!$('body').hasClass('drawer--open')) {
            this.toggle();
        }
    };

    // close drawer navigation

    close() {
        if ($('body').hasClass('drawer--open')) {
            this.toggle();
        }
    };

}