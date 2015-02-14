requirejs.config
  baseUrl: '/',
  waitSeconds: 20,
  deps: ['jquery']
  paths:
  # Core libraries
    'h5bp':                    'h5bp'
    'domReady':                'domReady/domReady'
    'jquery':                  'jquery/dist/jquery'
    'lodash':                  'lodash/dist/lodash'

  # Gumby
    'gumby-core':              'gumby/js/libs/gumby'
    'gumby-ui':                'gumby/js/libs/ui'


  # Jquery plugins
    'jquery-placeholder':      'jquery-placeholder/jquery.placeholder'
    'ScrollMagic':             'ScrollMagic/js/jquery.scrollmagic'
    'ScrollMagic.debug':       'ScrollMagic/js/jquery.scrollmagic.debug'

    'TweenMax':                'ScrollMagic/js/_dependent/greensock/TweenMax.min'
    'TweenLite':               'ScrollMagic/js/_dependent/greensock/TweenLite.min'
    'TimelineMax':             'ScrollMagic/js/_dependent/greensock/TimelineMax.min'

  # App
    'fyn-app':                 'fyn/app'
    'gumby':                   'fyn/gumby'

  shim:
    'gumby-core':                   { deps: ['jquery'] }
    'gumby-ui/gumby.retina':        { deps: ['gumby-core'] }
    'gumby-ui/gumby.fixed':         { deps: ['gumby-core'] }
    'gumby-ui/gumby.skiplink':      { deps: ['gumby-core'] }
    'gumby-ui/gumby.toggleswitch':  { deps: ['gumby-core'] }
    'gumby-ui/gumby.checkbox':      { deps: ['gumby-core'] }
    'gumby-ui/gumby.radiobtn':      { deps: ['gumby-core'] }
    'gumby-ui/gumby.tabs':          { deps: ['gumby-core'] }
    'gumby-ui/gumby.navbar':        { deps: ['gumby-core'] }
    'gumby-ui/jquery.validation':   { deps: ['gumby-core'] }
    'jquery-placeholder':           { deps: ['jquery'] }

requirejs ['fyn-app']
