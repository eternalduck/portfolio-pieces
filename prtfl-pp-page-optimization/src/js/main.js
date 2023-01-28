// June, 2021
document.addEventListener( "DOMContentLoaded", function () {
	//================
	// Sale Countdown
	//================
	const counter = document.getElementById("counter");
	if(counter) {
		// Set the date we're counting down to
		const endDate = new Date("Jun 9, 2021 23:59:59").getTime();
		const counterContainer = document.getElementById("counter-container");
		const counterVal = document.getElementById("counter-value");
		// Update the count down every 1 second
		const coundown = setInterval(function() {
			let now = new Date().getTime();
			let period = endDate - now;
			let days = Math.floor(period / (1000 * 60 * 60 * 24));
			let hours = Math.floor((period % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let mins = Math.floor((period % (1000 * 60 * 60)) / (1000 * 60));
			let sec = Math.floor((period % (1000 * 60)) / 1000);

			// Update counter
			counterVal.innerHTML = `
				${days < 10 ? "0" + days : days} : 
				${hours < 10 ? "0" + hours : hours} : 
				${mins < 10 ? "0" + mins : mins} : 
				${sec < 10 ? "0" + sec : sec}
			`
			// stop & hide a whole section when finished
			if (period < 0) {
				clearInterval(coundown);
				counterContainer.style.display = "none";
			}
		}, 1000);
	}//if counter
	// end Sale Countdown

	//================
	// Blinking images
	//================
	let imgContainers = document.querySelectorAll(".blink-img")
	const blinkImages = () => {
			imgContainers.forEach(c => {
				let imgs = c.getElementsByTagName("img")
				if(imgs.length > 1){
					imgs[0].style.visibility = "hidden"
					setTimeout(() => {
						imgs[0].style.visibility = "visible"
					}, 2000)
				}
			})
	}
	if (imgContainers){
		setInterval(blinkImages, 4000)
	}
	// end Blinking images

})//DOMContentLoaded



//================
// jquery
//================

	//================
	// Swiper Slider for mobile only
	//================
	const isDesk = window.matchMedia("(min-width: 768px)");
	let slider;
	let swiperContClass = "swiper-container"
	let swiperWrapClass = "swiper-wrapper"
	let swiperPlaceholder = "swiper-container_mobile"

	isDesk.addListener(sliderSwitcher);

	function sliderSwitcher () {
		if (isDesk.matches) {
			disableSlider()
		} else {
			enableSlider()
		}
	}

	// Toggling multiple swiper instances
	function enableSlider () {
		addSliderClasses();
		slider = new Swiper(`.${swiperContClass}`, {
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
			setWrapperSize: true,
		});
	}

	function disableSlider () {
		if ( slider !== undefined ) {
			slider.forEach(sl => {
				sl.destroy();//should remove classes (as per doc) but .. 
				removeSliderClasses();// ..use this then
			})
		}
	}

	// Manage swiper classes not to interfere with styles on desk with slider disabled
	function addSliderClasses () {
		let containers = document.querySelectorAll(`.${swiperPlaceholder}`);
		if (containers){
			containers.forEach(c => {
			let wrapper = c.querySelector(".swiper-wrapper_mobile");
				wrapper.classList.add(swiperWrapClass)
				c.classList.add(swiperContClass)
			})
		}
	}

	function removeSliderClasses () {
		let containers = document.querySelectorAll(`.${swiperContClass}`);
		if (containers){
			containers.forEach(c => {
				let wrapper = c.querySelector(`.${swiperWrapClass}`);
				wrapper.classList.remove(swiperWrapClass)
				c.classList.remove(swiperContClass)
			})
		}
	}
//end Swiper

$(document).ready(function() {
	// Swiper
	if (document.querySelector(`.${swiperPlaceholder}`) !== null) {
		sliderSwitcher();
	}

	//================
	// Video in full-width sections (copypasted)
	//================
	if(document.getElementById('prefallmayVideoFrontage')) {

		var widthSilver = -1;

		function resizevideoPrefallmayHLSFresh(paramWindow) {
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
				hlsSilver.on(Hls.Events.MANIFEST_PARSED, function() {
						videoPrefallmay.play();
				});
			}
			// big lib comment was here
			else if (videoPrefallmay.canPlayType('application/vnd.apple.mpegurl')) {
					if (paramWindow.width() <= 767) {
							videoPrefallmay.src = videoSrcMobilePrefallmay;
					} else {
							videoPrefallmay.src = videoSrcDesktopPrefallmay;
					}
					videoPrefallmay.addEventListener('loadedmetadata', function() {
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
		}

		$(window).on("resize", function() {
			if (widthSilver == -1 || ($(this).width() <= 767 && widthSilver > 767) || ($(this).width() > 767 && widthSilver <= 767))
					resizevideoPrefallmayHLSFresh($(this));
			widthSilver = $(this).width();
		});

		resizevideoPrefallmayHLSFresh($(window));
	}//if Hls
	// end Video in full-width sections


});//document ready