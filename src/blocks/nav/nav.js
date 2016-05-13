$(window).scroll(function() {

	var hh = $(".header").height(),
        hn = $(".nav").height();

	if ( ($(this).scrollTop() > (hh + hn)) && (!$(".nav").hasClass("nav--fixed")) ) {
		$(".nav").fadeOut(0);
		$(".nav").addClass("nav--fixed");
		$(".nav").fadeIn(1500);
	};

	if ( ($(this).scrollTop() < hh) && ($(".nav").hasClass("nav--fixed")) ) {
		$(".nav").removeClass("nav--fixed");
	};

});
