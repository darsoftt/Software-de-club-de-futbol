// VARIABLES LOCAL STORAGE
let DataSocios = JSON.parse(localStorage.getItem("DataSocios")) || [];
let DataVenta = JSON.parse(localStorage.getItem("venta")) || [];

// FUNCIONES QUE VAN AFUERA DEL CODIGO
mostrarVentas();

// FUNCION PARA GUARDAR LAS VENTAS
function GuardarVenta() {
    //OBTENER LOS VALORES DE LOS INPUTS
    var mercaderia = document.getElementById("selectMercaderia").value
    var cantidadMercaderia = document.getElementById("cantidadMercaderia").value
    var precioMercaderia = document.getElementById("precioMercaderia").value
    var cuota = document.getElementById("selectCuota").value
    var precioCuota = document.getElementById("precioCuota").value
    var seguro = document.getElementById("selectSeguro").value
    var precioSeguro = document.getElementById("precioSeguro").value
    var nombreSocio = document.getElementById("socioNombre").value
    var dniSocio = document.getElementById("socioDNI").value
    var formaPago = document.getElementById("formaDePago").value
    var descripcionVenta = document.getElementById("descripcionVenta").value
    var fechaVenta = new Date()
    console.log(mercaderia)
    //BUSCAR EL SOCIO EN "DataSocios" PARA OBTENER LOS DATOS DE ESTE
    var socioEncontrado = DataSocios.find(socio => socio.name === nombreSocio || socio.dni === dniSocio)
    //GUARDAR LOS DATOS OBTENIDOS EN EL LOCAL STORAGE "venta" A PARTIR DE UNA CONDICION
    if (socioEncontrado) {
        //SUMAR EL TOTAL DE LAS CUOTAS,MERCADERIA Y SEGUROS 
        var totalMercaderia = cantidadMercaderia * precioMercaderia
        var totalCuota = cuota * precioCuota
        var totalSeguro = seguro * precioSeguro
        var totalVenta = totalMercaderia + totalCuota + totalSeguro
        //AGREGAR AL LOCAL STORAGE
        var newDataVenta =
        {
            fechaVenta: fechaVenta,
            nombreSocio: socioEncontrado.name,
            apellidoSocio: socioEncontrado.apellido,
            dniSocio: socioEncontrado.dni,
            mercaderia: mercaderia,
            cantidadMercaderia: cantidadMercaderia,
            totalMercaderia: totalMercaderia,
            cuota: cuota,
            totalCuota: totalCuota,
            seguro: seguro,
            totalSeguro: totalSeguro,
            total: totalVenta,
            formaDePago: formaPago,
            descripcion: descripcionVenta 
        }
        DataVenta.push(newDataVenta)
        localStorage.setItem("venta", JSON.stringify(DataVenta))
        //BUSCAR AL SOCIO EN DataSocio Y EDITAR LA cuota CON LA CONDICION DE QUE cuota NO ESTE VACIO
        const socioAEditarCuota = DataSocios.find(socio => socio.name === nombreSocio || socio.dni === dniSocio)
        if (socioAEditarCuota) {

            if (cuota != "" && !socioAEditarCuota.ultimoPagoCuota) {
                const ultimaFechaCuota = new Date()
                ultimaFechaCuota.setMonth(ultimaFechaCuota.getMonth() + parseInt(cuota))

                socioAEditarCuota.cuota = cuota
                socioAEditarCuota.ultimoPagoCuota = new Date()
                socioAEditarCuota.vencimientoCuota = ultimaFechaCuota
                socioAEditarCuota.formaDePago = formaPago
                localStorage.setItem("DataSocios", JSON.stringify(DataSocios))

            } else if (cuota != "" && socioAEditarCuota.ultimoPagoCuota) {

                const ultimaFechaCuota = new Date(socioAEditarCuota.vencimientoCuota)
                ultimaFechaCuota.setMonth(ultimaFechaCuota.getMonth() + parseInt(cuota))

                console.log(ultimaFechaCuota.toLocaleDateString())

                socioAEditarCuota.cuota = cuota
                socioAEditarCuota.vencimientoCuota = ultimaFechaCuota
                socioAEditarCuota.ultimoPagoCuota = fechaVenta
                localStorage.setItem("DataSocios", JSON.stringify(DataSocios))
            }

        } else {
            console.log("SOCIO NO ENCONTRADO")
        }
    }
    mostrarVentas()
    var mercaderia = document.getElementById("selectMercaderia").value = "";
    var cantidadMercaderia = document.getElementById("cantidadMercaderia").value = "";
    var precioMercaderia = document.getElementById("precioMercaderia").value = "";
    var cuota = document.getElementById("selectCuota").value = "";
    var precioCuota = document.getElementById("precioCuota").value = "";
    var seguro = document.getElementById("selectSeguro").value = "";
    var precioSeguro = document.getElementById("precioSeguro").value = "";
    var nombreSocio = document.getElementById("socioNombre").value = "";
    var dniSocio = document.getElementById("socioDNI").value = "";
    var formaPago = document.getElementById("formaDePago").value = "";
    var descripcionVenta = document.getElementById("descripcionVenta").value = "";
    // Después de guardar la venta, agregar el botón de impresión
    var imprimirBtn = document.createElement("button");
    imprimirBtn.textContent = "Imprimir Recibo";
    imprimirBtn.className = "button button--primary";
    imprimirBtn.addEventListener("click", function () {
        imprimirRecibo(newDataVenta); // Invoca la función de impresión pasando los datos del recibo
    });
    // Agrega el botón a tu contenedor de botones o donde desees mostrarlo
    var contenedorBotonImprimir = document.getElementById("contenedorBotonImprimir");
    contenedorBotonImprimir.innerHTML = "";
    contenedorBotonImprimir.appendChild(imprimirBtn);
}

