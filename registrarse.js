function registros() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    // Obtiene las cuentas existentes o inicializa un nuevo array
    const datosGuardados = JSON.parse(localStorage.getItem("Cuentas")) || [];

    // Verifica si se ha alcanzado el límite de 3 usuarios
    if (datosGuardados.length >= 3) {
        mostrarMensajeError("Se ha alcanzado el límite de 3 usuarios registrados.");
        return;
    }

    // Registra el nuevo usuario
    const fechaCreacion = new Date();
    const nuevoUsuario = {
        usuario: usuario,
        contraseña: contraseña,
        fechaCreacion: fechaCreacion.toISOString(),
    };

    // Agrega el nuevo usuario a la lista
    datosGuardados.push(nuevoUsuario);

    // Guarda la lista actualizada en el almacenamiento local
    localStorage.setItem("Cuentas", JSON.stringify(datosGuardados));

    // Redirige al usuario a la página de inicio de sesión
    location.href = "Login.html";
}

function mostrarMensajeError(mensaje) {
    // Obtiene el elemento del mensaje de error
    const mensajeError = document.getElementById("mensajeError");

    // Si el elemento existe, actualiza su contenido y estilo
    if (mensajeError) {
        mensajeError.innerText = mensaje;
        mensajeError.style.color = "red";
        mensajeError.style.display = "block";  // Muestra el mensaje
    }
}