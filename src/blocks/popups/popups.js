$(document).ready(function(){

    $('.js-popup').magnificPopup({
        type:'inline',
        midClick: true,
        removalDelay: 500,
        mainClass: 'mfp-zoom-in',
        overflowY: 'scroll',
        fixedContentPos: false
    });

    function initVideoNote(elem) {
        var elemNumber = $(".js-popup-video").index(elem) + 1,
            cookieName = "popup-video-" + elemNumber,
            title = elem.text(),
            textarea = $(".popup-video__textarea");
        $(".popup-video__title").text(title);
        $(".popup-video__video").attr("src",elem.attr("href") + "?rel=0&amp;showinfo=0");
        textarea.val(Cookies.get(cookieName));
        if (textarea.val().length > 0) {
            textarea.next(".popup-video__placeholder").fadeOut();
        };
    };

    function saveVideoNote(elem) {
        var elemNumber = $(".js-popup-video").index(elem) + 1,
            cookieName = "popup-video-" + elemNumber,
            textarea = $(".popup-video__textarea");
        Cookies.set(cookieName, textarea.val(), {expires: 365});
    };

    $('.js-popup-video').magnificPopup({
        items:{
            src:$('#popup-video')
        },
        type:'inline',
        midClick: true,
        removalDelay: 500,
        mainClass: 'mfp-zoom-in',
        overflowY: 'scroll',
        fixedContentPos: false,
        callbacks: {
            open: function() {
                var magnificPopup = $.magnificPopup.instance,
                    item = magnificPopup.st.el;
                initVideoNote(item);
            },
            beforeClose: function() {
                var magnificPopup = $.magnificPopup.instance,
                    item = magnificPopup.st.el;
                saveVideoNote(item);
            }
          }
    });

    $('.js-popup-privacy').magnificPopup({
        type:'inline',
        midClick: true,
        removalDelay: 500,
        mainClass: 'mfp-zoom-in',
        overflowY: 'scroll'
    });

    $(".popup-video__textarea")
        .focus(function() {
            $(this).next(".popup-video__placeholder").fadeOut(300);
        })
        .blur(function() {
            if ($(this).val().length == 0) {
                $(this).next(".popup-video__placeholder").fadeIn(300);
            }
        });

    $(".popup-video__placeholder").click(function(){
        $(this).fadeOut(300);
        $(this).prev(".popup-video__textarea").focus();
    })

    $(".popup-order__button").on("click", function(){
        var res = true;
        if (!$("#popup-order-checkbox-1").is(':checked')) {
            $("#popup-order-error-1").fadeIn(500);
            res = false;
        };
        if (!$("#popup-order-checkbox-2").is(':checked')) {
            $("#popup-order-error-2").fadeIn(500);
            res = false;
        };
        if (res) {
            document.location.href = $(this).attr("data-href");
        }
    })

    $('.popup-order__checkbox').change(function() {
        if($(this).is(":checked")) {
            $(this).next().next(".popup-order__error").fadeOut(500);
        }
    });

    $(".js-close-button").click(function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        return false;
    });

});
