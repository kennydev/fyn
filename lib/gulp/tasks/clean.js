module.exports = function(gulp, $, config, lazyReq) {
  var del = lazyReq('del');
  var path = require('path');

  gulp.task('clean:tmp', del().bind(null, [config.dirs.tmp]));
  gulp.task('clean:tmp:styles', del().bind(null, [path.join(config.dirs.tmp, config.dirs.styles)]));
  gulp.task('clean:tmp:scripts', del().bind(null, [path.join(config.dirs.tmp, config.dirs.scripts)]));
  gulp.task('clean:dist', del().bind(null, [config.dirs.dist]));
  gulp.task('clean:build', del().bind(null, [config.dirs.build]));
  gulp.task('clean', del().bind(null, [config.dirs.tmp, config.dirs.dist]));

  gulp.task('clean:caches', function() {
    $.cached.caches = {};
  });
//gulp.task('clean', function() {
//  return gulp.src(['.tmp', 'dist'], { read: false })
//    .pipe($.rimraf());
//});
};
