module.exports = function(gulp, $, config, lazyReq) {

  var path = require('path');

  gulp.task('copy:scripts:app', function () {
    gulp.src('**/*.js', { cwd: path.join(config.dirs.app, config.dirs.scripts) })
      .pipe(gulp.dest(path.join(config.dirs.tmp, config.dirs.scripts)))
  });

  gulp.task('copy:scripts:lib', function () {
    gulp.src('**/*.js', { cwd: path.join(config.dirs.lib, config.dirs.scripts) })
      .pipe(gulp.dest(path.join(config.dirs.tmp, config.dirs.scripts)))
  });

  gulp.task('copy:scripts:vendor', function () {
    gulp.src('**/*.js', { cwd: path.join(config.dirs.vendor, config.dirs.scripts) })
      .pipe(gulp.dest(path.join(config.dirs.tmp, config.dirs.scripts)))
  });

  gulp.task('copy:scripts:bower_components', function () {
    gulp.src('**/*.js', { cwd: path.join(config.dirs.bower_components) })
      .pipe(gulp.dest(path.join(config.dirs.tmp, config.dirs.scripts)))
  });

  gulp.task('copy:scripts',['copy:scripts:app', 'copy:scripts:lib', 'copy:scripts:vendor', 'copy:scripts:bower_components']);
};

