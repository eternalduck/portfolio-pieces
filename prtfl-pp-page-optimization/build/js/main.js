"use strict";

// June, 2021
document.addEventListener("DOMContentLoaded", function () {
  //================
  // Sale Countdown
  //================
  var counter = document.getElementById("counter");

  if (counter) {
    // Set the date we're counting down to
    var endDate = new Date("Jun 9, 2021 23:59:59").getTime();
    var counterContainer = document.getElementById("counter-container");
    var counterVal = document.getElementById("counter-value"); // Update the count down every 1 second

    var coundown = setInterval(function () {
      var now = new Date().getTime();
      var period = endDate - now;
      var days = Math.floor(period / (1000 * 60 * 60 * 24));
      var hours = Math.floor(period % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var mins = Math.floor(period % (1000 * 60 * 60) / (1000 * 60));
      var sec = Math.floor(period % (1000 * 60) / 1000); // Update counter

      counterVal.innerHTML = "\n\t\t\t\t".concat(days < 10 ? "0" + days : days, " : \n\t\t\t\t").concat(hours < 10 ? "0" + hours : hours, " : \n\t\t\t\t").concat(mins < 10 ? "0" + mins : mins, " : \n\t\t\t\t").concat(sec < 10 ? "0" + sec : sec, "\n\t\t\t"); // stop & hide a whole section when finished

      if (period < 0) {
        clearInterval(coundown);
        counterContainer.style.display = "none";
      }
    }, 1000);
  } //if counter
  // end Sale Countdown
  //================
  // Blinking images
  //================


  var imgContainers = document.querySelectorAll(".blink-img");

  var blinkImages = function blinkImages() {
    imgContainers.forEach(function (c) {
      var imgs = c.getElementsByTagName("img");

      if (imgs.length > 1) {
        imgs[0].style.visibility = "hidden";
        setTimeout(function () {
          imgs[0].style.visibility = "visible";
        }, 2000);
      }
    });
  };

  if (imgContainers) {
    setInterval(blinkImages, 4000);
  } // end Blinking images

}); //DOMContentLoaded
//================
// jquery
//================
//================
// Swiper Slider for mobile only
//================

var isDesk = window.matchMedia("(min-width: 768px)");
var slider;
var swiperContClass = "swiper-container";
var swiperWrapClass = "swiper-wrapper";
var swiperPlaceholder = "swiper-container_mobile";
isDesk.addListener(sliderSwitcher);

function sliderSwitcher() {
  if (isDesk.matches) {
    disableSlider();
  } else {
    enableSlider();
  }
} // Toggling multiple swiper instances


function enableSlider() {
  addSliderClasses();
  slider = new Swiper(".".concat(swiperContClass), {
    autoHeight: true,
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    speed: 700,
    autoplay: {
      delay: 3000
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    resizeObserver: true,
    setWrapperSize: true
  });
}

function disableSlider() {
  if (slider !== undefined) {
    slider.forEach(function (sl) {
      sl.destroy(); //should remove classes (as per doc) but .. 

      removeSliderClasses(); // ..use this then
    });
  }
} // Manage swiper classes not to interfere with styles on desk with slider disabled


function addSliderClasses() {
  var containers = document.querySelectorAll(".".concat(swiperPlaceholder));

  if (containers) {
    containers.forEach(function (c) {
      var wrapper = c.querySelector(".swiper-wrapper_mobile");
      wrapper.classList.add(swiperWrapClass);
      c.classList.add(swiperContClass);
    });
  }
}

function removeSliderClasses() {
  var containers = document.querySelectorAll(".".concat(swiperContClass));

  if (containers) {
    containers.forEach(function (c) {
      var wrapper = c.querySelector(".".concat(swiperWrapClass));
      wrapper.classList.remove(swiperWrapClass);
      c.classList.remove(swiperContClass);
    });
  }
} //end Swiper


$(document).ready(function () {
  // Swiper
  if (document.querySelector(".".concat(swiperPlaceholder)) !== null) {
    sliderSwitcher();
  } //================
  // Video in full-width sections (copypasted)
  //================


  if (document.getElementById('prefallmayVideoFrontage')) {
    var resizevideoPrefallmayHLSFresh = function resizevideoPrefallmayHLSFresh(paramWindow) {
      var videoPrefallmay = document.getElementById('prefallmayVideoFrontage');
      var videoSrcDesktopPrefallmay = 'https://player.vimeo.com/external/553287211.m3u8?s=ab6aee299d4c55e0e446914daa9386f78b270d9b';
      var videoSrcMobilePrefallmay = 'https://player.vimeo.com/external/553287391.m3u8?s=808d0a57ad83b5dcbc1dc52311401a66dca72ac9';
      var posterDesktopPrefallmay = 'https://i.vimeocdn.com/video/1143125404_1920x800?r=pad';
      var posterMobilePrefallmay = 'https://i.vimeocdn.com/video/1143126287_1080x1080?r=pad';

      if (Hls.isSupported()) {
        var hlsSilver = new Hls();
        hlsSilver.detachMedia();
        hlsSilver.startLevel = 3;

        if (paramWindow.width() <= 767) {
          hlsSilver.loadSource(videoSrcMobilePrefallmay);
        } else {
          hlsSilver.loadSource(videoSrcDesktopPrefallmay);
        }

        hlsSilver.attachMedia(videoPrefallmay);
        hlsSilver.on(Hls.Events.MANIFEST_PARSED, function () {
          videoPrefallmay.play();
        });
      } // big lib comment was here
      else if (videoPrefallmay.canPlayType('application/vnd.apple.mpegurl')) {
          if (paramWindow.width() <= 767) {
            videoPrefallmay.src = videoSrcMobilePrefallmay;
          } else {
            videoPrefallmay.src = videoSrcDesktopPrefallmay;
          }

          videoPrefallmay.addEventListener('loadedmetadata', function () {
            videoPrefallmay.play();
          });
        }

      if (paramWindow.width() <= 767) {
        if ($("#prefallmayVideoFrontage").attr("poster") != posterMobilePrefallmay) {
          $("#prefallmayVideoFrontage").attr("poster", posterMobilePrefallmay); // mobile
        }
      } else {
        if ($("#prefallmayVideoFrontage").attr("poster") != posterDesktopPrefallmay) {
          $("#prefallmayVideoFrontage").attr("poster", posterDesktopPrefallmay); // desktop
        }
      }

      $("#prefallmayVideoFrontage").css("visibility", "visible");
    };

    var widthSilver = -1;
    $(window).on("resize", function () {
      if (widthSilver == -1 || $(this).width() <= 767 && widthSilver > 767 || $(this).width() > 767 && widthSilver <= 767) resizevideoPrefallmayHLSFresh($(this));
      widthSilver = $(this).width();
    });
    resizevideoPrefallmayHLSFresh($(window));
  } //if Hls
  // end Video in full-width sections

}); //document ready