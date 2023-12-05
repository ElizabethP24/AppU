function validarCorreo() {
    var correo = document.getElementById("correo_institucional").value;
    var dominio = "@ucaldas.edu.co";

    if (correo === "") {
        alert("Por favor, ingrese su correo electrónico institucional.");
    } else if (correo.indexOf(dominio) === -1) {
        alert("Por favor, ingrese un correo electrónico válido.");
    } else {
        alert("Correo electrónico válido. Redirigiendo...");
        // Redirige al usuario a la página de registro.
        window.location.href = "/registro";
    }
}

function validarCorreoCambio() {
    var correo = document.getElementById("email").value;
    var dominio = "@ucaldas.edu.co";
    var documento = document.getElementById("documento").value;

    if (documento === "" || correo === "") {
        alert("debe de llenar todos los campos")
        return false;
    }

    if (documento.length >= 11) {
        alert("el documento es muy largo")
        return false;
    }
    else if (correo.indexOf(dominio) === -1) {
        alert("Por favor, ingrese un correo electrónico válido.");
    } else {
        alert("Correo electrónico válido. Redirigiendo...");
        window.location.href = "/rcontrasena";
    }
}



/*------------------ENVIAR CODIGO AL CORREO PARA RECUPERACION*/









