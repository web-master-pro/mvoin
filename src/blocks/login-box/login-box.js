$(document).ready(function(){

    $(".form-login__pass-link").click(function(e){
        var recovery = $("#form-recovery");
        e.preventDefault();
        if (recovery.hasClass("on")) {
            recovery.removeClass("on").slideUp(300);
        } else {
            recovery.addClass("on").slideDown(300);
        };
        return true;
    });

    var validatorLogin = $("#form-login").validate({
        rules: {
            login: {required: true, email: true},
            password: {required: true}
        },
        messages: {
            login: {required: "Это поле должно быть заполнено", email: ""},
            password: {required: "Это поле должно быть заполнено"}
        },
        focusInvalid: false,
        errorClass: "invalid-field",
        submitHandler: function(form) {
            // yaCounterXXXXXXXX.reachGoal("zaiavka");
            return true;
        }
    });

    $("#form-login input" ).focus(function() {
        $(this).next(".invalid-field").addClass("hidden");
    });

    $("#form-login button").click(function (e) {
        $("#form-login .invalid-field").removeClass("hidden").css({"display":""});
        validatorLogin.resetForm();
        return true;
    });

    var validatorRecovery = $("#form-recovery").validate({
        rules: {
            email: {required: true, email: true}
        },
        messages: {
            email: {required: "Это поле должно быть заполнено", email: "Неправильный формат Email"}
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
                        src:$('#popup-recovery-ok')
                    },
                    type:'inline',
                    midClick: true,
                    removalDelay: 500,
                    mainClass: 'mfp-zoom-in',
                    overflowY: 'scroll',
                    fixedContentPos: false
                });
            });
            return false;
        }
    });

    $("#form-recovery input" ).focus(function() {
        $(this).next(".invalid-field").addClass("hidden");
    });

    $("#form-recovery button").click(function (e) {
        $("#form-recovery .invalid-field").removeClass("hidden").css({"display":""});
        validatorRecovery.resetForm();
        return true;
    });

});
