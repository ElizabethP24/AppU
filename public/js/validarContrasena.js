function validarContrasena() {
    var contrasena = document.getElementById("contrasena").value;
    var confirmContrasena = document.getElementById("confirm_contrasena").value;
    var errorContainer = document.getElementById("error_container");

    if (contrasena !== confirmContrasena) {
        alert("las contraseñas no coinciden ")
        return false;
    } else {
        return true;
    }
}

