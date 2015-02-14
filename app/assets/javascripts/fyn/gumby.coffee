define (require) ->
  'use strict'

  require 'gumby-core'
  require 'gumby-ui/gumby.retina'
  require 'gumby-ui/gumby.fixed'
  require 'gumby-ui/gumby.skiplink'
  require 'gumby-ui/gumby.toggleswitch'
  require 'gumby-ui/gumby.checkbox'
  require 'gumby-ui/gumby.radiobtn'
  require 'gumby-ui/gumby.tabs'
  require 'gumby-ui/gumby.navbar'
  require 'gumby-ui/jquery.validation'

  $ = require 'jquery'

  ###if ((!Gumby.touchDevice || !Gumby.touchEvents) && Gumby.autoInit)
    window.Gumby.init()

  # load jQuery mobile touch events
  else if (Gumby.touchEvents && Gumby.touchDevice)
    Gumby.debug('Loading jQuery mobile touch events')
    # set timeout to 2sec
    yepnope.errorTimeout = 2000;
    Modernizr.load({
      test: Modernizr.touch,
      yep: Gumby.touchEvents + '/jquery.mobile.custom.min.js',
      complete: () ->
        # error loading jQuery mobile
        if(!$.mobile)
          Gumby.error('Error loading jQuery mobile touch events');

        # if not auto initializing
        # this will allow helpers to fire when initialized
        Gumby.touchEventsLoaded = true;

        # auto initialize
        if(Gumby.autoInit)
          window.Gumby.init()

          # if already manually initialized then fire helpers
        else if(Gumby.uiModulesReady)
          Gumby.helpers();
    })###

  return window.Gumby
