function validarContrasena() {
    var contrasena = document.getElementById("contrasena").value;
    var confirm_contrasena = document.getElementById("confirm_contrasena").value;

    if (contrasena == confirm_contrasena) {
        // Mostrar mensaje indicando que las contraseñas coinciden
        document.getElementById("error").innerHTML = "Las contraseñas coinciden";
        document.getElementById("error").style.color = "green";
    } else {
        // Mostrar mensaje de error indicando que las contraseñas no coinciden
        document.getElementById("error").innerHTML = "Las contraseñas no coinciden";
        document.getElementById("error").style.color = "red";
    }
}