
    async function validarCampos() {
        // Resto del código de validación...

        // Validar contraseñas
        if (!validarContrasena()) {
            return false;
        }

        try {
            const response = await fetch('/usuarios/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: document.getElementById('nombre').value,
                    documento: document.getElementById('documento').value,
                    telefono: document.getElementById('telefono').value,
                    correo: document.getElementById('correo').value,
                    usuario: document.getElementById('usuario').value,
                    contrasena: document.getElementById('contrasena').value,
                    confirm_contrasena: document.getElementById('confirm_contrasena').value,
                    rol: document.getElementById('rol').value,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Limpiar campos del formulario si es necesario
                document.getElementById('nombre').value = '';
                document.getElementById('documento').value = '';
                // Otros campos...

                // Mostrar mensaje de éxito
                document.getElementById('success').innerText = data.message;
            } else {
                // Mostrar mensaje de error en la página
                document.getElementById('error').innerText = data.message;
            }

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al enviar el formulario.');
        }

        return false; // Evitar que el formulario se envíe tradicionalmente
    }

