var fs = require('fs');

module.exports = function (options) {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'))[options.fn(this).trim()];
}