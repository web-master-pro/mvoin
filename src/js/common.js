$(document).ready(function() {

    $(".js-scrollto, .nav__menu-link").click(function () {
        elementClick = $(this).attr("href")
        destination = $(elementClick).offset().top - 70;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1700);
        return false;
    });

    $('.js-popup-youtube').magnificPopup({
        disableOn: 100,
        type: 'iframe',
        removalDelay: 500,
        mainClass: 'mfp-zoom-in',
        preloader: false,
        fixedContentPos: false
	});

    $('.js-phone-field').mask('+7 (999) 999-99-99');

    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        $('html').addClass('safari');
    };

    if (navigator.userAgent.search("MSIE") >= 0) {
        $('html').addClass('ie');
    };

    $("img, a").on("dragstart", function(event) { event.preventDefault(); });

    var wow = new WOW({
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
    });
    wow.init();

});
