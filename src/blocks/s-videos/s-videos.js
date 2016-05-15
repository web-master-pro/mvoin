$(document).ready(function(){

    function initThemes() {
        var items = $(".videos__page"),
            count = items.size(),
            item,
            answer;
        for (i = 0; i < count; i++) {
            item = items.eq(i);
            answer = $(item).find(".videos__videos");
            if ($(answer).length > 0){
                if (item.hasClass('active')) {
                    $(item).addClass("expanded");
                    $(answer).slideDown(100);
                };
            };
        };
    };

    initThemes();

    $(".videos__page-title").click(function (e) {
        var item = $(this).parent(".videos__page"),
            videos = $(item).find(".videos__videos"),
            isExpanded = $(item).hasClass("expanded"),
            result = true;

        if ($(videos).length > 0){
            e.preventDefault();
            result = false;
            $(".videos__page").removeClass("expanded");
            $(".videos__page").find(".videos__videos").slideUp(500);
            if (!isExpanded) {
                $(item).addClass("expanded");
                $(videos).slideDown(500);
            };
        };
        return result;
    });

});
