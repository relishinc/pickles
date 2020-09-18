import '../polyfills/custom-event';

/* Drawer plugin
----------------------------- */

export default class Drawer {

    constructor($options = {}) {
        // settings

        let defaults = {
            contentSelector: '#content'
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
    };

    // toggle drawer navigation

    toggle($e) {

        // fire events

        if (!$('body').hasClass('drawer--open')) {
            document
                .dispatchEvent(new CustomEvent(`${this.namespace}Open`, {
                    detail: {}
                }));

            // key listener
            $(document)
                .on(`keydown.${this.namespace}`, e => this.keyHandler(e));        
        } else {
            document
                .dispatchEvent(new CustomEvent(`${this.namespace}Close`, {
                    detail: {}
                }));

            // key listener
            $(document)
                .off(`keydown.${this.namespace}`, e => this.keyHandler(e));                    
        }

        // remove click handler from page content

        $(this.options.contentSelector)
            .off(`click.${this.namespace}`);

        $('body')
            .toggleClass('drawer--open');

        // add click handler to page content

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