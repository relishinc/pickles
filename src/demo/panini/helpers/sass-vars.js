var sassExtract = require('sass-extract');

module.exports = function (options) {

    var fileName = options.fn(this).trim();
    var vars = [];
    var output = '';

    var rendered = sassExtract.renderSync({
        includePaths: [
            'node_modules/awesome-sass-easing',
            'node_modules/flexboxgrid/dist'
        ],
        file: fileName
    });

    for (let [varName, varInfo] of Object.entries(rendered.vars.global)) {
        var include = false;
        varInfo.sources.forEach(source => {
            if (source.indexOf(fileName) > -1) include = true;
        });
        if (include && varInfo.declarations[0].flags.default) {
            vars[varName] = typeof varInfo.value == 'object' ? varInfo.declarations[0].expression : varInfo.value + (varInfo.unit || '') + ' !default';
        }
    }

    for (let [varName, varValue] of Object.entries(vars)) {
        output += `${varName}: ${varValue};\n`;
    }

    return '<pre><code class="prettyprint lang-css">' + output + '</code></pre>';
}