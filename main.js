$.noConflict()

jQuery(document).ready(function ($) {
    $('#welcome').text('Xin chào Việt Nam')
        .addClass('text-success text-center')

    $('.form-group').mouseenter(function () {
        $('.form-group').toggleClass('bg-danger-subtle bg-info-subtle')
    })

    $('.form-group').mouseleave(function () {
        $('.form-group').toggleClass('bg-danger-subtle bg-info-subtle')
    })

    $("#name").keypress(function () {
        $(".error_username").text('')
    })

    $("#email").keypress(function () {
        $(".error_email").text('')
    })

    $("#password").keypress(function () {
        $(".error_password").text('')
    })
    
    $("#confirm_password").keypress(function () {
        $(".error_cfpassword").text('')
    })

    var emailCheck = /^\S+@\S+\.\S+$/
    $('.form-group').submit(function (e) {
        e.preventDefault()

        var isValid = true

        if ($('#name').val() === "") {
            $(".error_username").text('Username is required')
            isValid = false
        }

        if ($('#email').val() === "") {
            $(".error_email").text('Email is required')
            isValid = false
        } else if (!emailCheck.test($('#email').val())) {
            $(".error_email").text('Invalid email')
            isValid = false
        }

        if ($('#password').val() === "") {
            $(".error_password").text('Password is required')
            isValid = false
        }

        if ($('#confirm_password').val() === "") {
            $(".error_cfpassword").text('Confirm password is required')
            isValid = false
        } else if ($('#password').val() !== $('#confirm_password').val()) {
            $(".error_cfpassword").hide().text('Confirm password does not match password').fadeIn(600)
            isValid = false
        }

        if (isValid) {
            $.ajax({
                url: 'http://127.0.0.1:8000/api/register',
                type: 'POST',
                data: {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    password: $('#password').val(),
                    confirm_password: $('#confirm_password').val(),
                },
                success: function (response) {
                    console.log('Server response:', response);
                    if (response.success) {
                        $('.form-group').after('<div class="alert alert-success"> ' + response.message + '</div>')
                        $('.form-group').slideUp(1000, function () {

                            setTimeout(function() {
                                $('.form-group').slideDown(1000)
                            }, 2000)
                        })
                    }
                }
            })
        }
    })
})
