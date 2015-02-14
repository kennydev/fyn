module.exports = function(gulp, $, config, lazyReq) {
  var sprite = lazyReq('css-sprite');
  var path = require('path');

  var csssprite = function (name){

    return gulp.src(path.join(config.dirs.app, config.dirs.images, 'icons', name, '*.png'))
      .pipe(sprite().stream({
        template: 'lib/gulp/tasks/images/css-sprite/css-sprite.mustache',
        name: name,
        style: '_sprite-' + name + '.scss',
        cssPath: 'sprites',
        processor: 'scss',
        retina: true,
        orientation: 'binary-tree',
        prefix: name,
        margin: 3
      }))
      .pipe($.if('*.png', gulp.dest(path.join(config.dirs.app, config.dirs.images, 'sprites')), gulp.dest(path.join(config.dirs.app, config.dirs.styles, 'shared', 'sprites'))));
  }

  var all = [];

  config.sprites.forEach(function (sprite) {
    var task = 'images:css-sprite:' + sprite;
    all.push(task);
    gulp.task(task, function (cb) {
      return csssprite(sprite)
    });
  });

  gulp.task('images:css-sprite', all);

  return csssprite
};

