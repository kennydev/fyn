module.exports = function(gulp, $, config, lazyReq) {
  var browserSync = lazyReq('browser-sync');
  var path = require('path');
  var url = lazyReq('url');
  var proxy = lazyReq('proxy-middleware');

  gulp.task('bs-reload', function () {
    browserSync().reload();
  });

  function watch(){
    var tmp_app = "{"+ config.dirs.build + "," + config.dirs.app + "}";

    $.watch([
        path.join(config.dirs.app, config.dirs.styles, '**/*.css')
      ],
      { name: 'Watch reload css browser sync'},
      function(files, cb) {
        files.pipe(browserSync().reload({stream:true}));
      });

    gulp.watch([
      path.join(config.dirs.app, config.dirs.scripts, '**/*.js'),
      path.join(config.dirs.app, config.dirs.views, '**/*.{html,html.erb}'),
    ], function(){
      browserSync().reload();
    });
  }

  gulp.task('browser-sync', function() {
    var proxy_options = {
      proxy: config.browserProxy.proxy
    }

    var options = require('util')._extend(config.browser, proxy_options);
    browserSync()(options);
    watch();
  });

  gulp.task('browser-sync', function() {

    var server_options = {
      server: {
        directory: config.browserServer.directory,
        baseDir: [
          path.join(config.dirs.app, config.dirs.views),
          path.join(config.dirs.app, config.dirs.fonts),
          path.join(config.dirs.app, config.dirs.images),
          path.join(config.dirs.app, config.dirs.scripts),
          path.join(config.dirs.tmp, config.dirs.scripts),
          path.join(config.dirs.tmp, config.dirs.styles),
          path.join(config.dirs.bower_components)
        ],
        routes: {
          "/bower_components": "vendor/bower_components",
          "/source": path.join(config.dirs.app, config.dirs.scripts)
        }
      }
    }

    if (config.browserServer.proxy) {
      var proxyOptions = url().parse(config.browserServer.proxyOptions.target);
      proxyOptions.route = config.browserServer.proxyOptions.apiPrefix;

      server_options.server.middleware = [proxy()(proxyOptions)]
    }

    var options = require('util')._extend(config.browser, server_options);
    browserSync()(options);
    watch();
  });
}


