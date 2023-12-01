//VARIABLES DEL LCOAL STORAGE
let DataContabilidad = JSON.parse(localStorage.getItem("Contabilidad")) || []; 
let DataVenta = JSON.parse(localStorage.getItem("venta")) || [];
const Tabla = document.getElementById("TableBody");

//FUNCIONES QUE VAN AFUERA
mostrarVenta()
//FUNCION PARA MOSTRAR VENTAS
function mostrarVenta() {
    //LIMPIAR EL ARRAY PARA QUE NO SE GUARDEN DE NUEVO LAS COSAS ANTERIORES
    DataContabilidad = []
    //VACIAR LA TABLA ANTES DE MOSTRAR
    Tabla.innerHTML = " "

    //RECORRER LOS DATOS DE VENTA PARA MOSTRARLOS Y GUARDARLOS EN DATA-CONTABILIDAD
    DataVenta.forEach(itemVenta => {
        //CONSTANTES QUE TOMAN LOS VALORES DE "DataVenta"
        const fechaVenta = new Date(itemVenta.fechaVenta)
        const nombreSocio = itemVenta.nombreSocio
        const mercaderia = itemVenta.mercaderia || "NO COMPRO"
        const totalMercaderia = itemVenta.totalMercaderia 
        const cuota = itemVenta.cuota || "NO COMPRO"
        const totalCuota = itemVenta.totalCuota
        const seguro = itemVenta.seguro || "NO COMPRO"
        const totalSeguro = itemVenta.totalSeguro 
        const total = itemVenta.total
        const formaPago = itemVenta.formaDePago || "NO AGREGO FORMA DE PAGO"
        const descripcionVenta = itemVenta.descripcion || "NO AGREGO DESCRIPCION"
        //CREACION DE FILAS
        const fila = document.createElement("tr")
        const fechaCell = document.createElement("td")
        const nombreCell = document.createElement("td")
        const mercaderiaCell = document.createElement("td")
        const cuotaCell = document.createElement("td")
        const seguroCell = document.createElement("td")
        const totalCell = document.createElement("td")
        const formaPagoCell = document.createElement("td")
        const descripcionVentaCell = document.createElement("td")
        //ASIGNACION DE LOS VALORES DE "DataVenta" A LAS FILAS  
        document.getElementById("mercaderiaDescrp").textContent = "Mercaderia"
        document.getElementById("cuotaDescrp").textContent = "Cuota"
        document.getElementById("seguroDescrp").textContent = "Seguro"
        fechaCell.textContent = fechaVenta.toLocaleDateString()
        nombreCell.textContent = nombreSocio +" "+itemVenta.apellidoSocio
        mercaderiaCell.textContent = mercaderia +"("+itemVenta.cantidadMercaderia+", $"+totalMercaderia+")" 
        cuotaCell.textContent = cuota+"($"+totalCuota+")" 
        seguroCell.textContent = seguro+"($"+totalSeguro+")" 
        totalCell.textContent = "$"+total
        formaPagoCell.textContent = formaPago
        descripcionVentaCell.textContent = descripcionVenta
        document.getElementById("totalDescrp").textContent = "Total"
        //VISUALIZACION DE FILAS 
        fila.appendChild(fechaCell)
        fila.appendChild(nombreCell)
        fila.appendChild(mercaderiaCell)
        fila.appendChild(cuotaCell)
        fila.appendChild(seguroCell)
        fila.appendChild(totalCell)
        fila.appendChild(formaPagoCell)
        fila.appendChild(descripcionVentaCell)
        Tabla.appendChild(fila)
        //ASIGNAR DATOS A UN ARRAY PARA GUARDARLO EN "DataContabilidad"
        const newDataContabilidad = 
        {   
            fechaVenta : new Date(itemVenta.fechaVenta),
            nombreSocio : itemVenta.nombreSocio,
            apellidoSocio : itemVenta.apellidoSocio,
            mercaderia : itemVenta.mercaderia || "NO COMPRO",
            cantidadMercaderia:itemVenta.cantidadMercaderia,
            totalMercaderia : itemVenta.totalMercaderia || "NO COMPRO",
            cuota : itemVenta.cuota || "NO COMPRO",
            totalCuota : itemVenta.totalCuota || "NO COMPRO",
            seguro : itemVenta.seguro || "NO COMPRO" ,
            totalSeguro : itemVenta.totalSeguro || "NO COMPRO", 
            total : itemVenta.total,
            formaDePago: formaPago,
            descripcion: descripcionVenta
        }
        DataContabilidad.push(newDataContabilidad)
    });
    //GUARDAR LOS DATOS EN EL LOCAL STORAGE
    localStorage.setItem("Contabilidad", JSON.stringify(DataContabilidad))

}
//---------------------------------------------------------------------------------------------------------------------//
//FUNCION PARA FILTRAR POR NOMBRE
function filtrarPorNombreContabilidad() {
    // Obtener los valores del campo de entrada
    const nombreSocio = document.getElementById("iptFiltrarPorNombre").value.toLowerCase();

    // Filtrar los resultados por nombre
    const resultadosFiltrados = DataContabilidad.filter(item => {
        const nombreSocioItem = (item.nombreSocio + " " + item.apellidoSocio).toLowerCase();
        return nombreSocioItem.includes(nombreSocio);
    });

    // Mostrar los resultados filtrados
    mostrarFiltradosPorNombreContabilidad(resultadosFiltrados);
}
//mostrar los resultados filtrados por nombre
function mostrarFiltradosPorNombreContabilidad(resultados) {
    Tabla.innerHTML = " ";
    if (resultados.length === 0) {
        const pCell = document.createElement("tr");
        const pElement = document.createElement("td");
        pElement.textContent = "NO SE ENCONTRARON RESULTADOS";
        document.getElementById("mercaderiaDescrp").textContent = "Mercaderia"
        document.getElementById("cuotaDescrp").textContent = "Cuota"
        document.getElementById("seguroDescrp").textContent = "Seguro"
        document.getElementById("totalDescrp").textContent = "Total"
        pCell.appendChild(pElement);
        Tabla.appendChild(pCell);
    }else if (document.getElementById("iptFiltrarPorNombre").value === "") {
        mostrarVenta()
    }else {
        let totalCuotas = 0
        let totalSeguro = 0
        let totalMercaderia = 0
        let totalTotal = 0
        resultados.forEach(itemResultados => {
            const fila = document.createElement("tr");
            const fechaCell = document.createElement("td");
            const nombreCell = document.createElement("td");
            const mercaderiaCell = document.createElement("td");
            const cuotaCell = document.createElement("td");
            const seguroCell = document.createElement("td");
            const totalCell = document.createElement("td");
            const formaPagoCell = document.createElement("td");
            const descripcionVentaCell = document.createElement("td")
            const descripcionCuota = document.getElementById("cuotaDescrp")
            const descripcionSeguro = document.getElementById("seguroDescrp")
            const descripcionMercaderia = document.getElementById("mercaderiaDescrp")
            const decipcionTotal = document.getElementById("totalDescrp")
           
            if (typeof itemResultados.total == "number") {
                totalTotal += itemResultados.total
            }
            if (typeof itemResultados.totalCuota == "number" ) {
                totalCuotas += itemResultados.totalCuota
            }
            if (typeof itemResultados.totalSeguro == "number" ) {
                totalSeguro +=  itemResultados.totalSeguro
            }
            if (typeof itemResultados.totalMercaderia == "number") {
                totalMercaderia += itemResultados.totalMercaderia
            }
            
            // Asignar los valores de "DataVenta" a las celdas
            fechaCell.textContent = itemResultados.fechaVenta.toLocaleDateString();
            nombreCell.textContent = itemResultados.nombreSocio + " " + itemResultados.apellidoSocio;
            mercaderiaCell.textContent = itemResultados.mercaderia + "(" + itemResultados.cantidadMercaderia + ", $" + itemResultados.totalMercaderia + ")";
            cuotaCell.textContent = itemResultados.cuota + "($" + itemResultados.totalCuota + ")";
            seguroCell.textContent = itemResultados.seguro + "($" + itemResultados.totalSeguro + ")";
            totalCell.textContent = "$" + itemResultados.total;
            formaPagoCell.textContent = itemResultados.formaDePago;
            descripcionCuota.textContent = "Cuota = $"+totalCuotas
            descripcionSeguro.textContent = "Seguro = $"+totalSeguro
            descripcionMercaderia.textContent = "Mercaderia = $"+totalMercaderia
            decipcionTotal.textContent = "Total = $"+totalTotal
            descripcionVentaCell.textContent = itemResultados.descripcion
            // Visualización de celdas
            fila.appendChild(fechaCell);
            fila.appendChild(nombreCell);
            fila.appendChild(mercaderiaCell);
            fila.appendChild(cuotaCell);
            fila.appendChild(seguroCell);
            fila.appendChild(totalCell);
            fila.appendChild(formaPagoCell);
            fila.appendChild(descripcionVentaCell)
            Tabla.appendChild(fila);
        });
    }
    
}
// Agregar evento de escucha para el campo de nombre en contabilidad
document.getElementById("iptFiltrarPorNombre").addEventListener("input", filtrarPorNombreContabilidad);
// Llamada inicial para mostrar resultados sin necesidad de hacer clic en "Buscar"
//---------------------------------------------------------------------------------------------------------------------//
//FUNCION PARA FILTRAR POR FECHA
function filtrarPorFechaContabilidad() {
    // Obtener la fecha del campo de entrada
    const fechaSeleccionada = new Date(document.getElementById("iptFiltrarPorFecha").value);

    // Ajustar la fecha a medianoche para comparar solo la fecha
    fechaSeleccionada.setUTCHours(0, 0, 0, 0);

    // Obtener la fecha para el día siguiente para incluir las ventas de la fecha seleccionada
    const fechaSiguiente = new Date(fechaSeleccionada);
    fechaSiguiente.setDate(fechaSeleccionada.getDate() + 1);

    // Filtrar los resultados por rango de fechas
    const resultadosFiltrados = DataContabilidad.filter(item => {
        const fechaItem = new Date(item.fechaVenta);
        fechaItem.setUTCHours(0, 0, 0, 0);
        return fechaItem >= fechaSeleccionada && fechaItem < fechaSiguiente;
    });

    // Mostrar los resultados filtrados
    mostrarFiltradosPorFechaContabilidad(resultadosFiltrados);
}
//mostar los resultados filtrados por fecha
function mostrarFiltradosPorFechaContabilidad(resultados) {
    
    Tabla.innerHTML = " ";

    if (document.getElementById("iptFiltrarPorFecha").value == "") {
        mostrarVenta()
    }
    else if (resultados.length === 0) {
        const pCell = document.createElement("tr");
        const pElement = document.createElement("td");
        pElement.textContent = "NO SE ENCONTRARON RESULTADOS";
        document.getElementById("mercaderiaDescrp").textContent = "Mercaderia"
        document.getElementById("cuotaDescrp").textContent = "Cuota"
        document.getElementById("seguroDescrp").textContent = "Seguro"
        pCell.appendChild(pElement);
        Tabla.appendChild(pCell);
    } 
    else {
        let totalCuotas = 0
        let totalSeguro = 0
        let totalMercaderia = 0
        let totalTotal = 0
        resultados.forEach(itemResultados => {
            const fila = document.createElement("tr");
            const fechaCell = document.createElement("td");
            const nombreCell = document.createElement("td");
            const mercaderiaCell = document.createElement("td");
            const cuotaCell = document.createElement("td");
            const seguroCell = document.createElement("td");
            const totalCell = document.createElement("td");
            const formaPagoCell = document.createElement("td");
            const descripcionVentaCell = document.createElement("td")
            const descripcionCuota = document.getElementById("cuotaDescrp")
            const descripcionSeguro = document.getElementById("seguroDescrp")
            const descripcionMercaderia = document.getElementById("mercaderiaDescrp")
            const decipcionTotal = document.getElementById("totalDescrp")
           
            if (typeof itemResultados.total == "number") {
                totalTotal += itemResultados.total
            }
            if (typeof itemResultados.totalCuota == "number" ) {
                totalCuotas += itemResultados.totalCuota
            }
            if (typeof itemResultados.totalSeguro == "number" ) {
                totalSeguro +=  itemResultados.totalSeguro
            }
            if (typeof itemResultados.totalMercaderia == "number") {
                totalMercaderia += itemResultados.totalMercaderia
            }
            
            // Asignar los valores de "DataVenta" a las celdas
            fechaCell.textContent = itemResultados.fechaVenta.toLocaleDateString();
            nombreCell.textContent = itemResultados.nombreSocio + " " + itemResultados.apellidoSocio;
            mercaderiaCell.textContent = itemResultados.mercaderia + "(" + itemResultados.cantidadMercaderia + ", $" + itemResultados.totalMercaderia + ")";
            cuotaCell.textContent = itemResultados.cuota + "($" + itemResultados.totalCuota + ")";
            seguroCell.textContent = itemResultados.seguro + "($" + itemResultados.totalSeguro + ")";
            totalCell.textContent = "$" + itemResultados.total;
            formaPagoCell.textContent = itemResultados.formaDePago;
            descripcionCuota.textContent = "Cuota = $"+totalCuotas
            descripcionSeguro.textContent = "Seguro = $"+totalSeguro
            descripcionMercaderia.textContent = "Mercaderia = $"+totalMercaderia
            decipcionTotal.textContent = "Total = $"+totalTotal
            descripcionVentaCell.textContent = itemResultados.descripcion
            // Visualización de celdas
            fila.appendChild(fechaCell);
            fila.appendChild(nombreCell);
            fila.appendChild(mercaderiaCell);
            fila.appendChild(cuotaCell);
            fila.appendChild(seguroCell);
            fila.appendChild(totalCell);
            fila.appendChild(formaPagoCell);
            fila.appendChild(descripcionVentaCell)
            Tabla.appendChild(fila);
        });
    }
}
// Agregar evento de escucha para el campo de fecha en contabilidad
document.getElementById("iptFiltrarPorFecha").addEventListener("input", filtrarPorFechaContabilidad);
// Llamada inicial para mostrar resultados sin necesidad de hacer clic en "Buscar"
//---------------------------------------------------------------------------------------------------------------------//
//FUNCION PARA FILTRAR POR RANGO DE FECHA
function filtrarPorRangoDeFechaContabilidad() {
    // Obtener las fechas de los campos de entrada
    const fechaInicio = new Date(document.getElementById("iptFechaInicio").value);
    const fechaFin = new Date(document.getElementById("iptFechaFin").value);

    // Ajustar las fechas a medianoche para comparar solo la fecha
    fechaInicio.setUTCHours(0, 0, 0, 0);
    fechaFin.setUTCHours(0, 0, 0, 0);

    // Filtrar los resultados por rango de fechas
    const resultadosFiltrados = DataContabilidad.filter(item => {
        const fechaItem = new Date(item.fechaVenta);
        fechaItem.setUTCHours(0, 0, 0, 0);
        return fechaItem >= fechaInicio && fechaItem <= fechaFin;
    });

    // Mostrar los resultados filtrados
    mostrarFiltradosPorRangoDeFechaContabilidad(resultadosFiltrados);
}
//mostrar los resultados filtrados por rango de fecha
function mostrarFiltradosPorRangoDeFechaContabilidad(resultados) {
    Tabla.innerHTML = " ";

    if (document.getElementById("iptFechaInicio").value == "" && document.getElementById("iptFechaFin").value == "") {
        mostrarVenta()
    }
    else if (resultados.length === 0) {
        const pCell = document.createElement("tr");
        const pElement = document.createElement("td");
        pElement.textContent = "NO SE ENCONTRARON RESULTADOS";
        document.getElementById("mercaderiaDescrp").textContent = "Mercaderia"
        document.getElementById("cuotaDescrp").textContent = "Cuota"
        document.getElementById("seguroDescrp").textContent = "Seguro"
        pCell.appendChild(pElement);
        Tabla.appendChild(pCell);
    } 
    else {
        let totalCuotas = 0
        let totalSeguro = 0
        let totalMercaderia = 0
        let totalTotal = 0
        resultados.forEach(itemResultados => {
            const fila = document.createElement("tr");
            const fechaCell = document.createElement("td");
            const nombreCell = document.createElement("td");
            const mercaderiaCell = document.createElement("td");
            const cuotaCell = document.createElement("td");
            const seguroCell = document.createElement("td");
            const totalCell = document.createElement("td");
            const formaPagoCell = document.createElement("td");
            const descripcionVentaCell = document.createElement("td")
            const descripcionCuota = document.getElementById("cuotaDescrp")
            const descripcionSeguro = document.getElementById("seguroDescrp")
            const descripcionMercaderia = document.getElementById("mercaderiaDescrp")
            const decipcionTotal = document.getElementById("totalDescrp")
           
            if (typeof itemResultados.total == "number") {
                totalTotal += itemResultados.total
            }
            if (typeof itemResultados.totalCuota == "number" ) {
                totalCuotas += itemResultados.totalCuota
            }
            if (typeof itemResultados.totalSeguro == "number" ) {
                totalSeguro +=  itemResultados.totalSeguro
            }
            if (typeof itemResultados.totalMercaderia == "number") {
                totalMercaderia += itemResultados.totalMercaderia
            }
            
            // Asignar los valores de "DataVenta" a las celdas
            fechaCell.textContent = itemResultados.fechaVenta.toLocaleDateString();
            nombreCell.textContent = itemResultados.nombreSocio + " " + itemResultados.apellidoSocio;
            mercaderiaCell.textContent = itemResultados.mercaderia + "(" + itemResultados.cantidadMercaderia + ", $" + itemResultados.totalMercaderia + ")";
            cuotaCell.textContent = itemResultados.cuota + "($" + itemResultados.totalCuota + ")";
            seguroCell.textContent = itemResultados.seguro + "($" + itemResultados.totalSeguro + ")";
            totalCell.textContent = "$" + itemResultados.total;
            formaPagoCell.textContent = itemResultados.formaDePago;
            descripcionCuota.textContent = "Cuota = $"+totalCuotas
            descripcionSeguro.textContent = "Seguro = $"+totalSeguro
            descripcionMercaderia.textContent = "Mercaderia = $"+totalMercaderia
            decipcionTotal.textContent = "Total = $"+totalTotal
            descripcionVentaCell.textContent = itemResultados.descripcion
            // Visualización de celdas
            fila.appendChild(fechaCell);
            fila.appendChild(nombreCell);
            fila.appendChild(mercaderiaCell);
            fila.appendChild(cuotaCell);
            fila.appendChild(seguroCell);
            fila.appendChild(totalCell);
            fila.appendChild(formaPagoCell);
            fila.appendChild(descripcionVentaCell)
            Tabla.appendChild(fila);
        });
    }
}
// Agregar evento de escucha para los campos de rango de fecha en contabilidad
document.getElementById("iptFechaInicio").addEventListener("input", filtrarPorRangoDeFechaContabilidad);
document.getElementById("iptFechaFin").addEventListener("input", filtrarPorRangoDeFechaContabilidad);
// Llamada inicial para mostrar resultados sin necesidad de hacer clic en "Buscar"
//---------------------------------------------------------------------------------------------------------------------//
//FUNCION PARA FILTRAR POR PRODUCTOS
function filtrarPorProductoContabilidad() {
    // Obtener el valor del campo de entrada
    const producto = document.getElementById("iptFiltrarPorProducto").value.toLowerCase();
    // Filtrar los resultados por producto
    const resultadosFiltrados = DataContabilidad.filter(item => {
        // Obtener los productos comprados en formato minúsculas
        const productosComprados = item.mercaderia.toLowerCase();

        // Verificar si el producto buscado está presente en los productos comprados
        return productosComprados.includes(producto);
    });

    // Mostrar los resultados filtrados
    mostrarFiltradosPorProducto(resultadosFiltrados);
}
//mostrar productos filtrados
function mostrarFiltradosPorProducto(resultados) {
    Tabla.innerHTML = " ";

    if (resultados.length === 0) {
        const pCell = document.createElement("tr");
        const pElement = document.createElement("td");
        pElement.textContent = "NO SE ENCONTRARON RESULTADOS";
        document.getElementById("mercaderiaDescrp").textContent ="Mercaderia"
        pCell.appendChild(pElement);
        Tabla.appendChild(pCell);
    } else if (document.getElementById("iptFiltrarPorProducto").value == "") {
        mostrarVenta()
    }
    else {
        let totalCuotas = 0
        let totalSeguro = 0
        let totalMercaderia = 0
        resultados.forEach(itemResultados => {
            const fila = document.createElement("tr");
            const fechaCell = document.createElement("td");
            const nombreCell = document.createElement("td");
            const mercaderiaCell = document.createElement("td");
            const cuotaCell = document.createElement("td");
            const seguroCell = document.createElement("td");
            const totalCell = document.createElement("td");
            const formaPagoCell = document.createElement("td");
            const descripcionVentaCell = document.createElement("td")
            const descripcionMercaderia = document.getElementById("mercaderiaDescrp")
            
            //Buscar el total de mercaderia y sumarlo
            if (typeof itemResultados.totalMercaderia == "number") {
                totalMercaderia += itemResultados.totalMercaderia
            }
            
            // Asignar los valores de "DataVenta" a las celdas
            fechaCell.textContent = itemResultados.fechaVenta.toLocaleDateString();
            nombreCell.textContent = itemResultados.nombreSocio + " " + itemResultados.apellidoSocio;
            mercaderiaCell.textContent = itemResultados.mercaderia + "(" + itemResultados.cantidadMercaderia + ", $" + itemResultados.totalMercaderia + ")";
            cuotaCell.textContent = itemResultados.cuota + "($" + itemResultados.totalCuota + ")";
            seguroCell.textContent = itemResultados.seguro + "($" + itemResultados.totalSeguro + ")";
            totalCell.textContent = "$" + itemResultados.total;
            formaPagoCell.textContent = itemResultados.formaDePago;
            descripcionMercaderia.textContent = "Mercaderia = $"+totalMercaderia
            descripcionVentaCell.textContent = itemResultados.descripcion
            // Visualización de celdas
            fila.appendChild(fechaCell);
            fila.appendChild(nombreCell);
            fila.appendChild(mercaderiaCell);
            fila.appendChild(cuotaCell);
            fila.appendChild(seguroCell);
            fila.appendChild(totalCell);
            fila.appendChild(formaPagoCell);
            fila.appendChild(descripcionVentaCell)
            Tabla.appendChild(fila);
        });
    }
}
// Agregar evento de escucha para los campos de productos
document.getElementById("iptFiltrarPorProducto").addEventListener("input", filtrarPorProductoContabilidad);
// Llamada inicial para mostrar resultados sin necesidad de hacer clic en "Buscar"
//---------------------------------------------------------------------------------------------------------------------//
//FUNCION PARA EXPORTAR LA TABLA A EXCEL
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
      window.location.href = uri + base64(format(template, ctx))
    }
})()
//---------------------------------------------------------------------------------------------------------------------//