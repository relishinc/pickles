/* AJAX form plugin
----------------------------- */

export default class AjaxForms {

    constructor($options = {}) {
        // settings

        let defaults = {
            selector: 'form[data-ajax]',
            alertClass: 'alert',
            alertHolderClass: 'alert-wrapper',
            submittedClass: 'form--submitting',
            ajaxUrl: ''
        };
        this.options = Object.assign({}, defaults, $options);

        // vars

        this.namespace = 'ajax';

        // go

        this.init();
    }

    init() {

        $(this.options.selector)
            .each((index, el) => {
                let
                    form = $(el),
                    ajaxUrl = (this.options.ajaxUrl || form.data('ajax')) || form.attr('action');

                form
                    .on(`clear.${this.namespace}`, () => {

                        // clear out any old alerts

                        form
                            .find(`.${this.options.alertClass}`)
                            .remove();
                    })
                    .on(`submit.${this.namespace}`, () => {
                        let
                            formData = form.serialize();

                        // disable input and clear old alerts

                        form.addClass(this.options.submittedClass);
                        form.trigger(`clear.${this.namespace}`);

                        // confirm ajax url exists

                        if (!ajaxUrl) {
                            console.warn('No AJAX url!');
                            return;
                        }

                        // subit to ajax endpoint

                        $.getJSON({
                            url: ajaxUrl,
                            type: 'post',
                            data: formData
                        })
                            .always((response) => {
                                form.removeClass(this.options.submittedClass);
                                form.trigger(`complete.${this.namespace}`);

                                let
                                    message,
                                    alert;

                                if (response.success) {
                                    message = ( response.data && response.data.message ) || 'Your submission was received';
                                    alert = '<div class="' + this.options.alertClass + ' success">' + message + '</div>';
                                    form.trigger(`reset.${this.namespace}`);
                                    form.trigger(`success.${this.namespace}`);
                                } else {
                                    message = ( response.data && response.data.message ) || 'There was a problem – please try again';
                                    alert = '<div class="' + this.options.alertClass + ' error">' + message + '</div>';
                                    form.trigger(`error.${this.namespace}`);
                                }

                                if ( form.find(`.${this.options.alertHolderClass}`).length ) {
                                    form
                                        .find(`.${this.options.alertHolderClass}`)
                                        .append(alert);
                                }
                                else {
                                    form
                                        .append(alert);
                                }

                            });

                        return false;

                    });


            });

    }
}