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
import through from 'through';
import panini from 'panini';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PATHS } = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

// Enter URL of your local server here
var URL = 'http://pickles.local/demo';

// Build the "dist" folder by running all of the below tasks
gulp.task('deploy',
    gulp.series(clean, sass, js, examples, bundle, images, pages));

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
    gulp.series(clean, sass, js, examples, bundle, images, pages));

// Build the site, run the server, and watch for file changes
gulp.task('default',
    gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
    rimraf(PATHS.demo, function () { });
    rimraf(PATHS.dist, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
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
        .pipe($.rename(function (path) {
            console.log(path);
        }))
        .pipe(gulp.dest(PATHS.dist + '/css'))
        .pipe(browser.stream());
}

function js() {
    return gulp.src(PATHS.js)
        //.pipe(umd())
        .pipe(gulp.dest(PATHS.dist + '/js'));
}

function examples() {
    return gulp.src(PATHS.examples)
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
        .pipe(gulp.dest(PATHS.dist + '/js/examples'));
}

// Combine JavaScript into one file
// In production, the file is minified
function bundle() {
    return gulp.src(PATHS.entries)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe($.if(PRODUCTION, $.uglify()
            .on('error', e => {
                console.log(e);
            })
        ))
        .pipe(gulp.dest(PATHS.dist + '/js/lib'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
    return gulp.src(PATHS.images)
        // .pipe($.if(PRODUCTION, $.imagemin({
        //   progressive: true
        // })))
        .pipe(gulp.dest(PATHS.dist + 'img'));
}

function pages() {
    return gulp.src(PATHS.pages)
        .pipe(panini({
            root: PATHS.panini + 'pages/',
            layouts: PATHS.panini + 'layouts/',
            partials: PATHS.panini + 'partials/',
            /*
            pageLayouts: {
                examples: 'example',
                guide: 'example'
            },
            */
            helpers: PATHS.panini + 'helpers/',
            data: PATHS.panini + 'data/'
        }))
        .pipe(gulp.dest(PATHS.demo));
}

// Start BrowserSync to preview the site in
function server(done) {
    browser.init({
        proxy: URL,

        ui: {
            port: 8080
        }

    });
    done();
}

// Reload the browser with BrowserSync
function reload(done) {
    browser.reload();
    done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
    gulp.watch(PATHS.pages).on('all', gulp.series(pages, reload));
    gulp.watch('scss/**/*.scss').on('all', gulp.series(sass));
    gulp.watch('js/**/*.js').on('all', gulp.series(bundle, js, examples, reload));
    gulp.watch(PATHS.images).on('all', gulp.series(images, reload));
}