// FUNCION PARA MOSTRAR LAS VENTAS
function mostrarVentas() {
    // OBTENER VALOR DE LA TABLA DE HTML
    var Tabla = document.getElementById("TableBody")
    Tabla.innerHTML = " "

    // RECORRER EL ARRAY PARA TRAER DATOS
    DataVenta.forEach((elementVenta, index) => {
        // DAR VALOR DE LAS VENTAS A LAS VARIABLES
        var fechaVenta = new Date(elementVenta.fechaVenta)
        var nombreSocio = elementVenta.nombreSocio + " " + elementVenta.apellidoSocio
        var dniSocio = elementVenta.dniSocio; // Nuevo: obtener el DNI
        var mercaderia = elementVenta.mercaderia || "NO COMPRO"
        var cuota = elementVenta.cuota || "NO COMPRO"
        var seguro = elementVenta.seguro || "NO COMPRO"
        var total = elementVenta.total
        var formaPago = elementVenta.formaDePago || "NO AGREGO FORMA DE PAGO"
        var descripcionVenta = elementVenta.descripcion || "NO HAY DESCRIPCION"
        // CREAR LAS FILAS 
        var fila = document.createElement("tr")
        var fechaCell = document.createElement("td")
        var nombreSocioCell = document.createElement("td")
        var dniSocioCell = document.createElement("td") // Nuevo: celda para DNI
        var mercaderiaCell = document.createElement("td")
        var cuotaCell = document.createElement("td")
        var seguroCell = document.createElement("td")
        var totalCell = document.createElement("td")
        var funcionesCell = document.createElement("td")
        var formaPagoCell = document.createElement("td")
        var descripcionVentaCell = document.createElement("td")
        var eliminarCell = document.createElement("button");
        // DAR VALOR A LAS FILAS
        fechaCell.textContent = fechaVenta.toLocaleDateString()
        nombreSocioCell.textContent = nombreSocio
        dniSocioCell.textContent = dniSocio // Nuevo: mostrar el DNI
        mercaderiaCell.textContent = mercaderia + " " + elementVenta.cantidadMercaderia
        cuotaCell.textContent = cuota
        seguroCell.textContent = seguro
        totalCell.textContent = "$" + total
        formaPagoCell.textContent = formaPago
        descripcionVentaCell.textContent = descripcionVenta
        eliminarCell.textContent = "ELIMINAR"
        eliminarCell.addEventListener("click", function () {
            // LLAMAR A LA FUNCIÓN ELIMINARVENTA PASANDO EL ÍNDICE
            eliminarVenta(index);
        })

        fila.appendChild(nombreSocioCell)
        fila.appendChild(dniSocioCell) // Nuevo: agregar la celda del DNI
        fila.appendChild(mercaderiaCell)
        fila.appendChild(cuotaCell)
        fila.appendChild(seguroCell)
        fila.appendChild(totalCell)
        fila.appendChild(formaPagoCell)
        fila.appendChild(descripcionVentaCell)
        funcionesCell.appendChild(eliminarCell)
        fila.appendChild(funcionesCell)
        Tabla.appendChild(fila)
    });
}

