function cargarUsuariosEnSelect() {
    var usuarios = JSON.parse(localStorage.getItem("DataSocios")) || [];

    var selectElement = document.getElementById("name"); // El select en la página de ventas

    // Crea una opción por cada usuario en el arreglo
    usuarios.forEach(function (usuario, index) {
        var option = document.createElement("option");
        option.value = index; // Puedes usar un valor específico si lo necesitas
        option.text = usuario.name + ' ' + usuario.apellido; // Puedes ajustar cómo se muestra el usuario
    });
}

// Llama a la función para cargar los usuarios en el select cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", cargarUsuariosEnSelect);