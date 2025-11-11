// Obtener contenedor del tab de especialidades
const especialidadesTab = document.getElementById("especialidades");

// Cargar datos desde LocalStorage
let especialidadesStorage = JSON.parse(
  localStorage.getItem("especialidades") || "[]"
);

// Mostrar tabla de especialidades
function mostrarEspecialidades() {
  especialidadesTab.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="text-primary">Listado de Especialidades</h4>
      <button class="btn btn-success" id="nuevaEspecialidadBtn"> Nueva Especialidad</button>
    </div>
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${especialidadesStorage
          .map(
            (e) => `
          <tr>
            <td>${e.id}</td>
            <td>${e.nombre}</td>
            <td>
              <button class="btn btn-warning btn-sm editarEspecialidadBtn" data-id="${e.id}">Editar</i></button>
              <button class="btn btn-danger btn-sm eliminarEspecialidadBtn"  data-id="${e.id}">Eliminar</i></button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
  
  document
    .getElementById("nuevaEspecialidadBtn")
    .addEventListener("click", () => mostrarFormularioEspecialidad());
}

// formulario de alta
function mostrarFormularioEspecialidad(especialidad = null) {
  especialidadesTab.innerHTML = `
    <div class="card p-4 bg-light mb-4">
      <h5 class="mb-3">${
        especialidad ? "Editar Especialidad" : "Nueva Especialidad"
      }</h5>
      <div class="mb-3">
        <label for="nombreEspecialidad" class="form-label">Nombre:</label>
        <input type="text" id="nombreEspecialidad" class="form-control" value="${
          especialidad ? especialidad.nombre : ""
        }">
      </div>
      <div>
        <button class="btn btn-success me-2" id="guardarEspecialidadBtn" ${
          especialidad ? `data-id="${especialidad.id}"` : ""
        }>
          ${especialidad ? "Guardar Cambios" : "Agregar Especialidad"}
        </button>
        <button class="btn btn-secondary" id="cancelarEspecialidadBtn">Cancelar</button>
      </div>
    </div>
  `;
}

// guardar, editar, eliminar
document.addEventListener("click", (e) => {
  if (e.target.id === "guardarEspecialidadBtn") {
    const nombre = document.getElementById("nombreEspecialidad").value.trim();
    if (!nombre) {
      alert("Por favor, ingresá un nombre.");
      return;
    }

    const id = e.target.dataset.id ? parseInt(e.target.dataset.id) : null;

    if (id) {
      // Editar
      const esp = especialidadesStorage.find((e) => e.id === id);
      if (esp) esp.nombre = nombre;
    } else {
      // Agregar nueva
      const nuevoId =
        especialidadesStorage.length > 0
          ? Math.max(...especialidadesStorage.map((e) => e.id)) + 1
          : 1;
      especialidadesStorage.push({ id: nuevoId, nombre });
    }

    localStorage.setItem(
      "especialidades",
      JSON.stringify(especialidadesStorage)
    );
    mostrarEspecialidades();
  }

  if (e.target.id === "cancelarEspecialidadBtn") {
    mostrarEspecialidades();
  }

  if (e.target.classList.contains("editarEspecialidadBtn")) {
    const id = parseInt(e.target.dataset.id);
    const esp = especialidadesStorage.find((e) => e.id === id);
    mostrarFormularioEspecialidad(esp);
  }

  if (e.target.classList.contains("eliminarEspecialidadBtn")) {
    const id = parseInt(e.target.dataset.id);
    if (confirm("¿Eliminar esta especialidad?")) {
      especialidadesStorage = especialidadesStorage.filter((e) => e.id !== id);
      localStorage.setItem(
        "especialidades",
        JSON.stringify(especialidadesStorage)
      );
      mostrarEspecialidades();
    }
  }
});

// Inicializar módulo
mostrarEspecialidades();
