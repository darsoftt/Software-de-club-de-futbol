//FUNCION PARA BUSCAR POR DNI Y MOSTRAR LA INFORMACION
function buscarSocioPorDNI() {
    const dniABuscar = document.getElementById("dniSocio").value;
    // Obtiene la lista de socios del LocalStorage
    const socios = JSON.parse(localStorage.getItem("DataSocios")) || [];
    const socioEncontrado = socios.find((socio) => socio.dni === dniABuscar);

    if (socioEncontrado) {
        mostrarInformacionSocio(socioEncontrado.dni);
    } else {
        // Si el DNI no se encuentra, borra la información en el cuadro
        document.getElementById("nombreSocioPoner").textContent = "SIN DATOS";
        document.getElementById("apellidoSocio").textContent = "SIN DATOS"
        document.getElementById("dniSocioInfo").textContent = "SIN DATOS";
       // document.getElementById("estadoCuota").textContent = "SIN DATOS"; 
        document.getElementById("ultimoPago").textContent = "SIN DATOS";
        document.getElementById("formaPago").textContent = "SIN DATOS";
        document.getElementById("categoriaSocio").textContent = "SIN DATOS"
        document.getElementById("bloqueSocio").textContent = "SIN DATOS"
        //document.getElementById("diasRestantes").textContent = "SIN DATOS"
        document.getElementById("vencimientoCuota").textContent="SIN DATOS"
    }
}
function mostrarInformacionSocio(dni) {
    // Obtiene la lista de socios del LocalStorage
    const DataSocio = JSON.parse(localStorage.getItem("DataSocios")) || [];
    const socioEncontrado = DataSocio.find((s) => s.dni === dni);

    if (socioEncontrado) {
  
        document.getElementById("nombreSocioPoner").textContent = socioEncontrado.name;
        document.getElementById("apellidoSocio").textContent = socioEncontrado.apellido;
        document.getElementById("dniSocioInfo").textContent = socioEncontrado.dni;
        document.getElementById("categoriaSocio").textContent = socioEncontrado.categoriaFutbol
        document.getElementById("bloqueSocio").textContent = socioEncontrado.bloques
        
        const estadoCuota = document.getElementById("estadoCuota");
        const ultimoPago = document.getElementById("ultimoPago");
        const formaPago = document.getElementById("formaPago");
        const diasRestantes = document.getElementById("diasRestantes")

        // Obtener la fecha actual
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        // Obtener la fecha del último pago del socio
        const fechaUltimoPago = socioEncontrado.ultimoPagoCuota ? new Date(socioEncontrado.ultimoPagoCuota) : null;
            
        if (fechaUltimoPago) {
            fechaUltimoPago.setHours(0, 0, 0, 0);
            const tiempoDiferencia = fechaActual - fechaUltimoPago;
            const diasDiferencia = Math.floor(tiempoDiferencia / (1000 * 60 * 60 * 24));
            
            ultimoPago.textContent = fechaUltimoPago.toLocaleDateString();
                       
            let diasUltimoPago = fechaUltimoPago.getDate()

            let ultimaFechaCuota = new Date(fechaUltimoPago)
            let vencimientoFechaCuota = socioEncontrado.vencimientoCuota ?  new Date(socioEncontrado.vencimientoCuota) : null
            vencimientoFechaCuota.setDate(diasUltimoPago)
            let cuotasPagadas = socioEncontrado.cuota
            ultimaFechaCuota.setMonth(ultimaFechaCuota.getMonth() + parseInt(cuotasPagadas))
            

            if (fechaActual.getTime() > ultimaFechaCuota.getTime()) {
    
                vencimientoCuota.textContent = `${ultimaFechaCuota.toLocaleDateString()}`;
                diasRestantes.textContent = "No quedan dias restantes"

            } else if (fechaActual.getTime() < ultimaFechaCuota.getTime() ||fechaActual.getTime() == ultimaFechaCuota.getTime() ) {
               
                if (socioEncontrado.vencimientoCuota) {
                    vencimientoCuota.textContent = `${vencimientoFechaCuota.toLocaleDateString()}`;
                   //anda mal diasRestantes.textContent = cuotasPagadas * 30 - diasDiferencia + 1
                    console.log(vencimientoFechaCuota.getDate())
                }else{ 
                    vencimientoCuota.textContent = `${socioEncontrado.vencimientoCuota.toLocaleDateString()}`;
                   //anda mal diasRestantes.textContent = cuotasPagadas * 30 - diasDiferencia + 1
                    console.log("B")
                }    

            } else {
                
                vencimientoCuota.textContent = `${ultimaFechaCuota.toLocaleDateString()}`;
                diasRestantes.textContent = "Error de cuota"

            }
        } else {
            vencimientoCuota.textContent = "Sin cuotas previas";
            ultimoPago.textContent = "Sin ultimo pago previo";
          
            formaPago.textContent = "via";
           
        }

        formaPago.textContent = socioEncontrado.formaDePago || "Sin forma de pago previa";
    }
    
}

