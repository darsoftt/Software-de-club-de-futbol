function aceptar() {
    const Usuario = document.getElementById("usuario");
    const Contraseña = document.getElementById("contraseña");

    if (!Usuario || !Contraseña) {
        console.error("No se encontraron elementos de usuario o contraseña.");
        return;
    }

    const Cuentas = JSON.parse(localStorage.getItem('Cuentas')) || [];

    // Verifica si las credenciales coinciden con alguna cuenta
    const cuentaEncontrada = Cuentas.find(element => {
        return Usuario.value === element.usuario && Contraseña.value === element.contraseña;
    });

    if (cuentaEncontrada) {
        localStorage.setItem("rolActivo", cuentaEncontrada.rol);
        localStorage.setItem("nombreActivo", cuentaEncontrada.user);

        // Redirige al usuario a la página de inicio después de iniciar sesión
        location.href = "AgregarSocio.html";
    } else {
        mostrarMensajeError("Credenciales incorrectas. Inténtelo de nuevo.");
    }

    function mostrarMensajeError(mensaje) {
        const mensajeError = document.getElementById("mensajeError");

        if (mensajeError) {
            mensajeError.innerText = mensaje;
            mensajeError.style.color = "red";
        }
    }
}

function registro() {
    location.href = "registrarse.html";
}