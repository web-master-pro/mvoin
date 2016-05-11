$(document).ready(function(){

    $('.js-popup').magnificPopup({
        type:'inline',
        midClick: true,
        removalDelay: 500,
        mainClass: 'mfp-zoom-in',
        overflowY: 'scroll'
    });

    $('.js-order-button').click(function (){
        $.magnificPopup.open({
            items:{
                src:$('#form-order')
                // src:$('#popup-thankyou')
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
