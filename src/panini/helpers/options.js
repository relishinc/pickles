module.exports = function (options) {
    return '<pre><code data-class-options="' + options.fn(this).trim() + '"></code></pre>';
}