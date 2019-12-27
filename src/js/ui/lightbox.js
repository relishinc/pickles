/* Lightbox plugin
----------------------------- */

export default class Lightbox {

    constructor($options = {}) {
        // settings

        let defaults = {
            selector: '[data-thumbnail]'
        };
        this.options = Object.assign({}, defaults, $options);

        // vars

        this.namespace = 'lightbox';
        this.lightboxElement = null;

        // go

        this.initEvents();
    }

    initEvents() {
        $(this.options.selector)
            .off(`click.${this.namespace}`)
            .on(`click.${this.namespace}`, (e) => {
                e.preventDefault();

                this.createLightbox(e);

                setTimeout(() => {
                    this.show();
                }, 50);

            });
    }

    createLightbox(e) {
        let
            img = $('<img />'),
            src = e.currentTarget.href,
            imgEl = $('<div class="lightbox__image" />'),
            captionEl = $('<div class="lightbox__caption" />');

        this.lightboxElement = $('<div class="lightbox" />');

        // listen for load event

        img
            .attr('src', src)
            .on('load', (e) => {
                this.lightboxElement
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

        // click handler

        this.lightboxElement
            .on(`click.${this.namespace}`, (e) => {
                this.hide();
            });

    }

    show() {
        this.lightboxElement
            .addClass('lightbox--open');
    };

    hide() {
        this.lightboxElement
            .removeClass('lightbox--open')
            .on(`transitionend.${this.namespace}`, (e) => {
                this.destroy();
            });
    };

    destroy() {
        this.lightboxElement.remove();
    }

}