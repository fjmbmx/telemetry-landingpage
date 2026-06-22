
$(document).ready(function () {

    $('#form_saved_data_contact').on('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        $(this).addClass('was-validated');

        if (!event.target.checkValidity()) {
            return;
        }

        var prospect_name = $("#prospect_name").val();
        var prospect_contact = $("#prospect_contact").val();
        var prospect_subject = $("#prospect_subject").val();
        var prospect_message = $("#prospect_message").val();

        $.ajax({
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({
                "prospect_name": prospect_name,
                "prospect_contact": prospect_contact,
                "prospect_subject": prospect_subject,
                "prospect_message": prospect_message
            }),
            type: "POST",
            dataType: 'json',
            url: "core/email/enviocorreo.php",

            success: function (response) {
                console.log(response);

                if (response.hasOwnProperty('status')) {
                    if (response.status == '200') {
                        $('#form_saved_data_contact')
                            .trigger("reset")
                            .removeClass('was-validated');
                        swal("¡Muy bien!", "En breve nos pondremos en contacto con usted.", "success");
                    } else {
                        swal("Inténtelo más tarde", "No se ha podido enviar el mensaje.", "warning");
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown + ': ' + textStatus);
                swal("Inténtelo más tarde", "Ocurrió un error al enviar el mensaje.", "warning");
            }
        });
    });
});
