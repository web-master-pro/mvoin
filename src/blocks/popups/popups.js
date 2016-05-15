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
        var popup = elem.attr("href"),
            popupID = $(popup).attr("id"),
            textarea = $(popup + " .popup-video__textarea");
        textarea.val(Cookies.get(popupID));
        if (textarea.val().length > 0) {
            textarea.next(".popup-video__placeholder").fadeOut();
        };
    };

    function saveVideoNote(elem) {
        var popup = elem.attr("href"),
            popupID = $(popup).attr("id"),
            textarea = $(popup + " .popup-video__textarea");
        Cookies.set(popupID, textarea.val(), {expires: 365})
    };

    $('.js-popup-video').magnificPopup({
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
                // return true;
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

    $('.js-order-button').click(function (){
        $.magnificPopup.open({
            items:{
                src:$('#form-order')
            },
            type:'inline',
            midClick: true,
            removalDelay: 500,
            mainClass: 'mfp-zoom-in',
            overflowY: 'scroll',
            fixedContentPos: false,
            callbacks: {
                close: function() {
                    validator.resetForm();
                }
            }
        });
	});

    var validator = $("#form-order").validate({
        rules: {
            name: {required: true},
            phone: {required: true}
        },
        messages: {
            name: {required: "Это поле должно быть заполнено"},
            phone: {required: "Это поле должно быть заполнено"}
        },
        focusInvalid: false,
        errorClass: "invalid-field",
        submitHandler: function(form) {
            form.preventDefault;
            $.ajax({
                type: "POST",
                url: $(form).attr("action"),
                data: $(form).serialize()
            }).done(function() {
                $.magnificPopup.open({
                    items:{
                        src:$('#popup-thankyou')
                    },
                    type:'inline',
                    midClick: true,
                    removalDelay: 500,
                    mainClass: 'mfp-zoom-in',
                    overflowY: 'scroll',
                    fixedContentPos: false
                });
                // yaCounter36986630.reachGoal("zaiavka");
            });
            return false;
        }
    });

    $("#form-order input" ).focus(function() {
        $(this).next(".invalid-field").addClass("hidden");
    });

    $("#form-order button").click(function (e) {
        $("#form-order .invalid-field").removeClass("hidden").css({"display":""});
        validator.resetForm();
        return true;
    });

    $(".js-close-button").click(function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        return false;
    });

});