// NUEVA FUNCIÓN PARA ELIMINAR LA VENTA
function eliminarVenta(index) {
    // ELIMINAR LA VENTA DEL ARRAY
    DataVenta.splice(index, 1);

    // ACTUALIZAR EL LOCAL STORAGE
    localStorage.setItem("venta", JSON.stringify(DataVenta));

    // VOLVER A MOSTRAR LAS VENTAS
    mostrarVentas();
}

// FUNCIONALIDADES DEL RECIBO
// PARA QUE SE MUESTREN EN TIEMPO REAL SE DEBE HACER ESTO
var selectMercaderiaInput = document.getElementById("selectMercaderia");
var cantidadMercaderiaInput = document.getElementById("cantidadMercaderia");
var precioMercaderiaInput = document.getElementById("precioMercaderia");
var selectCuotaInput = document.getElementById("selectCuota");
var precioCuotaInput = document.getElementById("precioCuota");
var selectSeguroInput = document.getElementById("selectSeguro");
var precioSeguroInput = document.getElementById("precioSeguro");
var socioNombreInput = document.getElementById("socioNombre");
var socioDNIInput = document.getElementById("socioDNI");

//ESTO CREA UN EVENTO EL CUAL HACE QUE SE MUESTRE LAS COSAS EN TIEMPO REAL EN EL RECIBO
selectMercaderiaInput.addEventListener("input", mostrarRecibo);
cantidadMercaderiaInput.addEventListener("input", mostrarRecibo);
precioMercaderiaInput.addEventListener("input", mostrarRecibo);
selectCuotaInput.addEventListener("input", mostrarRecibo);
precioCuotaInput.addEventListener("input", mostrarRecibo);
selectSeguroInput.addEventListener("input", mostrarRecibo);
precioSeguroInput.addEventListener("input", mostrarRecibo);
socioNombreInput.addEventListener("input", mostrarRecibo);
socioDNIInput.addEventListener("input", mostrarRecibo);

