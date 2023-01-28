"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// this file is compiled by gulp-babel from /src/js/custom.js for IE11 compatibility
// Globals
var scrollTop;
var pageHeight;
var winHeight;
var winWidth;
var headerHeight;
var screenBottom;
var goUpBtn = document.getElementById("go-up");

var videoEmbeds = _toConsumableArray(document.querySelectorAll(".youtube-embed"));

var portfolioPage = document.getElementById("portfolio-page");
var postList = [];
var portfPost;
var prlxSectionsList = [];
var prlxSections;
var syncPipes = document.getElementById("sync-pipes");
document.addEventListener("DOMContentLoaded", function () {
  // vars for sections in view detection
  pageHeight = document.documentElement.scrollHeight;
  winHeight = window.innerHeight;
  winWidth = window.innerWidth;
  headerHeight = document.querySelector(".header").offsetHeight;
  prlxSections = _toConsumableArray(document.querySelectorAll(".prlx-container"));
  preloader();
  lazyLoadVideo();

  if (prlxSections != "") {
    createPrlxSectionsList();
  }

  if (portfolioPage) {
    createPortfSectionsList();
  } // if (syncPipes){
  // 	preloadGifBg()
  // }

}); // DOMContentLoaded

window.addEventListener("scroll", function () {
  // vars for sections in view detection
  scrollTop = window.pageYOffset;
  screenBottom = scrollTop + winHeight;
  progressBar();
  revealGoUpBtn(); // watchSections()

  addPortfolioHash();

  if (prlxSections != "") {
    parallaxShift();
  }
}); // scroll
// Preloader

function preloader() {
  document.body.classList.add("loaded");
} // Progressbar


function progressBar() {
  document.querySelector("#progress .progress__bar").style.width = scrollTop / ((pageHeight - winHeight) / 100) + "%";
} // Go-up btn


function revealGoUpBtn() {
  if (scrollTop > winHeight / 2) {
    goUpBtn.style.opacity = 1;
  } else {
    goUpBtn.style.opacity = 0;
  }
}

goUpBtn.addEventListener("click", function goUp() {
  var duration = 300;
  animatedScroll(duration);
}); //Animated scroll, stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery

function animatedScroll(duration) {
  // cancel if already on top
  if (document.scrollingElement.scrollTop === 0) return;
  var totalScrollDistance = document.scrollingElement.scrollTop;
  var scrollY = totalScrollDistance,
      oldTimestamp = null;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollY will be -Infinity
      scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / duration;
      if (scrollY <= 0) return document.scrollingElement.scrollTop = 0;
      document.scrollingElement.scrollTop = scrollY;
    }

    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
} // animatedScroll
// end Go-up
// Sidebar with Menu


document.getElementById("sidebar-toggle").addEventListener("click", function toggleSidebar() {
  this.classList.toggle("toggled");
  document.getElementById("sidebar").classList.toggle("open");
}); // Detect a section in the viewport

function isInViewport(el) {
  // console.info(`isInViewport: ${el}`)
  var block = document.getElementById(el);
  var blockTopBorder = block.offsetTop;
  var blockHeight = block.offsetHeight;
  var blockBottomBorder = blockTopBorder + blockHeight;
  return scrollTop > blockTopBorder - headerHeight && scrollTop < blockBottomBorder;
} //////////////////////////
//PORTFOLIO


function createPortfSectionsList() {
  portfPost = _toConsumableArray(document.querySelectorAll("section.portfolio-preview"));
  portfPost.forEach(function (section) {
    if (section.id != null) {
      postList.push(section.id);
    } //if

  });
} //createPortfSectionsList
//Portfolio: Add hash to url for each post section in view


function addPortfolioHash(el) {
  postList.forEach(function (el) {
    if (isInViewport(el)) {
      history.replaceState(undefined, undefined, "#" + el);
    }
  });
} //addPortfolioHash
// Lazy-load videos TODO
// https://webdesign.tutsplus.com/tutorials/how-to-lazy-load-embedded-youtube-videos--cms-26743


function lazyLoadVideo() {
  videoEmbeds.map(function (video, i) {
    // get thumbnail
    var source = "https://img.youtube.com/vi/" + video.dataset.embed + "/sddefault.jpg"; // load the image asynchronously

    var image = new Image();
    image.src = source;
    image.addEventListener("load", function () {
      video.appendChild(image);
    }(i));
    video.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");
      this.innerHTML = "";
      this.appendChild(iframe);
    }); //click
  });
} //lazyLoadVideo
////////////////////////
// Frontpage: Disable logo link


if (document.querySelector("body.home")) {
  document.querySelector(".header__logo a").addEventListener("click", function (e) {
    e.preventDefault();
  });
} //end if Frontpage
////////////////////////
// Production: unloaded gif bg in sync-pipes TODO
// function preloadGifBg() {
// 	let imgCont = syncPipes.querySelectorAll(".wp-block-image")
// 	let imgContainers = [...imgCont]
// 	let gif
// 	imgContainers.forEach((im) => {
// 		gif = im.getElementsByTagName("img")//FAIL
// 		gif.style.border = "3px solid red"
// 		console.info(im)
// 	}
// )
// if (!gif.complete) {
// 		// return false;
// 		imgContainer.style.background = "#ddd"
// 		console.log("not loaded")
// }
// if (gif.naturalWidth === 0) {
// 		// return false;
// 		imgContainer.style.background = "#ddd"
// 		console.log("not loaded")
// }
// imgContainer.style.background = "none"
// console.log("loaded")
// }//IsImageOk
//////////////////////
// About Us: unfold course program


if (document.getElementById("course")) {
  document.querySelector(".program-toggle").addEventListener("click", function toggleProgram() {
    this.classList.toggle('toggled');
  });
} // 404: go back link


if (document.querySelector("body.error404 ")) {
  document.getElementById("go-back").addEventListener("click", function goBack() {
    window.history.back();
  });
} //////////////////////////
// Custom parallax


function createPrlxSectionsList() {
  prlxSections.forEach(function (s) {
    if (s.id != null) {
      prlxSectionsList.push(s.id);
    }
  });
}

function parallaxShift() {
  var prlxShift;
  prlxSectionsList.map(function (section) {
    var parentBlock = document.getElementById(section);
    var prlxBlock = parentBlock.querySelector(".prlx");
    var blockHeight = parentBlock.offsetHeight;
    var blockTopBorder = parentBlock.offsetTop;
    var blockBottomBorder = blockTopBorder + blockHeight;
    winWidth < 750 ? prlxShift = (scrollTop - blockTopBorder) / 25 : prlxShift = (scrollTop - blockTopBorder) / 20;

    if (scrollTop > blockTopBorder && scrollTop < blockBottomBorder) {
      prlxBlock.style.transform = "translateY(".concat(prlxShift, "px)");
    }
  }); //map
} // parallaxShift