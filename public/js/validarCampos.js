function validarCampos() {
    var nombre, documento, direccion, telefono, correo, expresion_correo, programa, usuario, expresion_solo_texto;

    nombre = document.getElementById("nombre").value;
    documento = document.getElementById("documento").value;
    direccion = document.getElementById("direccion").value;
    telefono = document.getElementById("telefono").value;
    correo = document.getElementById("correo").value;
    programa = document.getElementById("programa").value;
    usuario = document.getElementById("programa").value;
    expresion_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expresion_solo_texto = /^[A-Za-zÁáÉéÍíÓóÚúñÑ\s]+$/;
    var contrasena = document.getElementById("contrasena").value;
    var confirm_contrasena = document.getElementById("confirm_contrasena").value;

    if (nombre === "" || documento === "" || direccion === "" || telefono === "" || correo === "") {
        alert("debe rellenar todos los campos")
        return false;
    }
    else if (!expresion_solo_texto.test(nombre)) {
        alert("Ingrese solo valores de texto en el nombre")
        return false;
    }
    else if (documento.length >= 11) {
        alert("el documento es muy largo")
        return false;
    }
    else if (direccion.length >= 60) {
        alert("la direccion es muy larga ")
        return false;
    }
    else if (telefono.length >= 10) {
        alert("el telefono es muy largo")
        return false;
    }
    else if (isNaN(telefono)) {
        alert("ingrese un valor numerico en el telefono")
        return false;
    }
    else if (isNaN(documento)) {
        alert("ingrese un valor numerico en el documento")
        return false;
    }
    else if (!expresion_correo.test(correo)) {
        alert("ingrese un correo valido")
        return false;
    }
    else if (!expresion_solo_texto.test(programa)) {
        alert("Ingrese solo valores de texto en el programa ")
        return false;
    }
    else if (!expresion_solo_texto.test(usuario)) {
        alert("Ingrese solo valores de texto en el usuario")
        return false;
    }




}



