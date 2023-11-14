function validarContrasena() {
   var password = document.getElementById("contrasena");
   var confirm_password = document.getElementById("confirm_contrasena");

   if (password.value !== confirm_password.value) {
       confirm_password.setCustomValidity("Las contraseñas no coinciden");
   } else {
       confirm_password.setCustomValidity('');
   }
}