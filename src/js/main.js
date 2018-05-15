$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady(){
    legacySupport();
    initPopups();
    initScrollMonitor();
    initVideos();

    // development helper
    _window.on('resize', debounce(setBreakpoint, 200))
  }

  // this is a master function which should have all functionality
  pageReady();


  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }


  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	})

  // VIDEO
  function initVideos(){
    $('video[data-video-id="1"]').on('ended', function(){
      playVideo(2);
    });
    $('video[data-video-id="2"]').on('ended', function(){
      setTimeout(function(){
        playVideo(3);
      }, 1000)
    });
    $('video[data-video-id="3"]').on('ended', function(){
      setTimeout(function(){
        playVideo(1);
      }, 2000)
    });

    // refactor
    var allVideos = $('[js-video-logic] video');
    var videos = [];
    allVideos.each(function(i, video){
      var $video = $(video);
      var videoDuration = 0;

      $video.on('loadedmetadata', function(){
        videoDuration = Math.round(video.duration);
        videos.push({
          video: $video,
          videoDuration: videoDuration + 1, // 1 second delay for slides change
          index: i + 1
        });

        // check that all ready for the last element
        if ( allVideos.length == i + 1 ){
          // checkAvailable();
          playVideo(1);
        };
      });
    });

    function checkAvailable(){
      var interval = setInterval(function () {
        var allReady = false;
        $.each(videos, function(i, video){
          video.videoDuration > 0 ? allReady = true : allReady = false

          if ( allVideos.length == i + 1 ){
            if ( allReady ){
              startPlaying();
              clearInterval(interval);
            }
          }
        });
      }, 100);
    }

    function startPlaying(){
      var interval;
      var secondsPlaying = 0;
      var iteration = 1;

      interval = setInterval(function () {
        var firstVideoAfter = 1;
        var secondVideoAfter = videos[0].videoDuration
        var thirdVideoAfter = videos[0].videoDuration + videos[1].videoDuration
        var totalVideoTime = videos[0].videoDuration + videos[1].videoDuration + videos[2].videoDuration
        // console.log(firstVideoAfter,secondVideoAfter )

        var countdown = Math.abs(secondsPlaying - ( totalVideoTime * iteration ));
        $.each(videos, function(i, video){
          if ( video.index == 1){
            if (countdown >= firstVideoAfter * iteration ){
              playVideo(1)
            } else {
              stopVideo(1);
            }
          }

          if ( video.index == 2){
            if (countdown >= secondVideoAfter * iteration){
              playVideo(2)
            } else {
              stopVideo(2);
            }
          }

          if ( video.index == 3){
            if (countdown >= thirdVideoAfter * iteration){
              playVideo(3)
            } else {
              stopVideo(3);
            }
          }
        })

        if ( secondsPlaying > totalVideoTime * iteration ){
          iteration++
        }
        secondsPlaying++
      }, 1000);

    }

    function playVideo(index){
      // cleanup
      $('.step-nav__el').removeClass('is-active');
      $('video').removeClass('is-active');

      // add active classes and play
      var targetVideo = $('video[data-video-id="'+index+'"]');
      targetVideo.get(0).play();
      targetVideo.addClass('is-active');
      $('.step-nav__el[data-video="'+index+'"]').addClass('is-active');

      // $.each(videos, function(i, video){
      //   if ( video.index == index ){
      //     var targetVideo = video.video;
      //     targetVideo.addClass('is-active');
      //     targetVideo.get(0).play();
      //
      //     // update selector class
      //     $('.step-nav__el[data-video="'+video.index+'"]').addClass('is-active');
      //   }
      // });
    }
    function stopVideo(index){
      $.each(videos, function(i, video){
        if ( video.index == index ){
          var targetVideo = video.video;
          targetVideo.removeClass('is-active');
          targetVideo.get(0).pause();

          // update selector class
          $('.step-nav__el[data-video="'+video.index+'"]').removeClass('is-active');
        }
      });
    }

  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var startWindowScroll = 0;
    $('[js-popup]').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'popup-buble',
      closeMarkup: '<button title="%title%" type="button" class="modal__close"><svg class="ico ico-close"><use xlink:href="img/sprite.svg#ico-close"></use></svg></button>',
      callbacks: {
        beforeOpen: function() {
          startWindowScroll = _window.scrollTop();
          // $('html').addClass('mfp-helper');
        },
        close: function() {
          // $('html').removeClass('mfp-helper');
          _window.scrollTop(startWindowScroll);
        }
      }
    });

  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  _document
    .on('click', '.modal__close', closeMfp)

  ////////////
  // UI
  ////////////

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp"

      var animationName = $(el).data('animation-name') || "wowFade"

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      // elWatcher.exitViewport(throttle(function() {
      //   $(el).removeClass(animationClass);
      //   $(el).css({
      //     'animation-name': 'none',
      //     'animation-delay': 0,
      //     'visibility': 'hidden'
      //   });
      // }, 100));
    });

  }

  //////////
  // MEDIA Condition helper function
  //////////
  function mediaCondition(cond){
    var disabledBp;
    var conditionMedia = cond.substring(1);
    var conditionPosition = cond.substring(0, 1);

    if (conditionPosition === "<") {
      disabledBp = _window.width() < conditionMedia;
    } else if (conditionPosition === ">") {
      disabledBp = _window.width() > conditionMedia;
    }

    return disabledBp
  }

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint(){
    var wHost = window.location.host.toLowerCase()
    var displayCondition = wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0
    if (displayCondition){
      var wWidth = _window.width();

      var content = "<div class='dev-bp-debug'>"+wWidth+"</div>";

      $('.page').append(content);
      setTimeout(function(){
        $('.dev-bp-debug').fadeOut();
      },1000);
      setTimeout(function(){
        $('.dev-bp-debug').remove();
      },1500)
    }
  }

});
