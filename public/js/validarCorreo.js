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


async function validarCambio() {
    var correo = document.getElementById("email").value;
    var dominio = "@ucaldas.edu.co";
    var documento = document.getElementById("documento").value;

    if (documento === "" || correo === "") {
        alert("Debe llenar todos los campos");
        return false;
    }

    if (documento.length >= 11) {
        alert("El documento es muy largo");
        return false;
    }

    try {
        const result = await sql`
            SELECT * FROM personal_u 
            WHERE correo = ${correo} AND documento = ${documento};
        `;

        if (result.count > 0) {
            alert("Correo electrónico y documento válidos. Redirigiendo...");
            window.location.href = "/rcontrasena";
        } else {
            alert("Los datos no son correctos. Verifique su correo y documento.");
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error);
        alert("Ocurrió un error al validar los datos. Por favor, inténtelo de nuevo.");
    }
}









