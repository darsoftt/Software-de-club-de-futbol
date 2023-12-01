window.addEventListener("load", function() {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];

    const registrosContainer = document.getElementById("registros-container");

    registros.forEach(function(registro, index) {
        const registroDiv = document.createElement("div");
        registroDiv.innerHTML = `Actividad: ${registro.actividad}, Monto: $${registro.monto}`;
        registrosContainer.appendChild(registroDiv);
    });
});

document.getElementById("registro-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const dni = document.getElementById("dni").value;
    const actividad = document.getElementById("actividad").value;
    const monto = parseFloat(document.getElementById("monto").value);

    if (dni.trim() === "" || actividad.trim() === "" || isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un DNI, una actividad válida y un monto válido.");
        return;
    }

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    registros.push({ dni, actividad, monto });

    localStorage.setItem("registros", JSON.stringify(registros));

    actualizarDeuda(dni, monto);

    document.getElementById("dni").value = "";
    document.getElementById("actividad").value = "";
    document.getElementById("monto").value = "";
});

function actualizarDeuda(dni, monto) {
    let deudas = JSON.parse(localStorage.getItem("deudas")) || {};

    if (!deudas[dni]) {
        deudas[dni] = monto;
    } else {
        deudas[dni] += monto;
    }

    localStorage.setItem("deudas", JSON.stringify(deudas));
}

function mostrarDeudasEnInterfaz() {
    const deudasContainer = document.getElementById("deudas-container");
    const deudasList = document.getElementById("deudas-list");

    const deudas = JSON.parse(localStorage.getItem("deudas")) || {};

    deudasList.innerHTML = "";

    for (const dni in deudas) {
        const deuda = deudas[dni];
        const usuarioNombre = obtenerNombrePorDNI(dni); 
        const listItem = document.createElement("li");
        listItem.textContent = `DNI: ${dni}, Usuario: ${usuarioNombre}, Deuda: $${deuda}`;
        deudasList.appendChild(listItem);
    }

    if (Object.keys(deudas).length > 0) {
        deudasContainer.style.display = "block";
    } else {
        deudasContainer.style.display = "none";
    }
}

window.addEventListener("load", mostrarDeudasEnInterfaz);