function respuesta() {
    let nombre = document.getElementById("name")
    let mail = document.getElementById("email")
    let mensaje = document.getElementById("message")
    console.log(mail.validity.valid);
    if (nombre.value != "" && mail.validity.valid) {
        event.preventDefault()
        Swal.fire('GRACIAS por contactarnos !!! ... \nle responderemos a la brevedad ...')
        nombre.value = ""
        mail.value = ""
        mensaje.value = ""
    }
}
