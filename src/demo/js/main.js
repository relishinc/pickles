// common nav stuff
(function () {

    jQuery(document)
        .ready(function ($) {

            initNav();


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

})();