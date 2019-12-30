var fs = require('fs');

module.exports = function (options) {
    return fs.readFileSync(options.fn(this).trim(), 'utf8');
}