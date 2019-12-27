var beautify = require('js-beautify').html;

module.exports = function (options) {
    return options.fn + '<pre><code>' + beautify(options.fn(this).trim()) + '</code></pre>';
}