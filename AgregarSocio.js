// VARIABLES
const Formulario = document.getElementById("FormRegister");
const Nombre = document.getElementById("IptNombre");
const Apellido = document.getElementById("IptApellido");
const Dni = document.getElementById("IptDni");
const FechaNacimiento = document.getElementById("IptFechaNacimiento");
const Bloques = document.getElementById("IptBloques");
const FiltroBloques = document.getElementById("IptFilterBloques");
const FiltroCategoria = document.getElementById("IptFilterCategoria");
const FiltroNombre = document.getElementById("IptFilterNombre");
const FiltroApellido = document.getElementById("IptFilterApellido");
const FiltroDNI = document.getElementById("IptFilterDNI");
const FiltroFechaNacimiento = document.getElementById("IptFilterFechaNacimiento");
const Tabla = document.getElementById("TableBody");
let Data = JSON.parse(localStorage.getItem("DataSocios")) || [];

// FUNCIONES
mostrarDatos();

// Función para quitar acentos de una cadena
function quitarAcentos(cadena) {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function guardarNuevoSocio() {
    const bloquesValue = document.getElementById("IptBloques").value;
    const name = Nombre.value;
    const apellido = Apellido.value;
    const dni = Dni.value;
    const categoriaFutbol = document.getElementById("IptCategoriaFutbol").value;
    const fechaNacimientoValue = document.getElementById("IptFechaNacimiento").value;
    const FechaInscripcion = new Date();
    const fechaActual = FechaInscripcion.toLocaleDateString();

    if (dni.length > 0 && name.length > 0 && apellido.length > 0) {
        const newData = {
            bloques: bloquesValue,
            name,
            apellido,
            dni,
            fechaInicio: fechaActual,
            categoriaFutbol,
            fechaNacimiento: fechaNacimientoValue,
        };
        Data.push(newData);

        guardarDatos();
        mostrarDatos();
        Formulario.reset();
    }
}

function guardarDatos() {
    localStorage.setItem("DataSocios", JSON.stringify(Data));
}

function mostrarDatos() {
    Tabla.innerHTML = "";

    const filterBloques = FiltroBloques.value.toLowerCase();
    const filterCategoria = FiltroCategoria.value.toLowerCase();
    const filterNombre = FiltroNombre.value.toLowerCase();
    const filterApellido = FiltroApellido.value.toLowerCase();
    const filterDNI = FiltroDNI.value.toLowerCase();
    const filterFechaNacimiento = FiltroFechaNacimiento.value.toLowerCase();

    const sociosFiltrados = Data.filter(function (item) {
        if (Data) {
            return (
                item.bloques.toLowerCase().includes(filterBloques) &&
                item.categoriaFutbol.toLowerCase().includes(filterCategoria) &&
                item.name.toLowerCase().includes(filterNombre) &&
                item.apellido.toLowerCase().includes(filterApellido) &&
                item.dni.toLowerCase().includes(filterDNI) &&
                item.fechaNacimiento.toLowerCase().includes(filterFechaNacimiento)
            );
        } else{
            console.log("No hay DATOS")
        }
    });

    sociosFiltrados.forEach(function (item, index) {
        const row = document.createElement("tr");
        const bloqueCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const surnameCell = document.createElement("td");
        const dniCell = document.createElement("td");
        const categoriaFutbolCell = document.createElement("td");
        const fechaNacimientoCell = document.createElement("td");
        const dateCell = document.createElement("td");
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        const cancelButton = document.createElement("button");
        const confirmButton = document.createElement("button");

        bloqueCell.textContent = item.bloques;
        nameCell.textContent = `${item.name}`;  // Agregamos el número al nombre
        surnameCell.textContent = item.apellido;
        dniCell.textContent = item.dni;
        categoriaFutbolCell.textContent = item.categoriaFutbol;

        // Supongamos que item.fechaNacimiento tiene el formato "00-00-0000"
        const fechaNacimientoSinGuiones = new Date(item.fechaNacimiento).toLocaleDateString()
        // Ahora fechaNacimientoSinGuiones tendrá el formato "00/00/0000"
        fechaNacimientoCell.textContent = fechaNacimientoSinGuiones;
        
        dateCell.textContent = item.fechaInicio;

        deleteButton.textContent = "Eliminar";
        cancelButton.textContent = "Cancelar";
        confirmButton.textContent = "Confirmar";

        cancelButton.style.display = "none";
        confirmButton.style.display = "none";

        deleteButton.classList.add("button", "button--terciary");
        cancelButton.classList.add("button", "button--terciary");
        confirmButton.classList.add("button", "button--secondary");

        deleteButton.addEventListener("click", function () {
            cancelButton.style.display = "inline";
            confirmButton.style.display = "inline";
            deleteButton.style.display = "none";
        });

        cancelButton.addEventListener("click", function () {
            cancelButton.style.display = "none";
            confirmButton.style.display = "none";
            deleteButton.style.display = "inline";
        });

        confirmButton.addEventListener("click", function () {
            eliminarData(item);
        });

        actionCell.appendChild(deleteButton);
        actionCell.appendChild(cancelButton);
        actionCell.appendChild(confirmButton);

        row.appendChild(bloqueCell);
        row.appendChild(nameCell);
        row.appendChild(surnameCell);
        row.appendChild(dniCell);
        row.appendChild(categoriaFutbolCell);
        row.appendChild(fechaNacimientoCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);
        Tabla.appendChild(row);
    });
}

function eliminarData(item) {
    const confirmar = true;

    if (confirmar) {
        const index = Data.indexOf(item);
        Data.splice(index, 1);
        guardarDatos();
        mostrarDatos();
    }
}

function filtrarSocios() {
    mostrarDatos();
}

var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }
})()








/*function exportarTablaWord() {
    // Obtener la información de la tabla
    const tabla = document.getElementById("TableBody");

    // Crear un contenedor div temporal para el contenido de la tabla
    const contenidoTabla = document.createElement('div');
    contenidoTabla.innerHTML = `
        <div>
        <img src="logo.png" alt="Logo" style="width: 100px; height: auto; margin-bottom: 10px;">
        <h1>Argentino junior Club</h1>
        <h1>Lista de jugadores</h1>
            <table>
                <thead>
                    <tr>
                        <th>Bloques</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Categoría de Fútbol</th>
                        <th>Fecha de Nacimiento</th>
                    </tr>
                </thead>
                <tbody>
                    ${tabla.innerHTML}
                </tbody>
            </table>
        </div>
    `;

    // Eliminar las columnas no deseadas (Eliminar y Fecha de Inscripción)
    const filas = contenidoTabla.querySelectorAll('tbody tr');
    filas.forEach(fila => {
        fila.removeChild(fila.lastElementChild); // Eliminar última celda (Eliminar)
        fila.removeChild(fila.lastElementChild); // Eliminar penúltima celda (Fecha de Inscripción)
    });

    // Convertir el contenido HTML a formato .docx
    const content = contenidoTabla.innerHTML;
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });

    // Crear un enlace y descargar el archivo .docx
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "ListaSocios.docx";
    link.click();
}*/




