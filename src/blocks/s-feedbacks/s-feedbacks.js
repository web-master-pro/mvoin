$(document).ready(function(){

    var items = $(".s-feedbacks__video");
    var total_items = items.length;
    var active_items = 0;
    var items_per_update = 3;
    items.each(function(index,element) {
        if (index < items_per_update) {
            $(element).addClass("visible").fadeIn(100);
            active_items++;
        }
    });

    $(".s-feedbacks__button-more").click(function(e){
        e.preventDefault;
        if (total_items-active_items > 0) {
            var start_index = active_items;
            var count = 0;
            items.each(function(index,element) {
                if ((index >= start_index) && (count < items_per_update)) {
                    $(element).addClass("visible").fadeIn(1000);
                    count++;
                    active_items++;
                };
            });
        }
        if ((total_items - active_items) <= 0) {
            $(".s-feedbacks__button-more").fadeOut(500);
        };
        return false;
    });

});
