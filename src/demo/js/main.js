// common nav stuff
(function () {

    jQuery(document)
        .ready(function ($) {

            initNav();
            initOptions();
            initAPIs();

        });

    var initNav = () => {

        var
            sections = $('section.example-section[title]'),
            nav = $('<nav class="example-nav" />');

        sections
            .each((index, el) => {

                var
                    link = $('<a href="#" />').text($(el).attr('title'));

                link
                    .appendTo(nav)
                    .on('click', e => {
                        e.preventDefault();
                        sections
                            .hide()
                            .filter(el)
                            .show();
                        $(e.currentTarget)
                            .addClass('active')
                            .siblings()
                            .removeClass('active');
                    });
            });

        nav
            .insertBefore(sections.first())
            .find('a:first')
            .trigger('click');

    };

    var initOptions = () => {
        var
            blocks = $('code[data-options]');

        blocks
            .each((index, el) => {
                var
                    path = $(el).data('options'),
                    options;
                try {
                    options = path.split('.').reduce((o, i) => o[i], window);
                    $(el)
                        .text(JSON.stringify(options, null, 2));
                    PR.prettyPrint();
                }
                catch (e) {

                }
            });
    };

    var initAPIs = () => {
        var
            blocks = $('code[data-api]');

        blocks
            .each((index, el) => {
                var
                    instance = $(el).data('api'),
                    proto = Object.getPrototypeOf(window[instance]),
                    props = Object.getOwnPropertyNames(proto),
                    methods = [];

                try {
                    props.forEach((prop) => {
                        var firstLine = proto[prop].toString().split("\n")[0];
                        methods.push(`${prop} ${firstLine.match(/\(.*\)+/g)} {}`);
                    });
                    $(el)
                        .text(methods.join('\n\n'));
                    PR.prettyPrint();
                }
                catch (e) {

                }
            });

    };

})();