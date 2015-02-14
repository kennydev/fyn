module.exports = function(gulp, $, config, lazyReq) {
  var browserSync = lazyReq('browser-sync');
  var path = require('path');

  var rubysass = function (name, main, sources){
    if(config.watching)
      browserSync().notify("Compiling " + name + " styles, please wait!");

    /*gulp.src(path.join(config.dirs.app, config.dirs.styles, expr))
     .pipe($.plumber({
     errorHandler: $.notify.onError("Sass compilation error: <%= error.message %>")
     }))
     .pipe($.sass({
     includePaths: config.sass.loadpaths,
     outputStyle: config.sass.style,
     sourceComments: 'normal',
     imagePath: config.sass.imagePath,
     precision: config.sass.precision
     }))
     .pipe($.autoprefixer(config.autoprefixer.default))
     .pipe(gulp.dest(path.join(config.dirs.tmp, config.dirs.styles)));*/

    // gulp.src(path.join(config.dirs.app, config.dirs.styles, sources))

    // .pipe($.plumber({
    //  errorHandler: function(error) {
    //    $.notify.onError("RubySass compilation error: " + error.message)(error); this.emit('end');
    //  }
    // }))

    // .pipe($.cond(config.watching, function(){ return $.newer(path.join(config.dirs.tmp, config.dirs.styles, name + '.css'))} ))

    //.pipe($.cond(config.watching, function(){ return $.sourcemaps.init() } ))

    var base_path = path.join(config.dirs.app, config.dirs.styles);

    return $.rubySass(path.join(base_path, main),{
        container: name,
        loadPath: config.sass.loadpaths,
        sourcemap: config.rubysass.sourcemap,
        bundleExec: config.rubysass.bundleExec,
        style: config.rubysass.style,
        lineNumbers: config.rubysass.lineNumbers,
        precision: config.rubysass.precision,
        compass: config.rubysass.compass,
        require: config.rubysass.require,
        trace: true
      })
      .on('error', function (error) {
          $.notify.onError("RubySass compilation error: " + error.message)(error); this.emit('end');
      })
      //.pipe($.cond(config.watching, function(){ return $.sourcemaps.write({includeContent: true}) } ))

      .pipe(gulp.dest(path.join(config.dirs.tmp, config.dirs.styles)))

      .pipe($.cond(config.watching, function(){ return $.filter('**/*.css')} ))
      .pipe($.cond(config.watching, function(){ return browserSync().reload({stream:true})} ));
  }

  gulp.task('styles:rubysass:default', function () {
    return rubysass('default', config.sass.default, '')
  });

  var all = [];

  config.sass.styles.forEach(function (style) {
    var task = 'styles:rubysass:' + style.name;
    all.push(task);
    gulp.task(task, function (cb) {
      return rubysass(style.name, style.main, style.sources)
    });
  });

  gulp.task('styles:rubysass', all);

  gulp.task('watch:styles', [], function () {
    config.sass.styles.forEach(function (style) {
      $.watch([
          path.join(config.dirs.app, config.dirs.styles, style.sources),
          path.join(config.dirs.app, config.dirs.styles, style.main)
        ],
        { name: 'Watch styles sources: ' + style.name },
        function () {
          gulp.start('styles:'+ config.sass.compiler + ':' + style.name);
        });
    });
  });

  return rubysass
};