// FUNCION PARA MOSTRAR RECIBOS Y CARGARLES LOS DATOS
function mostrarRecibo() {
    //TRAER EL ID DE HTML
    var ReciboContainer = document.getElementById("reciboVenta");
    ReciboContainer.innerHTML = " ";

    //OBTENER LOS VALORES DE LOS INPUTS
    var mercaderia = document.getElementById("selectMercaderia").value;
    var cantidadMercaderia = document.getElementById("cantidadMercaderia").value;
    var precioMercaderia = document.getElementById("precioMercaderia").value;
    var cuota = document.getElementById("selectCuota").value;
    var precioCuota = document.getElementById("precioCuota").value;
    var seguro = document.getElementById("selectSeguro").value;
    var precioSeguro = document.getElementById("precioSeguro").value;
    var nombreSocio = document.getElementById("socioNombre").value;
    var dniSocio = document.getElementById("socioDNI").value;
    var totalAhPagar =
        precioMercaderia * cantidadMercaderia +
        precioCuota * cuota +
        precioSeguro * seguro;
    var fechaVenta = new Date();

    // CREAR EL RECIBO
    var reciboContainer = document.createElement("div");
    var tituloCell = document.createElement("h1");
    var nombreEscuelaFutCell = document.createElement("h3");
    var direccionEscuelaCell = document.createElement("p");
    var nombreSocioCell = document.createElement("p");
    var dniSocioCell = document.createElement("p");
    var mercaderiaCell = document.createElement("p");
    var cuotaCell = document.createElement("p");
    var seguroCell = document.createElement("p");
    var totalCell = document.createElement("h1");

    // DAR VALOR A LAS CELDAS DEL RECIBO
    tituloCell.textContent =
        "RECIBO DE LA FECHA " + fechaVenta.toLocaleDateString();
    nombreEscuelaFutCell.textContent = "ARGENTINO JUNIORS";
    direccionEscuelaCell.textContent = "CALLE WALAS 24/2 SIDNEY";
    nombreSocioCell.textContent = "SOCIO: " + nombreSocio;
    dniSocioCell.textContent = "DNI SOCIO: " + dniSocio;
    mercaderiaCell.textContent =
        "MERCADERIA COMPRADA: " +
        mercaderia +
        " (" +
        cantidadMercaderia +
        ")---TOTAL: $" +
        precioMercaderia;
    cuotaCell.textContent =
        "CUOTAS PAGADAS: " + cuota + "---TOTAL: $" + precioCuota;
    seguroCell.textContent =
        "SEGUROS PAGADOS: " + seguro + "---TOTAL: $" + precioSeguro;
    totalCell.textContent = "TOTAL A PAGAR: $" + totalAhPagar;

    // AÑADIR EL RECIBO AL CONTENEDOR DEL RECIBO
    reciboContainer.appendChild(tituloCell);
    reciboContainer.appendChild(nombreEscuelaFutCell);
    reciboContainer.appendChild(direccionEscuelaCell);
    reciboContainer.appendChild(nombreSocioCell);
    reciboContainer.appendChild(dniSocioCell);
    reciboContainer.appendChild(mercaderiaCell);
    reciboContainer.appendChild(cuotaCell);
    reciboContainer.appendChild(seguroCell);
    reciboContainer.appendChild(totalCell);

    // AÑADIR EL CONTENEDOR DEL RECIBO AL CONTENEDOR PRINCIPAL
    ReciboContainer.appendChild(reciboContainer);

    // CREAR UN BOTÓN DE IMPRESIÓN
    var imprimirButton = document.createElement("button");
    imprimirButton.textContent = "Imprimir Recibo";
    imprimirButton.className = "button button--primary";
    imprimirButton.addEventListener("click", function () {
        imprimirRecibo(); // Llamada a la función de impresión
        console.log("Recibo impreso"); // Mensaje de verificación en la consola
    });

    // AÑADIR EL BOTÓN DE IMPRESIÓN AL CONTENEDOR PRINCIPAL (fuera del contenedor del recibo)
    ReciboContainer.appendChild(imprimirButton);
}

/* Nueva función para imprimir el recibo
function imprimirRecibo(reciboData) {
    // Aquí puedes implementar la lógica para la impresión del recibo
    // Por ejemplo, puedes abrir una nueva ventana o hacer una solicitud a un servicio de impresión
    // y pasar los datos del recibo (reciboData) para que se impriman.
}*/

// Obtener datos del localStorage
var mercaData = localStorage.getItem('Merca');

// Verificar si hay datos en el localStorage
if (mercaData) {
    // Parsear los datos del localStorage
    var mercaArray = JSON.parse(mercaData);

    // Obtener el elemento select
    var selectMercaderia = document.getElementById('selectMercaderia');

    // Iterar sobre los datos y agregar opciones al select
    mercaArray.forEach(function (mercaderia) {
        var option = document.createElement('option');
        option.value = mercaderia.nombre; // Asigna el valor que desees
        option.text = mercaderia.nombre; // Asigna el campo nombre
        selectMercaderia.appendChild(option);
    });
}


