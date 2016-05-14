$(document).ready(function(){
    $(".contents__tab").click(function(e){
        e.preventDefault();
        var index = $(this).index();
        $(".contents__page")
            .fadeOut().removeClass("active")
            .eq(index).fadeIn(500).addClass("active");
        $(".contents__tab").removeClass("active");
        $(this).addClass("active");
    })


    function initThemes() {
        var items = $(".contents__page"),
            count = items.size(),
            item,
            answer;
        for (i = 0; i < count; i++) {
            item = items.eq(i);
            answer = $(item).find(".contents__videos");
            if ($(answer).length > 0){
                if (item.hasClass('active')) {
                    $(item).addClass("expanded");
                    $(answer).slideDown(100);
                };
            };
        };
    };

    if ($(window).width() <= 1000) {
        initThemes();
    }

    $(".contents__page-title").click(function (e) {
        var item = $(this).parent(".contents__page"),
            videos = $(item).find(".contents__videos"),
            isExpanded = $(item).hasClass("expanded"),
            result = true;

        if (($(videos).length > 0) && ($(window).width() <= 1000)){
            e.preventDefault();
            result = false;
            $(".contents__page").removeClass("expanded");
            $(".contents__page").find(".contents__videos").slideUp(500);
            if (!isExpanded) {
                $(item).addClass("expanded");
                $(videos).slideDown(500);
            };
        };
        return result;
    });

});
