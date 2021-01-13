'use strict';

import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import gulp from 'gulp';
import rimraf from 'rimraf';
import yaml from 'js-yaml';
import fs from 'fs';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import panini from 'panini';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { PORT, PATHS } = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

// Demo and documentation tasks
gulp.task('demo',
    gulp.series(demo_sass, demo_js, demo_json, demo_pages));

// Build the "dist" folder by running all of the below tasks
gulp.task('deploy',
    gulp.series(clean, sass, js, index, bundle, images));

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
    gulp.series(clean, sass, js, index, bundle, images, 'demo'));

// Build the site, run the server, and watch for file changes
gulp.task('default',
    gulp.series('build', server, watch));



// Delete the "dist" folders
// =======

function clean(done) {
    rimraf(PATHS.demo.dist, function () { });
    rimraf(PATHS.dist, done);
}

// Library tasks
// =======

function sass() {
    return gulp.src(PATHS.css)
        .pipe($.sourcemaps.init())
        .pipe(
            $.sass({ includePaths: PATHS.sass }).on('error', $.sass.logError)
        )
        .pipe(
            $.autoprefixer()
        )
        .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(PATHS.dist + '/css'))
        .pipe(browser.stream());
}

function js() {
    return gulp.src(PATHS.js)
        .pipe(gulp.dest(PATHS.dist + '/js'));
}

function index() {
    return gulp.src(PATHS.index)
        .pipe(gulp.dest(PATHS.root));
}

function bundle() {
    return gulp.src(PATHS.entries)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe($.if(PRODUCTION, $.uglify({ output: { comments: 'some' } })
            .on('error', e => {
                console.log(e);
            })
        ))
        .pipe(gulp.dest(PATHS.dist + '/js'));
}

function images() {
    return gulp.src(PATHS.images)
        // .pipe($.if(PRODUCTION, $.imagemin({
        //   progressive: true
        // })))
        .pipe(gulp.dest(PATHS.dist + 'img'));
}



// Demo tasks
// =======

function demo_sass() {
    return gulp.src(PATHS.demo.css)
        .pipe(
            $.sass({ includePaths: PATHS.sass }).on('error', $.sass.logError)
        )
        .pipe(
            $.autoprefixer()
        )
        .pipe(gulp.dest(PATHS.demo.dist + '/css'))
        .pipe(browser.stream());
}

function demo_js() {
    return gulp.src(PATHS.demo.js)
        .pipe(named())
        .pipe(webpack({
            module: {
                rules: [
                    {
                        test: /.js$/,
                        use: [
                            {
                                loader: 'babel-loader'
                            }
                        ]
                    }
                ]
            },
            externals: {
                jquery: 'jQuery'
            },
            resolve: {
                alias: {}
            }
        }))
        .pipe(gulp.dest(PATHS.demo.dist + '/js'));
}

function demo_pages() {
    return gulp.src(PATHS.demo.pages)
        .pipe(panini({
            root: PATHS.demo.panini + 'pages/',
            layouts: PATHS.demo.panini + 'layouts/',
            partials: PATHS.demo.panini + 'partials/',
            helpers: PATHS.demo.panini + 'helpers/',
            data: PATHS.demo.panini + 'data/'
        }))
        .pipe(gulp.dest(PATHS.demo.dist));
}

function demo_json() {
    return gulp.src(PATHS.demo.json)
        .pipe(gulp.dest(PATHS.demo.dist + '/json'));
}

// Browsersync server
// =======

function server(done) {
    browser.init({
        server: PATHS.server,
        startPath: '/demo',
        middleware: function (req, res, next) {
            // convert post requests to get
            if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
                console.log('[POST => GET] : ' + req.url);
                req.method = 'GET';
            }
            // simulate short delay
            setTimeout(() => {
                next();
            }, 1000);
        },
        port: PORT
    });
    done();
}

// Reload browser w/ Browsersync
// =======

function reload(done) {
    browser.reload();
    done();
}

// Watch for changes
// =======

function watch() {
    gulp.watch(PATHS.css).on('all', gulp.series(sass));
    gulp.watch('js/**/*.js').on('all', gulp.series(bundle, js, index, reload));
    gulp.watch(PATHS.images).on('all', gulp.series(images, reload));

    gulp.watch(PATHS.demo.js).on('all', gulp.series(demo_js, reload));
    gulp.watch(PATHS.demo.css).on('all', gulp.series(demo_sass));
    gulp.watch(PATHS.demo.json).on('all', gulp.series(demo_json, reload));
    gulp.watch('demo/panini/**/*.*').on('all', gulp.series('demo', reload));
}
