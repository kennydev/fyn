define (require) ->
  'use strict'

  domReady = require 'domReady'

  domReady () ->
    console.log('Iniciado')
    return

  Gumby = require 'gumby'
  $ = require 'jquery'
  require 'jquery-placeholder'
  require 'fyn/scroll-magic';

  # Gumby is ready to go
  Gumby.ready(() ->
    Gumby.log('Gumby is ready to go...', Gumby.dump())

    # placeholder polyfil
    if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9'))
      $('input, textarea').placeholder()

    # skip link and toggle on one element
    # when the skip link completes, trigger the switch
    $('#skip-switch').on('gumby.onComplete', () ->
      $(this).trigger('gumby.trigger')
    )

    $win = $(window)

    $('[data-fullscreen]').height($win.height())
    $win.on('resize', ()->
      $('[data-fullscreen]').height($win.height())
    )
  )
  # Oldie document loaded
  .oldie(() ->
    Gumby.warn("This is an oldie browser...")
  )
  # Touch devices loaded
  .touch(() ->
    Gumby.log("This is a touch enabled device...")
  )

  Gumby.init({
    debug: true
  })
  return
