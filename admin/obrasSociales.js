const obrasTab = document.getElementById("obrasTab");
let obrasSocialesStorage = JSON.parse(localStorage.getItem("obrasSociales") || "[]");


function mostrarFormularioObra(obra = null) {
  obrasTab.innerHTML = `
    <div class="card shadow-sm p-4 mb-4 bg-light">
      <h4 class="mb-3 text-${obra ? "warning" : "primary"}">${obra ? "Editar Obra Social" : "Nueva Obra Social"}</h5>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Nombre:</label>
          <input type="text" id="nombreObra" class="form-control" value="${obra ? obra.nombre : ""}">
        </div>
        <div class="col-md-6">
          <label class="form-label">Descripción:</label>
          <textarea id="descripcionObra" class="form-control">${obra ? obra.descripcion : ""}</textarea>
        </div>
      </div>
      <div class="mt-4">
        <button class="btn btn-${obra ? "warning" : "success"} me-2" id="guardarObraBtn">${obra ? "Guardar Cambios" : "Agregar Obra"}</button>
        <button class="btn btn-secondary" id="cancelarObraBtn">Cancelar</button>
      </div>
    </div>
  `;
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "guardarObraBtn") {
    const nombre = document.getElementById("nombreObra").value.trim();
    const descripcion = document.getElementById("descripcionObra").value.trim();

    if (!nombre || !descripcion) {
      alert("Complete todos los campos");
      return;
    }

    if (e.target.dataset.id) {
      const id = parseInt(e.target.dataset.id);
      const o = obrasStorage.find(o => o.id === id);
      Object.assign(o, { nombre, descripcion });
    } else {
      const nuevoId = obrasStorage.length > 0
        ? Math.max(...obrasStorage.map(o => parseInt(o.id) || 0)) + 1
        : 1;

      obrasStorage.push({ id: nuevoId, nombre, descripcion });
    }
    // Guarda en LocalStorage y actualiza 
    localStorage.setItem("obrasSociales", JSON.stringify(obrasSocialesStorage));
    mostrarObras();
  }

  if (e.target && e.target.id === "cancelarObraBtn") {
    mostrarObras();
  }
   // Editar obra social
  if (e.target && e.target.classList.contains("editarObraBtn")) {
    const id = parseInt(e.target.dataset.id);
    const obra = obrasSocialesStorage.find(o => o.id === id);
    mostrarFormularioObra(obra);
    document.getElementById("guardarObraBtn").dataset.id = id;
  }
//Eliminar obra social
  if (e.target && e.target.classList.contains("eliminarObraBtn")) {
    const id = parseInt(e.target.dataset.id);
    if (confirm("¿Desea eliminar esta obra social?")) {
      obrasStorage = obrasSocialesStorage.filter(o => o.id !== id);
      localStorage.setItem("obrasSociales", JSON.stringify(obrasSocialesStorage));
      mostrarObras();
    }
  }
});

function mostrarObras() {
  obrasTab.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="text-primary">Gestión de Obras Sociales</h4>
      <button class="btn btn-success" id="nuevaObraBtn">Nueva Obra Social</button>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-dark text-white">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${obrasSocialesStorage.map(o => `
            <tr>
              <td>${o.id}</td>
              <td>${o.nombre}</td>
              <td>${o.descripcion}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1 editarObraBtn" data-id="${o.id}">Editar</button>
                <button class="btn btn-danger btn-sm eliminarObraBtn" data-id="${o.id}">Eliminar</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById("nuevaObraBtn").addEventListener("click", () => mostrarFormularioObra());
}

mostrarObras();
