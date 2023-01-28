$(document).ready(function(){

//download pdf jump to form
$(".download-pdf .yell-button").click(function(){
	var anchor = $(this.hash);
	$('html,body').animate({
          scrollTop: anchor.offset().top-50
        }, 500);

});

// slider 
  $(".report-slider").slick({
    slidesToScroll: 1,
    infinite: true,
    arrows:true,
    prevArrow: '<div class="yell-button nav prev"></div>',
    nextArrow: '<div class="yell-button nav next"></div>',
    dots:true,
    speed: 1000,
    slidesToShow: 1,
    
  });
//slide title
$('.report-slider').on('afterChange', function(event, slick, currentSlide){
	var slideTitle = $(".slick-current").data('title');
	$('.slide-title').text(slideTitle);
});
      
//up
$('.up-button').click(function(){
		$('html, body').animate({scrollTop : 0},500);
		return false;
});


//debug
var cWidth = $(document).width();
$('.banks-intro').append('<div class="wsize">' + 'js: ' + cWidth + '</div>');


});

