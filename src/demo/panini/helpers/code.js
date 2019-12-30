var beautify = require('js-beautify');

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

module.exports = function (options) {
    var lang = options.hash.lang || 'html';
    return '<pre class="prettyprint lang-' + lang + '"><code>' + escapeHtml(beautify[lang](options.fn(this).trim())) + '</code></pre>';
}