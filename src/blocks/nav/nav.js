$(window).scroll(function() {

	var h = $(".header").height() + $(".nav").height();

	if ( ($(this).scrollTop() > h) && (!$(".nav").hasClass("nav--fixed")) ) {
		$(".nav").fadeOut(0);
		$(".nav").addClass("nav--fixed");
		$(".nav").fadeIn(1500);
	};

	if ( ($(this).scrollTop() < h) && ($(".nav").hasClass("nav--fixed")) ) {
		$(".nav").removeClass("nav--fixed");
	};

});
