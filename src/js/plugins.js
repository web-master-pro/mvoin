// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

//= ../bower/jquery/dist/jquery.js
//= ../bower/jquery-validation/dist/jquery.validate.js
//= ../bower/jquery.maskedinput/dist/jquery.maskedinput.js
//= ../bower/magnific-popup/dist/jquery.magnific-popup.js
//= ../bower/slick-carousel/slick/slick.min.js
//= ../bower/page-scroll-to-id/jquery.malihu.PageScroll2id.js
//= ../bower/smoothscroll-for-websites/SmoothScroll.js
//= ../bower/wow/dist/wow.js
//= ../bower/device.js/device.js
