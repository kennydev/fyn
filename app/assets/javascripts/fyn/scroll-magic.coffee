define (require) ->
  'use strict'

  ScrollMagic = require 'ScrollMagic';
  require 'ScrollMagic.debug';


  domReady = require 'domReady'

  console.log('scroll-magic');

  domReady () ->
    console.log('scroll-magic-domready');

    controller = new ScrollMagic.Controller()



    # Header
    tweenHeader = TweenMax.to("#intro-content", 0.5, {scale: 0.5})
    sceneHeader = new ScrollMagic.Scene({triggerElement: "#intro-trigger", offset: 300, duration: 200})
                  .setTween(tweenHeader)
                  .addTo(controller)

    sceneHeader.addIndicators()


    # Fyn rotator

    obj = {curImg: 0}

    tweenRotator = TweenMax.to(obj, 0.5,
    {
      curImg: 37,
      roundProps: "curImg",
      repeat: 0,
      immediateRender: true,
      ease: Linear.easeNone,
      onUpdate: () ->
        $("#fyn-rotator").css('background-position', '-' + 1100 * obj.curImg + 'px 0px');
        return
    })

    sceneRotator = new ScrollMagic.Scene({triggerElement: "#rotator-trigger", offset: 100, duration: 300})
    .setTween(tweenRotator)
    .addTo(controller);

    sceneRotator.addIndicators()

    # Footer
    sceneFooter = new ScrollMagic.Scene({triggerElement: "#footer-trigger", triggerHook: "onLeave"})
    .setClassToggle("#fyn-navbar", "show")
    .addTo(controller)

    sceneFooter.addIndicators()
    return


