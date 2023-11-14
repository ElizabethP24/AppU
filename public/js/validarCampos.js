function validarNombre(nombre) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(nombre);
}

function validarUsuario(usuario) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(usuario);
}

function validarTelefono(telefono) {
    var regex = /^[0-9]+$/;
    return regex.test(telefono);
}

function validarCorreo(correo) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(correo);
}