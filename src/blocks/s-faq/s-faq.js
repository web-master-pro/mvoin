$(document).ready(function() {

    function initFaq() {
        var items = $(".s-faq__item"),
            count = items.size(),
            item,
            answer;
        for (i = 0; i < count; i++) {
            item = items.eq(i);
            answer = $(item).find(".s-faq__answer");
            if ($(answer).length > 0){
                if (item.hasClass('active')) {
                    $(item).addClass("expanded");
                    $(answer).slideDown(100);
                };
            };
        };
    };

    initFaq();

    $(".s-faq__question").click(function (e) {
        var item = $(this).parent(".s-faq__item"),
            answer = $(item).find(".s-faq__answer"),
            isExpanded = $(item).hasClass("expanded"),
            result = true;
        if ($(answer).length > 0){
            e.preventDefault();
            result = false;
            $(".s-faq__item").removeClass("expanded");
            $(".s-faq__item").find(".s-faq__answer").slideUp(500);
            if (!isExpanded) {
                $(item).addClass("expanded");
                $(answer).slideDown(500);
            };
        };
        return result;
    });

});
