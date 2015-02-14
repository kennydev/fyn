module.exports = function(gulp, $, config, lazyReq) {

  var path = require('path');

  var images_regex = '**/*.{gif,jpeg,jpg,png,svg}';

  var imagemin_options = {
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: []     // pngcrush()
  };

  var imagemin_options_default = {
    optimizationLevel: 3,    //png
    progressive: false,      //jpg
    interlaced: false,       //gif
    svgoPlugins: [],         //svg
    use: null                // aditional pluggins
  };

  imagemin_options = imagemin_options_default;
  gulp.task('imagemin:assets', function () {
      return gulp.src(path.join(config.dirs.app, config.dirs.images, images_regex))
        .pipe($.plumber())
        .pipe($.imagemin(imagemin_options))
        .pipe(gulp.dest(path.join(config.dirs.app, config.dirs.images)));
  });

  gulp.task('imagemin:public', function () {
    return gulp.src(path.join(config.dirs.public, images_regex))
      .pipe($.plumber())
      .pipe($.imagemin(imagemin_options))
      .pipe(gulp.dest(path.join(config.dirs.public)));
  });

  gulp.task('imagemin', ['imagemin:assets', 'imagemin:public']);
};