//ESTO ES TU CODIGO ANTERIOR//
/*
var elemento = document.getElementById("mercaderia");
var nombre = document.getElementById("nombre");
var descripcion = document.getElementById("descripcion");
var tablaMercaderia = document.getElementById("tablaMercaderia");
var btnAgregar = document.getElementById("btnAgregar");
elemento.style.display = "none";
var sumaTotal = 0;

function LimpiarTablaVent() {
    // Obtener la referencia de la tablaVent
    var tablaVent = document.getElementById("tablaVent");

    // Obtener el número total de filas en la tabla
    var rowCount = tablaVent.rows.length;

    // Conservar la primera fila (encabezados de columna)
    for (var i = rowCount - 1; i > 0; i--) {
        tablaVent.deleteRow(i);
    }

    // También puedes reiniciar la variable de suma total si es necesario
    sumaTotal = 0;

    // Actualizar la celda de la suma total para reflejar el cambio
    document.getElementById("totalSum").textContent = "El total es: " + sumaTotal;
}

function cargarVentasGuardadas() {
    var ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    var tablaVenta = document.getElementById("tablaVenta");
    ventas.forEach(function (venta) {
        var row = tablaVenta.insertRow(-1);
        var celdaNombre = row.insertCell(0); // Columna "Nombre"
        var celdaCantidad = row.insertCell(1);
        var celdaPrecio = row.insertCell(2);
        var celdaSocio = row.insertCell(3); // Columna "Socio"
        var celdaTotal = row.insertCell(4);
        var celdaFunciones = row.insertCell(5);

        celdaNombre.innerHTML = venta.nombreMercaderia; // Muestra el nombre de la mercadería
        celdaCantidad.innerHTML = venta.cantidad;
        celdaPrecio.innerHTML = venta.precio;
        celdaSocio.innerHTML = venta.nombreSocio; // Muestra el nombre del socio
        celdaTotal.innerHTML = venta.total;

        // Agregar un botón para eliminar la fila
        var btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = function () {
            // Eliminar la fila y actualizar localStorage si es necesario
            var rowIndex = this.parentElement.parentElement.rowIndex;
            tablaVenta.deleteRow(rowIndex);
            ventas.splice(rowIndex - 1, 1); // Restar 1 para obtener el índice correcto en el array
            localStorage.setItem("ventas", JSON.stringify(ventas));
        };
        celdaFunciones.appendChild(btnEliminar);
    });
}

// Llama a la función para cargar los datos de ventas almacenados en localStorage al cargar la página
document.addEventListener("DOMContentLoaded", cargarVentasGuardadas);

function cargarNombresEnSelect() {
    var selectElement = document.getElementById("name");

    var mercaderias = JSON.parse(localStorage.getItem("mercaderias")) || [];

    mercaderias.forEach(function (mercaderia, index) {
        var option = document.createElement("option");
        option.value = index;
        option.text = mercaderia.nombre;
        selectElement.appendChild(option);
    });
}

// Llama a la función para cargar los nombres en el select cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", cargarNombresEnSelect);

// Llama a la función para cargar los nombres en el select al cargar la página
window.onload = function () {
    cargarNombresEnSelect();
};

window.onload = function () {
    var mercaderias = JSON.parse(localStorage.getItem("mercaderias")) || [];

    mercaderias.forEach(function (mercaderia, index) {
        var fila = tablaMercaderia.insertRow(-1);
        var celdaNombre = fila.insertCell(0);
        var celdaDescripcion = fila.insertCell(1);
        var celdaFunciones = fila.insertCell(2);
        celdaNombre.innerHTML = mercaderia.nombre;
        celdaDescripcion.innerHTML = mercaderia.descripcion;

        var btnBorrar = document.createElement("button");
        btnBorrar.textContent = "Borrar";
        btnBorrar.onclick = function () {
            BorrarMercaderia(index);
        };
        celdaFunciones.appendChild(btnBorrar);

        var btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.onclick = function () {
            MostrarModificar(mercaderia, index);
        };
        celdaFunciones.appendChild(btnModificar);
    });
};

function AgregarMercaderia() {
    var nombreValor = nombre.value;
    var descripcionValor = descripcion.value;

    var mercaderias = JSON.parse(localStorage.getItem("mercaderias")) || [];

    var nuevaMercaderia = {
        nombre: nombreValor,
        descripcion: descripcionValor
    };

    mercaderias.push(nuevaMercaderia);
    localStorage.setItem("mercaderias", JSON.stringify(mercaderias));

    var fila = tablaMercaderia.insertRow(-1);
    var celdaNombre = fila.insertCell(0);
    var celdaDescripcion = fila.insertCell(1);
    var celdaFunciones = fila.insertCell(2);
    celdaNombre.innerHTML = nombreValor;
    celdaDescripcion.innerHTML = descripcionValor;

    var btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    btnBorrar.onclick = function () {
        BorrarMercaderia(mercaderias.length - 1);
    };
    celdaFunciones.appendChild(btnBorrar);

    var btnModificar = document.createElement("button");
    btnModificar.textContent = "Modificar";
    btnModificar.onclick = function () {
        MostrarModificar(nuevaMercaderia, mercaderias.length - 1);
    };
    celdaFunciones.appendChild(btnModificar);

    nombre.value = "";
    descripcion.value = "";
    location.reload()
}

function BorrarMercaderia(index) {
    var mercaderias = JSON.parse(localStorage.getItem("mercaderias")) || [];


    mercaderias.splice(index, 1);
    localStorage.setItem("mercaderias", JSON.stringify(mercaderias));
    ActualizarTabla();

}

function MostrarModificar(mercaderia, index) {
    nombre.value = mercaderia.nombre;
    descripcion.value = mercaderia.descripcion;

    var btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar";
    btnGuardar.onclick = function () {
        ModificarMercaderia(index);
    };
    document.querySelector("form").appendChild(btnGuardar);

    // Ocultar el botón de "Agregar"
    btnAgregar.style.display = "none";
}

function ModificarMercaderia(index) {
    var mercaderias = JSON.parse(localStorage.getItem("mercaderias")) || [];

    mercaderias[index].nombre = nombre.value;
    mercaderias[index].descripcion = descripcion.value;

    localStorage.setItem("mercaderias", JSON.stringify(mercaderias));
    ActualizarTabla();

    nombre.value = "";
    descripcion.value = "";
    document.querySelector("form button:last-of-type").remove();

    // Mostrar nuevamente el botón de "Agregar"
    btnAgregar.style.display = "block";
}

function ActualizarTabla() {
    var table = document.getElementById("tablaMercaderia");
    table.innerHTML = ""; // Borra todo el contenido de la tabla

    var header = table.createTHead();
    var row = header.insertRow(0);
    var headers = ["Nombre", "Descripción", "Funciones"];
    for (var i = 0; i < headers.length; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = headers[i];
    }

    var mercaderias = JSON.parse(localStorage.getItem("mercaderias")) || [];
    mercaderias.forEach(function (mercaderia, index) {
        var row = table.insertRow(-1);
        var celdaNombre = row.insertCell(0);
        var celdaDescripcion = row.insertCell(1);
        var celdaFunciones = row.insertCell(2);
        celdaNombre.innerHTML = mercaderia.nombre;
        celdaDescripcion.innerHTML = mercaderia.descripcion;

        var btnBorrar = document.createElement("button");
        btnBorrar.textContent = "Borrar";
        btnBorrar.onclick = function () {
            BorrarMercaderia(index);
        };
        celdaFunciones.appendChild(btnBorrar);

        var btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.onclick = function () {
            MostrarModificar(mercaderia, index);
        };
        celdaFunciones.appendChild(btnModificar);
    });
}

function MostrarMercaderia() {
    elemento.style.display = "block";
}

function OcultarMercaderia() {
    elemento.style.display = "none";
}

// Función para cargar los nombres de mercadería en el selector correspondiente
function cargarMercaderiaEnSelect() {
    var selectElement = document.getElementById("selectMercaderia");
    var mercaderias = JSON.parse(localStorage.getItem("mercaderias")) || [];

    mercaderias.forEach(function (mercaderia, index) {
        var option = document.createElement("option");
        option.value = index;
        option.text = mercaderia.nombre;
        selectElement.appendChild(option);
    });
}

function actualizarUltimoPago() {
    // Obtener datos de Local Storage
    var ventasData = JSON.parse(localStorage.getItem('ventas')) || [];
    var sociosData = JSON.parse(localStorage.getItem('DataSocios')) || [];
  
    // Iterar sobre las ventas
    for (var i = 0; i < ventasData.length; i++) {
      var venta = ventasData[i];
  
      // Verificar si el nombreMercaderia es "cuota"
      if (venta.nombreMercaderia === "cuota") {
        // Buscar el socio correspondiente en DataSocios
        var socio = sociosData.find(function (s) {
          return s.dni === venta.nombreSocio; // Corregir aquí: comparar con nombreSocio en lugar de dniSocio
        });
  
        // Si se encuentra el socio, actualizar el último pago
        if (socio) {
          socio.ultimoPago = venta.fechaVenta;
        }
      }
    }
  
    // Actualizar los datos en el Local Storage
    localStorage.setItem('DataSocios', JSON.stringify(sociosData));
}
  
// Llamar a la función cuando sea necesario
actualizarUltimoPago();

// Llama a las funciones para cargar los datos en los selectores cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", cargarMercaderiaEnSelect);*/

