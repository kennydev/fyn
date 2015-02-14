module.exports = function(gulp, $, config, lazyReq) {
  var browserSync = lazyReq('browser-sync');
  var path = require('path');

  var basePath = path.join(config.dirs.app, config.dirs.scripts, config.handlebars.templates_dir);
  var sources = path.join(basePath, '**/*.hbs');


  function cleanDeleted(file) {
    if( file.event === 'deleted' ){
      delete $.cached.caches['handlebars'][file.path];
      $.remember.forget('handlebars', file.path); // don't work .hbs different from remembered .js
    }
  }

  gulp.task('scripts:handlebars', function(){
    if(config.watching)
      browserSync().notify("Compiling handlebars templates, please wait!");

    gulp.src(sources)

      .pipe($.plumber({
        errorHandler: function(error) {
          $.notify.onError("Handlebars compilation error: " + error.message)(error); this.emit('end');
        }
      }))

      .pipe($.cond(config.watching, function(){ return $.newer(path.join(config.dirs.tmp, config.dirs.scripts, config.handlebars.templates_dir, config.handlebars.output_file))} ))
      .pipe($.cond(config.watching, function(){ return $.cached('handlebars')} )) // Doesn't work with watch
      //.pipe($.cond(config.watching, function(){ return $.watch(sources, { name: 'Watch handlebars scripts'}) } ))

      .pipe($.handlebars())
      .pipe($.wrap('Handlebars.template(<%= contents %>)'))
      .pipe($.declare({
        namespace: 'Handlebars',
        noRedeclare: true, // Avoid duplicate declarations
        processName: function(filePath) {
          // Allow nesting based on path using gulp-declare's processNameByPath()
          // You can remove this option completely if you aren't using nested folders
          // Drop the client/templates/ folder from the namespace path by removing it from the filePath
          return $.declare.processNameByPath(filePath.replace(basePath, ''));
        }
      }))

      .pipe($.cond(config.watching, function(){ return $.remember('handlebars')} ))

      .pipe($.concat(config.handlebars.output_file))
      .pipe($.defineModule('plain', { wrapper: "define(['handlebars'], function(Handlebars) { <%= contents %> return this['Handlebars']; })" }))

      .pipe(gulp.dest(path.join(config.dirs.tmp, config.dirs.scripts, config.handlebars.templates_dir)))

      .pipe($.cond(config.watching, function(){ return browserSync().reload({stream:true})} ));


  });

  gulp.task('watch:handlebars', [], function () {
    $.watch(sources,
      { name: 'Watch handlebars templates'},
      function (file) {
        cleanDeleted(file);
        gulp.start('scripts:handlebars'); });
  });
};

