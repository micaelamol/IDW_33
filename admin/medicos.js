document.addEventListener("DOMContentLoaded", () => {
  const medicosTab = document.getElementById("medicos");
  let medicosStorage = JSON.parse(localStorage.getItem("medicos") || "[]");
  let especialidadesStorage = JSON.parse(localStorage.getItem("especialidades") || "[]");
  let obrasSocialesStorage = JSON.parse(localStorage.getItem("obrasSociales") || "[]");

  function mostrarMedicos() {
    medicosTab.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="text-primary">Listado de Médicos</h4>
        <button class="btn btn-success" onclick="agregarMedico()"> Agregar Médico</button>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th>ID</th><th>Nombre</th><th>Apellido</th><th>Matrícula</th><th>Especialidad</th><th>Obras Sociales</th><th>Valor Consulta</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${medicosStorage.map(m => `
              <tr>
                <td>${m.id}</td>
                <td>${m.nombre}</td>
                <td>${m.apellido}</td>
                <td>${m.matricula}</td>
                <td>${especialidadesStorage.find(e => e.id === m.especialidad)?.nombre || ""}</td>
                <td>${m.obrasSociales.map(osId => obrasSocialesStorage.find(o => o.id === osId)?.nombre).join(", ")}</td>
                <td>$${m.valorConsulta}</td>
                <td>
                  <button class="btn btn-warning btn-sm me-1" onclick="editarMedico(${m.id})">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="eliminarMedico(${m.id})">Eliminar</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  window.agregarMedico = function () {
  const especialidadesStorage = JSON.parse(localStorage.getItem("especialidades") || "[]");
  const obrasSocialesStorage = JSON.parse(localStorage.getItem("obrasSociales") || "[]");
    const formHtml = `
      <div class="card shadow-sm p-4 mb-4 bg-light" id="formMedicoCard">
        <h5 class="mb-3 text-success">Agregar Nuevo Médico</h5>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nombre:</label>
            <input type="text" id="nuevoNombre" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">Apellido:</label>
            <input type="text" id="nuevoApellido" class="form-control">
          </div>
          <div class="col-md-6">
              <label class="form-label">Matrícula:</label>
              <input type="number" id="nuevoMatricula" class="form-control">
          </div>
          <div class="col-md-6">
            <label class="form-label">Especialidad:</label>
            <select id="nuevoEspecialidad" class="form-select">
              ${especialidadesStorage.map(e => `<option value="${e.id}">${e.nombre}</option>`).join("")}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Obras Sociales:</label>
            <select id="nuevoObrasSociales" class="form-select" multiple>
              ${obrasSocialesStorage.map(o => `<option value="${o.id}">${o.nombre}</option>`).join("")}
            </select>
            <div class="form-text">Usá Ctrl (o Cmd) para seleccionar varias.</div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Valor de consulta:</label>
            <input type="number" id="nuevoValor" class="form-control">
          </div>
        </div>
        <div class="mt-4">
          <button class="btn btn-success me-2" id="guardarMedicoBtn">Guardar Médico</button>
          <button class="btn btn-secondary" id="cancelarMedicoBtn">Cancelar</button>
        </div>
      </div>
    `;

    medicosTab.insertAdjacentHTML("afterbegin", formHtml);

    document.getElementById("cancelarMedicoBtn").addEventListener("click", () => {
      document.getElementById("formMedicoCard").remove();
    });

    document.getElementById("guardarMedicoBtn").addEventListener("click", () => {
      const nombre = document.getElementById("nuevoNombre").value.trim();
      const apellido = document.getElementById("nuevoApellido").value.trim();
      //matricula
      const matricula = parseInt(document.getElementById("nuevoMatricula").value);
      const especialidad = parseInt(document.getElementById("nuevoEspecialidad").value);
      const obrasSeleccionadas = Array.from(document.getElementById("nuevoObrasSociales").selectedOptions).map(opt => parseInt(opt.value));
      const valorConsulta = parseFloat(document.getElementById("nuevoValor").value);

      if (!nombre || !apellido || isNaN(matricula) || isNaN(especialidad) || obrasSeleccionadas.length === 0 || isNaN(valorConsulta)) {
        alert("Por favor, completá todos los campos correctamente.");
        return;
        }

      const nuevoId = medicosStorage.length > 0
        ? Math.max(...medicosStorage.map(m => parseInt(m.id) || 0)) + 1
        : 1;

      const nuevoMedico = {
        id: nuevoId,
        nombre,
        apellido,
        matricula,
        especialidad,
        obrasSociales: obrasSeleccionadas,
        valorConsulta
      };

      medicosStorage.push(nuevoMedico);
      localStorage.setItem("medicos", JSON.stringify(medicosStorage));
      document.getElementById("formMedicoCard").remove();
      mostrarMedicos();
    });
  };

  window.editarMedico = function (id) {
    const medico = medicosStorage.find(m => m.id === id);
    if (!medico) return;

    const formHtml = `
      <div class="card shadow-sm p-4 mb-4 bg-light" id="formMedicoCard">
        <h5 class="mb-3 text-warning">Editar Médico</h5>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nombre:</label>
            <input type="text" id="nuevoNombre" class="form-control" value="${medico.nombre}">
          </div>
          <div class="col-md-6">
            <label class="form-label">Apellido:</label>
            <input type="text" id="nuevoApellido" class="form-control" value="${medico.apellido}">
          </div>
          <div class="col-md-6">
              <label class="form-label">Matrícula profesional:</label>
              <input type="number" id="nuevoMatricula" class="form-control" value="${medico.matricula}">
          </div>
          <div class="col-md-6">
            <label class="form-label">Especialidad:</label>
            <select id="nuevoEspecialidad" class="form-select">
              ${especialidadesStorage.map(e => `<option value="${e.id}" ${e.id === medico.especialidad ? "selected" : ""}>${e.nombre}</option>`).join("")}
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Obras Sociales:</label>
            <select id="nuevoObrasSociales" class="form-select" multiple>
              ${obrasSocialesStorage.map(o => `<option value="${o.id}" ${medico.obrasSociales.includes(o.id) ? "selected" : ""}>${o.nombre}</option>`).join("")}
            </select>
            <div class="form-text">Usá Ctrl (o Cmd) para seleccionar varias.</div>
          </div>
          <div class="col-md-6">
            <label class="form-label">Valor de consulta:</label>
            <input type="number" id="nuevoValor" class="form-control" value="${medico.valorConsulta}">
          </div>
        </div>
        <div class="mt-4">
          <button class="btn btn-warning me-2" id="guardarEdicionBtn">Guardar Cambios</button>
          <button class="btn btn-secondary" id="cancelarMedicoBtn">Cancelar</button>
        </div>
      </div>
    `;

    medicosTab.insertAdjacentHTML("afterbegin", formHtml);

    document.getElementById("cancelarMedicoBtn").addEventListener("click", () => {
      document.getElementById("formMedicoCard").remove();
    });

    document.getElementById("guardarEdicionBtn").addEventListener("click", () => {
      const nombre = document.getElementById("nuevoNombre").value.trim();
      const apellido = document.getElementById("nuevoApellido").value.trim();
      const matricula = parseInt(document.getElementById("nuevoMatricula").value);
      const especialidad = parseInt(document.getElementById("nuevoEspecialidad").value);
      const obrasSeleccionadas = Array.from(document.getElementById("nuevoObrasSociales").selectedOptions).map(opt => parseInt(opt.value));
      const valorConsulta = parseFloat(document.getElementById("nuevoValor").value);
      if (!nombre || !apellido || isNaN(matricula) || isNaN(especialidad) || obrasSeleccionadas.length === 0 || isNaN(valorConsulta)) {
          alert("Por favor, completá todos los campos correctamente.");
              return;
      }

      // Actualizar datos del médico
      medico.nombre = nombre;
      medico.apellido = apellido;
      medico.matricula = matricula;
      medico.especialidad = especialidad;
      medico.obrasSociales = obrasSeleccionadas;
      medico.valorConsulta = valorConsulta;

      localStorage.setItem("medicos", JSON.stringify(medicosStorage));
      mostrarMedicos();
      document.getElementById("formMedicoCard").remove();
    });
  };

  window.eliminarMedico = function (id) {
    if (confirm("¿Eliminar este médico?")) {
      medicosStorage = medicosStorage.filter(m => m.id !== id);
      localStorage.setItem("medicos", JSON.stringify(medicosStorage));
      mostrarMedicos();
    }
  };

  mostrarMedicos();
});