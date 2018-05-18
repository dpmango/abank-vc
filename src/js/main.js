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
    handleUTM();
    legacySupport();
    initPopups();
    initScrollMonitor();
    initVideos();
    initVideos();
    _window.on('resize', debounce(initVideos, 200))
    initSmartBanner();
    initTeleport();

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

  // HANDLE UTM
  function handleUTM(){
    // selectors
    var logoLink = $('[js-paste-link-logo]');
    var appstoreLink = $('[js-paste-link-appstore]');
    var googleLink = $('[js-paste-link-google]');
    var openLink = $('[js-paste-link-open]');

    var hrefRefer = window.location.pathname.slice(1);

    var appLinkVal, siteLinkVal;

    switch (hrefRefer) {
      case "meduza":
        appLinkVal = "?pid=landing_virtual&c=Meduza_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_meduza&utm_source=landing_page&utm_medium=media&utm_campaign=virtual_card_landing_meduza"
        break;
      case "rbc":
        appLinkVal = "?pid=landing_virtual&c=RBC_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_rbc&utm_source=landing_page&utm_medium=media&utm_campaign=virtual_card_landing_rbc"
        break;
      case "inc":
        appLinkVal = "?pid=landing_virtual&c=INC_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_inc&utm_source=landing_page&utm_medium=media&utm_campaign=virtual_card_landing_inc"
        break;
      case "yandex":
        appLinkVal = "?pid=landing_virtual&c=YandexAuction_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_yandex&utm_source=landing_page&utm_medium=cpc&utm_campaign=virtual_card_landing_yandex"
        break;
      case "email":
        appLinkVal = "?pid=landing_virtual&c=Email_26_2_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_email_26_02&utm_source=landing_page&utm_medium=letter&utm_campaign=virtual_card_landing_email_26_02"
        break;
      case "vk_posts":
        appLinkVal = "?pid=landing_virtual&c=VK_posts_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_vk_posts&utm_source=landing_page&utm_medium=social&utm_campaign=virtual_card_landing_vk_posts"
        break;
      case "fb_posts":
        appLinkVal = "?pid=landing_virtual&c=FB_posts_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_fb_posts&utm_source=landing_page&utm_medium=social&utm_campaign=virtual_card_landing_fb_posts"
        break;
      case "vk_video":
        appLinkVal = "?pid=landing_virtual&c=VK_video_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_vk_video&utm_source=landing_page&utm_medium=social&utm_campaign=virtual_card_landing_vk_video"
        break;
      case "fb_video":
        appLinkVal = "?pid=landing_virtual&c=FB_video_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_fb_video&utm_source=landing_page&utm_medium=social&utm_campaign=virtual_card_landing_fb_video"
        break;
      case "spare":
        appLinkVal = "?pid=landing_virtual&c=spare_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_spare&utm_source=landing_page&utm_medium=organic&utm_campaign=virtual_card_landing_spare"
        break;
      default:
        appLinkVal = "?pid=landing_virtual&c=main_landing_virtual"
        siteLinkVal = "?platformId=landing_virtual_card_main&utm_source=landing_page&utm_medium=organic&utm_campaign=virtual_card_landing_main"
    }

    logoLink.attr('href', logoLink.attr('href') + '/' + siteLinkVal );
    openLink.attr('href', openLink.attr('href') + '/' + siteLinkVal );
    appstoreLink.attr('href', appstoreLink.attr('href') + appLinkVal );
    googleLink.attr('href', googleLink.attr('href') + appLinkVal );

  }

  // smartbanner (app store, gplay)
  function initSmartBanner(){
    $.smartbanner({
      title: "Альфа-Бизнес", // What the title of the app should be in the banner (defaults to <title>)
      author: "AO ALFA-BANK", // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
      price: 'FREE', // Price of the app
      appStoreLanguage: 'ru', // Language code for App Store
      inAppStore: 'Загрузить в App Store', // Text of price for iOS
      inGooglePlay: 'В Google Play', // Text of price for Android
      // inAmazonAppStore: 'In the Amazon Appstore',
      // inWindowsStore: 'In the Windows Store', // Text of price for Windows
      GooglePlayParams: null, // Aditional parameters for the market
      icon: null, // The URL of the icon (defaults to <meta name="apple-touch-icon">)
      iconGloss: null, // Force gloss effect for iOS even for precomposed
      url: null, // The URL for the button. Keep null if you want the button to link to the app store.
      button: 'Смотреть', // Text for the install button
      scale: 'auto', // Scale based on viewport size (set to 1 to disable)
      speedIn: 300, // Show animation speed of the banner
      speedOut: 400, // Close animation speed of the banner
      daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
      daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
      force: null, // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
      hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
      layer: false, // Display as overlay layer or slide down the page
      iOSUniversalApp: true, // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
      appendToSelector: 'body', //Append the banner to a specific selector
    })
  }

  // css3 filter support
  function css3FilterFeatureDetect(enableWebkit) {
    if(enableWebkit === undefined) {
        enableWebkit = false;
    }
    el = document.createElement('div');
    el.style.cssText = (enableWebkit?'-webkit-':'') + 'filter: blur(2px)';
    test1 = (el.style.length != 0);
    test2 = (
        document.documentMode === undefined //non-IE browsers, including ancient IEs
        || document.documentMode > 9 //IE compatibility moe
    );
    return test1 && test2;
  }

  css3FilterFeatureDetect(true);
  if(document.body.style.webkitFilter !== undefined){
    $('body').addClass('css3-filter-enabled');
  } else {
    $('body').addClass('css3-filter-disabled');
  }

  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	})
    .on('click', '[js-scrollTo]', function(){
      var target = $(this).data('scroll-to');
      $('body, html').animate({
          scrollTop: $('[data-target="'+target+'"]').offset().top}, 1000);
      return false;
    })

  // VIDEO
  function initVideos(){
    if ( _window.width() > 768 ){
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

      _document.on('click', '[js-toggle-video]', function(){
        var videoId = $(this).data('video');
        if ( _window.width() > 768 ){
          playVideo(videoId);
        }
      });

      // refactor
      var allVideos = $('[js-video-logic] video');
      var videos = [];
      allVideos.each(function(i, video){
        var $video = $(video);
        var videoDuration = 0;

        // load sources
        var sources = $video.find('source');
        $.each(sources, function(i, source){
          source.setAttribute('src', source.getAttribute('data-src'));
        })

        video.load();
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
    }

    function playVideo(index){
      // cleanup
      $('.step-nav__el').removeClass('is-active');
      $('video').removeClass('is-active');
      $('video').each(function(i, video){
        video.currentTime = 0;
        video.pause();
      })

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

  }

  ////////////
  // TELEPORT PLUGIN
  ////////////
  function initTeleport(){
    $('[js-teleport]').each(function (i, val) {
      var self = $(val)
      var objHtml = $(val).html();
      var target = $('[data-teleport-target=' + $(val).data('teleport-to') + ']');
      var conditionMedia = $(val).data('teleport-condition').substring(1);
      var conditionPosition = $(val).data('teleport-condition').substring(0, 1);

      if (target && objHtml && conditionPosition) {

        function teleport() {
          var condition;

          if (conditionPosition === "<") {
            condition = _window.width() < conditionMedia;
          } else if (conditionPosition === ">") {
            condition = _window.width() > conditionMedia;
          }

          if (condition) {
            target.html(objHtml)
            self.html('')
          } else {
            self.html(objHtml)
            target.html("")
          }
        }

        teleport();
        _window.on('resize', debounce(teleport, 100));


      }
    })
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
      var $el = $(el);
      var elWatcher = scrollMonitor.create( $el );
      var fullyEntered = $el.data('fully-entered');

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $el.data('animation-delay');
      }

      var animationClass = $el.data('animation-class') || "wowFadeUp"
      var animationName = $el.data('animation-name') || "wowFade"
      var animationDuration = $el.data('animation-duration') || "0.75s"

      if ( fullyEntered ){
        elWatcher.fullyEnterViewport(throttle(show, 100, {
          'leading': true
        }));
      } else {
        elWatcher.enterViewport(throttle(show, 100, {
          'leading': true
        }));
      }

      function show(){
        $el.addClass(animationClass);
        $el.css({
          'animation-name': animationName,
          'animation-delay': delay,
          'animation-duration': animationDuration,
          'visibility': 'visible'
        });
      }
    });

  }


  //
  // function checkAvailable(){
  //   var interval = setInterval(function () {
  //     var allReady = false;
  //     $.each(videos, function(i, video){
  //       video.videoDuration > 0 ? allReady = true : allReady = false
  //
  //       if ( allVideos.length == i + 1 ){
  //         if ( allReady ){
  //           startPlaying();
  //           clearInterval(interval);
  //         }
  //       }
  //     });
  //   }, 100);
  // }
  //
  // function startPlaying(){
  //   var interval;
  //   var secondsPlaying = 0;
  //   var iteration = 1;
  //
  //   interval = setInterval(function () {
  //     var firstVideoAfter = 1;
  //     var secondVideoAfter = videos[0].videoDuration
  //     var thirdVideoAfter = videos[0].videoDuration + videos[1].videoDuration
  //     var totalVideoTime = videos[0].videoDuration + videos[1].videoDuration + videos[2].videoDuration
  //     // console.log(firstVideoAfter,secondVideoAfter )
  //
  //     var countdown = Math.abs(secondsPlaying - ( totalVideoTime * iteration ));
  //     $.each(videos, function(i, video){
  //       if ( video.index == 1){
  //         if (countdown >= firstVideoAfter * iteration ){
  //           playVideo(1)
  //         } else {
  //           stopVideo(1);
  //         }
  //       }
  //
  //       if ( video.index == 2){
  //         if (countdown >= secondVideoAfter * iteration){
  //           playVideo(2)
  //         } else {
  //           stopVideo(2);
  //         }
  //       }
  //
  //       if ( video.index == 3){
  //         if (countdown >= thirdVideoAfter * iteration){
  //           playVideo(3)
  //         } else {
  //           stopVideo(3);
  //         }
  //       }
  //     })
  //
  //     if ( secondsPlaying > totalVideoTime * iteration ){
  //       iteration++
  //     }
  //     secondsPlaying++
  //   }, 1000);
  //
  // }

  // function stopVideo(index){
  //   $.each(videos, function(i, video){
  //     if ( video.index == index ){
  //       var targetVideo = video.video;
  //       targetVideo.removeClass('is-active');
  //       targetVideo.get(0).pause();
  //
  //       // update selector class
  //       $('.step-nav__el[data-video="'+video.index+'"]').removeClass('is-active');
  //     }
  //   });
  // }

});
