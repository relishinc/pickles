var beautify = require('js-beautify').html;

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

module.exports = function (options) {
    return '<pre><code>' + escapeHtml(beautify(options.fn(this).trim())) + '</code></pre>';
}