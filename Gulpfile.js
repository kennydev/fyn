'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

// config
var config = require('./config/gulp.json');
require('fs').exists('./config/gulp.local.json', function(exists) {
  if (exists) {
    config = require('util')._extend(config, require('./config/gulp.local.json'));
  }
});

// lazy require
var lazyReq = require('lazy-req')(require);

// run sequence
var runSequence = require('run-sequence');


var require_task = function (name) {
  return require(config.dirs.tasks + name)(gulp, $, config, lazyReq);
}

require_task('styles/rubysass');
require_task('styles/libsass');
require_task('scripts/coffee');
// require_task('scripts/handlebars');
require_task('scripts/requirejs');
//require_task('images/imagemin');
//require_task('images/css-sprite');

require_task('copy');
require_task('clean');
require_task('browser-sync');

var compile_scripts = ['scripts:coffee'];
var compile_styles  = ['styles:' + config.sass.compiler];
var watch           = ['watch:styles', 'watch:coffee'];
var dist_prepare    = ['scripts:coffee','copy:scripts']

gulp.task('compile:scripts',[], function(callback){
  runSequence(compile_scripts,
    callback);
});

gulp.task('compile:styles',[], function(callback){
  runSequence(compile_styles,
    callback);
});

gulp.task('compile', function (callback) {
  runSequence(['compile:styles', 'compile:scripts'],
    callback);
});

gulp.task('watch', watch);

gulp.task('watch-browser', function (callback) {
  config.watching = true;
  runSequence(['watch', 'browser-sync'],
    callback);
});

gulp.task('dist:prepare', ['clean:dist','clean:tmp'],function (callback) {
  runSequence(
    dist_prepare,
    callback);
});

gulp.task('dist', function (callback) {
  runSequence(
    'scripts:requirejs',
    callback);
});

gulp.task('serve', function (callback) {
  config.watching = true;
  runSequence('compile',
    'watch-browser',
    callback);
});

gulp.task('compress', function() {
  gulp.src('dist/assets/javascripts/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/assets/javascripts/min'))
});

gulp.task('default', ['serve']);

//gulp.task('extras', function () {
//  return gulp.src(['app/*.*', '!app/*.{html,jade}'], { dot: true })
//    .pipe(gulp.dest('dist'));
//});

//gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
//  return gulp.src('dist/**/*').pipe($.size({ showFiles: true, gzip: true }));
//});
// gulp.task('build', ['browserify', 'compass', 'images', 'html']);
