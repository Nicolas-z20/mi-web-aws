// ==========================================
// 1. ESTRUCTURA DE DATOS EN MEMORIA (OBJETOS)
// ==========================================
let scooters = [
  { nombre: "Scooter-01", bateria: 85, kilometraje: 42.3, ubicacion: "Plaza de Armas" },
  { nombre: "Scooter-02", bateria: 15, kilometraje: 110.5, ubicacion: "Mall Plaza Chillán" }, 
  { nombre: "Scooter-03", bateria: 60, kilometraje: 15.1, ubicacion: "Campus INACAP" }
];

// Instancia global del modal nativo de Bootstrap para Edición
let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));

// Variable global para controlar qué índice numérico estamos editando o eliminando
let i = 0; 


// ==========================================
// 2. FUNCIÓN READ (RENDERIZAR LA TABLA)
// ==========================================
function listarScooters(t) {
  let listaNodos = document.getElementById("listaNodos");
  listaNodos.innerHTML = "";

  let totalKilometros = 0;
  let alertasCriticas = 0;

  t.forEach((scooter, index) => {
    totalKilometros += parseFloat(scooter.kilometraje);
    
    let claseFila = "";
    let badgeEstado = '<span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i> Operativo</span>';
    
    // Alertas condicionales automatizadas basadas en la batería
    if (scooter.bateria < 20) {
      claseFila = "table-danger text-danger fw-bold"; 
      badgeEstado = '<span class="badge bg-danger"><i class="bi bi-battery-alert me-1"></i> Batería Crítica</span>';
      alertasCriticas++;
    } else if (scooter.bateria <= 50) {
      badgeEstado = '<span class="badge bg-warning text-dark"><i class="bi bi-battery-charging me-1"></i> Carga Media</span>';
    }

    let tr = document.createElement("tr");
    if (claseFila) tr.className = claseFila;

    tr.innerHTML = `
      <td class="ps-4 fw-semibold"><i class="bi bi-scooter me-2"></i>${scooter.nombre}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div class="progress w-50" style="height: 8px;">
            <div class="progress-bar ${scooter.bateria < 20 ? 'bg-danger' : scooter.bateria <= 50 ? 'bg-warning' : 'bg-success'}" role="progressbar" style="width: ${scooter.bateria}%"></div>
          </div>
          <span class="small">${scooter.bateria}%</span>
        </div>
      </td>
      <td>${scooter.kilometraje} km</td>
      <td><i class="bi bi-geo-alt-fill text-secondary me-1"></i>${scooter.ubicacion}</td>
      <td>${badgeEstado}</td>
      <td class="text-end pe-4">
        <button class="btn btn-sm btn-outline-dark me-1" onclick="prepararEdicion(${index})">
          <i class="bi bi-pencil-fill"></i> Editar
        </button>
        <button class="btn btn-sm btn-danger" onclick="eliminarScooter(${index})">
          <i class="bi bi-trash-fill"></i>
        </button>
      </td>
    `;
    listaNodos.appendChild(tr);
  });

  // Mostrar totales en las tarjetas de arriba
  document.getElementById("cardTotal").textContent = scooters.length;
  document.getElementById("cardKilometros").textContent = totalKilometros.toFixed(1) + " km";
  document.getElementById("cardAlertas").textContent = alertasCriticas;
}


// ==========================================
// 3. FUNCIÓN CREATE (AGREGAR SCOOTER CON ANIMACIÓN)
// ==========================================
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", agregarNodo);

function agregarNodo() {
  let nombre = document.getElementById("nodo").value.trim();
  let bateria = document.getElementById("bateria").value;
  let kilometraje = document.getElementById("kilometraje").value;
  let ubicacion = document.getElementById("ubicacion").value.trim();

  if (nombre != "" && bateria != "" && kilometraje != "" && ubicacion != "") {
    scooters.push({
      nombre: nombre,
      bateria: parseInt(bateria),
      kilometraje: parseFloat(kilometraje),
      ubicacion: ubicacion
    });
    
    document.getElementById("nodo").value = "";
    document.getElementById("bateria").value = "";
    document.getElementById("kilometraje").value = "";
    document.getElementById("ubicacion").value = "";
    
    // Alerta animada de éxito de SweetAlert2
    Swal.fire({
      icon: "success",
      title: "¡Scooter Agregado!",
      text: "El dispositivo se registró correctamente en la flota.",
      timer: 2000,
      showConfirmButton: false
    });

    listarScooters(scooters);
  } else {
    // Alerta animada de error de SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete todos los parámetros de telemetría."
    });
  }
}


// ==========================================
// 4. FUNCIÓN SEARCH (BUSCAR / FILTRAR)
// ==========================================
let btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", buscarNodo);

function buscarNodo() {
  let nodoBuscado = document.getElementById("nodo").value.toLowerCase().trim();
  if (nodoBuscado == "") {
    listarScooters(scooters);
  } else {
    let encontrados = scooters.filter((s) => s.nombre.toLowerCase().includes(nodoBuscado) || s.ubicacion.toLowerCase().includes(nodoBuscado));
    if (encontrados.length > 0) {
      listarScooters(encontrados);
    } else {
      Swal.fire({
        icon: "info",
        title: "Sin Coincidencias",
        text: "No se encontraron scooters con ese criterio."
      });
    }
  }
}


// ==========================================
// 5. FUNCIÓN UPDATE (EDITAR DISPOSITIVO)
// ==========================================
function prepararEdicion(index) {
  i = index; 
  let scooter = scooters[i];

  document.getElementById("modalEditarLabel").textContent = "Editando: " + scooter.nombre;
  document.getElementById("edit_nombre").value = scooter.nombre;
  document.getElementById("edit_bateria").value = scooter.bateria;
  document.getElementById("edit_kilometraje").value = scooter.kilometraje;
  document.getElementById("edit_ubicacion").value = scooter.ubicacion;

  modalEditar.show();
}

let btnGuardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener("click", guardarNodo);

function guardarNodo() {
  scooters[i].nombre = document.getElementById("edit_nombre").value;
  scooters[i].bateria = parseInt(document.getElementById("edit_bateria").value);
  scooters[i].kilometraje = parseFloat(document.getElementById("edit_kilometraje").value);
  scooters[i].ubicacion = document.getElementById("edit_ubicacion").value;

  modalEditar.hide();
  
  Swal.fire({
    icon: "success",
    title: "Cambios Guardados",
    text: "La telemetría ha sido actualizada.",
    timer: 1500,
    showConfirmButton: false
  });

  listarScooters(scooters);
}


// ==========================================
// 6. FUNCIÓN DELETE (ELIMINAR CON ANIMACIÓN)
// ==========================================
function eliminarScooter(index) {
  i = index; 

  // Ventana de confirmación animada de SweetAlert2
  Swal.fire({
    title: `¿Está seguro de eliminar el ${scooters[i].nombre}?`,
    text: "Esta acción desconectará el registro del nodo de forma permanente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteNodo(); // Llama a la función de borrado real de abajo
      
      Swal.fire(
        "¡Eliminado!",
        "El dispositivo ha sido removido con éxito.",
        "success"
      );
    }
  });
}

function deleteNodo() {
  scooters.splice(i, 1); 
  listarScooters(scooters); 
}


// ==========================================
// 7. CARGA INICIAL TRAS COMPILAR EL SCRIPT
// ==========================================
listarScooters(scooters);