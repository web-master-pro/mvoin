$(document).ready(function(){
    var mmenu = $(".nav__menu");
    $(".mmenu-trigger").on("click", function(){
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            mmenu.slideUp();
        } else {
            $(this).addClass("on");
            mmenu.slideDown();
        }
    });
});
