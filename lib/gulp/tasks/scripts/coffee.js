module.exports = function(gulp, $, config, lazyReq) {
  var browserSync = lazyReq('browser-sync');
  var path = require('path');

  var sources = [
    path.join(config.dirs.app, config.dirs.scripts, '**/*.{coffee,litcoffee,coffee.md}'),
    path.join(config.dirs.lib, config.dirs.scripts, '**/*.{coffee,litcoffee,coffee.md}')
  ];

  function cleanDeleted(file) {
    if( file.event === 'deleted' ){
      delete $.cached.caches['scripts'][file.path];
    }
  }

  gulp.task('scripts:coffee', function () {
    if(config.watching)
      browserSync().notify("Compiling coffescript, please wait!");

    return gulp.src(sources)

      .pipe($.plumber({
        errorHandler: function(error) {
          $.notify.onError("Coffescript compilation error: " + error.message)(error); this.emit('end');
        }
      }))

      //.pipe($.cond(config.watching, function(){ return $.watch(sources, { name: 'Watch coffee scripts'}) } ))

      .pipe($.cond(config.watching, function(){ return $.changed(path.join(config.dirs.tmp, config.dirs.scripts), { extension: '.js' })} ))
      .pipe($.cond(config.watching, function(){ return $.cached('scripts')} ))

      .pipe($.cond(config.watching, function(){ return $.sourcemaps.init()} ))

      .pipe($.coffee({ bare: true }))
      .pipe($.ngAnnotate())

      .pipe($.cond(config.watching, function(){ return $.sourcemaps.write({includeContent: true})} ))

      .pipe(gulp.dest(path.join(config.dirs.tmp, config.dirs.scripts)))

      .pipe($.cond(config.watching, function(){ return $.filter('**/*.js')} ))
      .pipe($.cond(config.watching, function(){ return browserSync().reload({stream:true})} ));

  });

  gulp.task('watch:coffee', [], function () {
    $.watch(sources,
      { name: 'Watch coffee scripts'},
      function (file) {
        cleanDeleted(file);
        gulp.start('scripts:coffee'); });
  });
};