//FUNCION PARA BUSCAR POR NOMBRE Y MOSTRAR LA INFORMACION
function buscarPorNombre() {
    const nombreBuscar = document.getElementById("nombreSocio").value;
    // Obtiene la lista de socios del LocalStorage
    const socios = JSON.parse(localStorage.getItem("DataSocios")) || [];
    const socioEncontrado = socios.find(socio => socio.name+" "+socio.apellido == nombreBuscar);
    
    if (socioEncontrado) {
        mostrarInformacionSocioNombre(nombreBuscar);
    } else {
        // Si el DNI no se encuentra, borra la información en el cuadro
        document.getElementById("nombreSocioPoner").textContent = "SIN DATOS";
        document.getElementById("apellidoSocio").textContent = "SIN DATOS"
        document.getElementById("dniSocioInfo").textContent = "SIN DATOS";
        document.getElementById("vencimientoCuota").textContent = "SIN DATOS"; 
        document.getElementById("ultimoPago").textContent = "SIN DATOS";
        document.getElementById("formaPago").textContent = "SIN DATOS";
        document.getElementById("categoriaSocio").textContent = "SIN DATOS"
        document.getElementById("bloqueSocio").textContent = "SIN DATOS"
        //document.getElementById("diasRestantes").textContent = "SIN DATOS"
    }
}
function mostrarInformacionSocioNombre(nombreBuscar) {
    // Obtiene la lista de socios del LocalStorage
    const DataSocio = JSON.parse(localStorage.getItem("DataSocios")) || [];
    const socioEncontrado = DataSocio.find((s) => s.name+" "+s.apellido == nombreBuscar);

    if (socioEncontrado) {
  
        document.getElementById("nombreSocioPoner").textContent = socioEncontrado.name;
        document.getElementById("apellidoSocio").textContent = socioEncontrado.apellido;
        document.getElementById("dniSocioInfo").textContent = socioEncontrado.dni;
        document.getElementById("categoriaSocio").textContent = socioEncontrado.categoriaFutbol
        document.getElementById("bloqueSocio").textContent = socioEncontrado.bloques

        const vencimientoCuota = document.getElementById("vencimientoCuota");
        const ultimoPago = document.getElementById("ultimoPago");
        const formaPago = document.getElementById("formaPago");
        const diasRestantes = document.getElementById("diasRestantes")
        
        // Obtener la fecha actual
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        // Obtener la fecha del último pago del socio
        const fechaUltimoPago = new Date(socioEncontrado.ultimoPagoCuota) 

        if (fechaUltimoPago) {
            fechaUltimoPago.setHours(0, 0, 0, 0);
            const tiempoDiferencia = fechaActual - fechaUltimoPago;
            const diasDiferencia = Math.floor(tiempoDiferencia / (1000 * 60 * 60 * 24));
            
            ultimoPago.textContent = fechaUltimoPago.toLocaleDateString();
                       
            let diasUltimoPago = fechaUltimoPago.getDate()

            let ultimaFechaCuota = new Date(fechaUltimoPago)
            let vencimientoFechaCuota = socioEncontrado.vencimientoCuota ?  new Date(socioEncontrado.vencimientoCuota) : null
            vencimientoFechaCuota.setDate(diasUltimoPago)
            let cuotasPagadas = socioEncontrado.cuota
            ultimaFechaCuota.setMonth(ultimaFechaCuota.getMonth() + parseInt(cuotasPagadas))
            

            if (fechaActual.getTime() > ultimaFechaCuota.getTime()) {
    
                vencimientoCuota.textContent = `${ultimaFechaCuota.toLocaleDateString()}`;
                diasRestantes.textContent = "No quedan dias restantes"

            } else if (fechaActual.getTime() < ultimaFechaCuota.getTime() ||fechaActual.getTime() == ultimaFechaCuota.getTime() ) {
               
                if (socioEncontrado.vencimientoCuota) {
                    vencimientoCuota.textContent = `${vencimientoFechaCuota.toLocaleDateString()}`;
                   //anda mal diasRestantes.textContent = cuotasPagadas * 30 - diasDiferencia + 1
                    console.log(vencimientoFechaCuota.getDate())
                }else{ 
                    vencimientoCuota.textContent = `${socioEncontrado.vencimientoCuota.toLocaleDateString()}`;
                   //anda mal diasRestantes.textContent = cuotasPagadas * 30 - diasDiferencia + 1
                    console.log("B")
                }    

            } else {
                
                vencimientoCuota.textContent = `${ultimaFechaCuota.toLocaleDateString()}`;
                diasRestantes.textContent = "Error de cuota"

            }
        } else {
            vencimientoCuota.textContent = "Sin cuotas previas";
            ultimoPago.textContent = "Sin ultimo pago previo";
            diasRestantes.textContent = "Sin dias restantes";
            formaPago.textContent = "Sin forma de pago previa";
           
        }
        formaPago.textContent = socioEncontrado.formaDePago || "Sin forma de pago previa";
    }
}