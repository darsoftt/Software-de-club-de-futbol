function GuardarMerca() {
    var nombre = document.getElementById("Nombre").value;
    var descripcion = document.getElementById("descripcion").value;

    var DatosGuardados = JSON.parse(localStorage.getItem("Merca")) || [];

    DatosGuardados.push({nombre: nombre, descripcion: descripcion});

    localStorage.setItem("Merca", JSON.stringify(DatosGuardados));

    document.getElementById("Nombre").value = "";
    document.getElementById("descripcion").value = "";

    MostrarMerca();
}

function EliminarMerca(index){
    var DatosGuardados = JSON.parse(localStorage.getItem("Merca")) || [];
    DatosGuardados.splice(index, 1);
    localStorage.setItem("Merca", JSON.stringify(DatosGuardados));
    MostrarMerca();
}

function MostrarMerca(){
    var tabla = document.getElementById("tablaMerca");

    var DatosGuardados = JSON.parse(localStorage.getItem("Merca")) || [];

    tabla.innerHTML = "";

    DatosGuardados.forEach(function(dato, index){
        var fila = tabla.insertRow();
        var celdaNombre = fila.insertCell(0);
        var celdadescripcion = fila.insertCell(1);
        var celdaeliminar = fila.insertCell(2);

        celdaNombre.innerHTML = dato.nombre;
        celdadescripcion.innerHTML = dato.descripcion;

        var botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.onclick = function(){
            EliminarMerca(index);
        };

        celdaeliminar.appendChild(botonEliminar);
    });
}

MostrarMerca();
