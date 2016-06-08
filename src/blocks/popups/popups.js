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

    $(".form-order__button").on("click", function(e){
        var result = true,
            email = $('#form-order [name="email"]');

        function isValidEmailAddress(emailAddress) {
            return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( emailAddress );
        };

        if (!email.val()) {
            $("#form-order-error-email").text("Это поле должно быть заполнено").fadeIn(500);
            result = false;
        }  else if (!isValidEmailAddress(email.val())) {
            $("#form-order-error-email").text("Неправильный формат Email").fadeIn(500);
            result = false;
        };
        if (!$("#form-order-checkbox-1").is(':checked')) {
            $("#form-order-error-1").fadeIn(500);
            result = false;
        };
        if (!$("#form-order-checkbox-2").is(':checked')) {
            $("#form-order-error-2").fadeIn(500);
            result = false;
        };

        if (result) {
            yaCounter37405830.reachGoal("start_pay");
        }

        return result;
    });

    $('.form-order__input').focus(function() {
        $(this).next(".form-order__error").fadeOut(500);
    });

    $('.form-order__checkbox').change(function() {
        if($(this).is(":checked")) {
            $(this).next().next(".form-order__error").fadeOut(500);
        }
    });

    $(".js-close-button").click(function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        return false;
    });

});
