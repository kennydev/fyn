module.exports = function(gulp, $, config, lazyReq) {

  var path = require('path');

  gulp.task('scripts:requirejs', function () {

    return $.requirejs({
      baseUrl: path.join(config.dirs.tmp, config.dirs.scripts),
      out: config.requirejs.out,
      mainConfigFile: path.join(config.dirs.tmp, config.dirs.scripts, config.requirejs.configFile),
      name: config.requirejs.name,
      optimize: 'none',
      wrapShim: config.requirejs.wrapShim || false,
      paths: config.requirejs.paths || {}
    })
      .pipe(gulp.dest(path.join(config.dirs.dist, config.dirs.scripts)));
  });
};

