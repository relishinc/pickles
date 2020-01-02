/* Lightbox plugin
----------------------------- */

export default class Lightbox {

    constructor($options = {}) {
        // settings

        let defaults = {
            bodyOpenClass: 'lightbox--open',
            selector: '[data-lightbox]'
        };
        this.options = Object.assign({}, defaults, $options);

        // vars

        this.namespace = 'lightbox';
        this.lightboxes = $(this.options.selector);
        this.lightboxElement = null;

        // go

        this.init();
    }

    init() {
        this.lightboxes
            .off(`click.${this.namespace}`)
            .on(`click.${this.namespace}`, (e) => {
                e.preventDefault();
                this.createLightbox(e);
            });
    }

    getNextLightbox(el) {
        let
            index = this.lightboxes.index(el);

        if (index < this.lightboxes.length - 1) {
            index++;
            return this.lightboxes.get(index);
        }

        return false;
    };

    getPrevLightbox(el) {
        let
            index = this.lightboxes.index(el);

        if (index > 0) {
            index--;
            return this.lightboxes.get(index);
        }

        return false;
    }

    createLightbox(e) {
        let
            img = $('<img />'),
            src = e.currentTarget.href,

            navEl = $('<div class="lightbox__nav" />'),
            imgEl = $('<div class="lightbox__image" />'),
            captionEl = $('<div class="lightbox__caption" />'),

            $next = this.getNextLightbox(e.currentTarget),
            $prev = this.getPrevLightbox(e.currentTarget),
            nextBtn = $('<span class="nav nav--next">Next</span>'),
            prevBtn = $('<span class="nav nav--prev">Previous</span>');

        this.lightboxElement = $('<div class="lightbox" />');

        // listen for load event

        img
            .attr('src', src)
            .on('load', (e) => {
                this.lightboxElement
                    .trigger(`loaded.${this.namespace}`)
                    .addClass('lightbox--loaded');
            });

        // set background image   

        imgEl
            .css('backgroundImage', `url(${src})`);

        // append to body    

        this.lightboxElement
            .prependTo($('body'))
            .append(imgEl);

        // add caption

        if ($(e.currentTarget).attr('alt') || $(e.currentTarget).attr('title')) {
            captionEl
                .text($(e.currentTarget).attr('alt') || $(e.currentTarget).attr('title'))
                .appendTo(this.lightboxElement);
        }

        // add nav

        if ($next || $prev) {
            navEl
                .prependTo(this.lightboxElement);
        }

        if ($next) {
            nextBtn
                .on(`click.${this.namespace}`, () => {
                    this.destroy();
                    this.createLightbox({ currentTarget: $next });
                })
                .appendTo(navEl);
        }

        if ($prev) {
            prevBtn
                .on(`click.${this.namespace}`, () => {
                    this.destroy();
                    this.createLightbox({ currentTarget: $prev });
                })
                .appendTo(navEl);
        }

        // click handler

        this.lightboxElement
            .on(`click.${this.namespace}`, (e) => {
                this.hide();
            });

        // show it

        if ($('body').hasClass('lightbox--open')) {
            this.show();
        }
        else {
            setTimeout(() => {
                this.show();
            }, 50);
        }


    }

    show() {
        this.lightboxElement
            .addClass('lightbox--open');

        $('body')
            .addClass(this.options.bodyOpenClass);

        document
            .dispatchEvent(new CustomEvent(`${this.namespace}Open`, {
                detail: {}
            }));
    }

    hide() {
        this.lightboxElement
            .removeClass('lightbox--open')
            .on(`transitionend.${this.namespace}`, (e) => {
                this.destroy();
            });

        $('body')
            .removeClass(this.options.bodyOpenClass);

        document
            .dispatchEvent(new CustomEvent(`${this.namespace}Close`, {
                detail: {}
            }));

    }

    destroy() {
        this.lightboxElement.remove();
    }

}