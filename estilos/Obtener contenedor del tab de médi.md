// Obtener contenedor del tab de médicos

document.addEventListener("DOMContentLoaded", () => {

&nbsp; const medicosTab = document.getElementById("medicos");

&nbsp; let medicosStorage = JSON.parse(localStorage.getItem("medicos") || "\[]");

&nbsp; let especialidadesStorage = JSON.parse(localStorage.getItem("especialidades") || "\[]");

&nbsp; let obrasSocialesStorage = JSON.parse(localStorage.getItem("obrasSociales") || "\[]");

&nbsp; const nuevoId = medicosStorage.length > 0

&nbsp; ? Math.max(...medicosStorage.map(m => parseInt(m.id) || 0)) + 1

&nbsp; : 1;

&nbsp; function mostrarMedicos() {

&nbsp;   medicosTab.innerHTML = `

&nbsp;     <div class="d-flex justify-content-between align-items-center mb-3">

&nbsp;       <h4 class="text-primary">Listado de Médicos</h4>

&nbsp;       <button class="btn btn-success" onclick="agregarMedico()">➕ Agregar Médico</button>

&nbsp;     </div>

&nbsp;     <div class="table-responsive">

&nbsp;       <table class="table table-bordered table-hover align-middle">

&nbsp;         <thead class="table-dark">

&nbsp;           <tr>

&nbsp;             <th>ID</th><th>Nombre</th><th>Apellido</th><th>Especialidad</th><th>Obras Sociales</th><th>Valor Consulta</th><th>Acciones</th>

&nbsp;           </tr>

&nbsp;         </thead>

&nbsp;         <tbody>

&nbsp;           ${medicosStorage.map(m => `

&nbsp;             <tr>

&nbsp;               <td>${m.id}</td>

&nbsp;               <td>${m.nombre}</td>

&nbsp;               <td>${m.apellido}</td>

&nbsp;               <td>${especialidadesStorage.find(e => e.id === m.especialidad)?.nombre || ""}</td>

&nbsp;               <td>${m.obrasSociales.map(osId => obrasSocialesStorage.find(o => o.id === osId)?.nombre).join(", ")}</td>

&nbsp;               <td>$${m.valorConsulta}</td>

&nbsp;               <td>

&nbsp;                 <button class="btn btn-warning btn-sm me-1" onclick="editarMedico(${m.id})">Editar</button>

&nbsp;                 <button class="btn btn-danger btn-sm" onclick="eliminarMedico(${m.id})">Eliminar</button>

&nbsp;               </td>

&nbsp;             </tr>

&nbsp;           `).join("")}

&nbsp;         </tbody>

&nbsp;       </table>

&nbsp;     </div>

&nbsp;   `;

&nbsp; }



&nbsp; window.agregarMedico = function () {

&nbsp;   const formHtml = `

&nbsp;     <div class="card shadow-sm p-4 mb-4 bg-light" id="formMedicoCard">

&nbsp;       <h5 class="mb-3 text-success">Agregar Nuevo Médico</h5>

&nbsp;       <div class="row g-3">

&nbsp;         <div class="col-md-6">

&nbsp;           <label class="form-label">Nombre:</label>

&nbsp;           <input type="text" id="nuevoNombre" class="form-control">

&nbsp;         </div>

&nbsp;         <div class="col-md-6">

&nbsp;           <label class="form-label">Apellido:</label>

&nbsp;           <input type="text" id="nuevoApellido" class="form-control">

&nbsp;         </div>

&nbsp;         <div class="col-md-6">

&nbsp;           <label class="form-label">Especialidad:</label>

&nbsp;           <select id="nuevoEspecialidad" class="form-select">

&nbsp;             ${especialidadesStorage.map(e => `<option value="${e.id}">${e.nombre}</option>`).join("")}

&nbsp;           </select>

&nbsp;         </div>

&nbsp;         <div class="col-md-6">

&nbsp;           <label class="form-label">Obras Sociales:</label>

&nbsp;           <select id="nuevoObrasSociales" class="form-select" multiple>

&nbsp;             ${obrasSocialesStorage.map(o => `<option value="${o.id}">${o.nombre}</option>`).join("")}

&nbsp;           </select>

&nbsp;           <div class="form-text">Usá Ctrl (o Cmd) para seleccionar varias.</div>

&nbsp;         </div>

&nbsp;         <div class="col-md-6">

&nbsp;           <label class="form-label">Valor de consulta:</label>

&nbsp;           <input type="number" id="nuevoValor" class="form-control">

&nbsp;         </div>

&nbsp;       </div>

&nbsp;       <div class="mt-4">

&nbsp;         <button class="btn btn-success me-2" id="guardarMedicoBtn">Guardar Médico</button>

&nbsp;         <button class="btn btn-secondary" id="cancelarMedicoBtn">Cancelar</button>

&nbsp;       </div>

&nbsp;     </div>

&nbsp;   `;



&nbsp;   medicosTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp;   document.getElementById("cancelarMedicoBtn").addEventListener("click", () => {

&nbsp;     document.getElementById("formMedicoCard").remove();

&nbsp;   });



&nbsp;   document.getElementById("guardarMedicoBtn").addEventListener("click", () => {

&nbsp;     const nombre = document.getElementById("nuevoNombre").value.trim();

&nbsp;     const apellido = document.getElementById("nuevoApellido").value.trim();

&nbsp;     const especialidad = parseInt(document.getElementById("nuevoEspecialidad").value);

&nbsp;     const obrasSeleccionadas = Array.from(document.getElementById("nuevoObrasSociales").selectedOptions).map(opt => parseInt(opt.value));

&nbsp;     const valorConsulta = parseFloat(document.getElementById("nuevoValor").value);



&nbsp;     if (!nombre || !apellido || isNaN(especialidad) || obrasSeleccionadas.length === 0 || isNaN(valorConsulta)) {

&nbsp;       alert("Por favor, completá todos los campos correctamente.");

&nbsp;       return;

&nbsp;     }



&nbsp;    



&nbsp;     const nuevoMedico = {

&nbsp;       id: nuevoId,

&nbsp;       nombre,

&nbsp;       apellido,

&nbsp;       especialidad,

&nbsp;       obrasSociales: obrasSeleccionadas,

&nbsp;       valorConsulta

&nbsp;     };



&nbsp;     medicosStorage.push(nuevoMedico);

&nbsp;     localStorage.setItem("medicos", JSON.stringify(medicosStorage));

&nbsp;     mostrarMedicos();

&nbsp;     document.getElementById("formMedicoCard").remove();

&nbsp;   });

&nbsp; };



&nbsp; window.eliminarMedico = function (id) {

&nbsp;   if (confirm("¿Eliminar este médico?")) {

&nbsp;     medicosStorage = medicosStorage.filter(m => m.id !== id);

&nbsp;     localStorage.setItem("medicos", JSON.stringify(medicosStorage));

&nbsp;     mostrarMedicos();

&nbsp;   }

&nbsp; };



&nbsp; mostrarMedicos();

});

function editarMedico(id) {

&nbsp; const medico = medicosStorage.find(m => m.id === id);

&nbsp; if (!medico) return;



&nbsp; const formHtml = `

&nbsp;   <div class="card shadow-sm p-4 mb-4 bg-light" id="formMedicoCard">

&nbsp;     <h5 class="mb-3 text-warning">Editar Médico</h5>

&nbsp;     <div class="row g-3">

&nbsp;       <div class="col-md-6">

&nbsp;         <label class="form-label">Nombre:</label>

&nbsp;         <input type="text" id="nuevoNombre" class="form-control" value="${medico.nombre}">

&nbsp;       </div>

&nbsp;       <div class="col-md-6">

&nbsp;         <label class="form-label">Apellido:</label>

&nbsp;         <input type="text" id="nuevoApellido" class="form-control" value="${medico.apellido}">

&nbsp;       </div>

&nbsp;       <div class="col-md-6">

&nbsp;         <label class="form-label">Especialidad:</label>

&nbsp;         <select id="nuevoEspecialidad" class="form-select">

&nbsp;           ${especialidadesStorage.map(e => `<option value="${e.id}" ${e.id === medico.especialidad ? "selected" : ""}>${e.nombre}</option>`).join("")}

&nbsp;         </select>

&nbsp;       </div>

&nbsp;       <div class="col-md-6">

&nbsp;         <label class="form-label">Obras Sociales:</label>

&nbsp;         <select id="nuevoObrasSociales" class="form-select" multiple>

&nbsp;           ${obrasSocialesStorage.map(o => `<option value="${o.id}" ${medico.obrasSociales.includes(o.id) ? "selected" : ""}>${o.nombre}</option>`).join("")}

&nbsp;         </select>

&nbsp;         <div class="form-text">Usá Ctrl (o Cmd) para seleccionar varias.</div>

&nbsp;       </div>

&nbsp;       <div class="col-md-6">

&nbsp;         <label class="form-label">Valor de consulta:</label>

&nbsp;         <input type="number" id="nuevoValor" class="form-control" value="${medico.valorConsulta}">

&nbsp;       </div>

&nbsp;     </div>

&nbsp;     <div class="mt-4">

&nbsp;       <button class="btn btn-warning me-2" id="guardarEdicionBtn">Guardar Cambios</button>

&nbsp;       <button class="btn btn-secondary" id="cancelarMedicoBtn">Cancelar</button>

&nbsp;     </div>

&nbsp;   </div>

&nbsp; `;



&nbsp; medicosTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; document.getElementById("cancelarMedicoBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formMedicoCard").remove();

&nbsp; });



&nbsp; document.getElementById("guardarEdicionBtn").addEventListener("click", () => {

&nbsp;   const nombre = document.getElementById("nuevoNombre").value.trim();

&nbsp;   const apellido = document.getElementById("nuevoApellido").value.trim();

&nbsp;   const especialidad = parseInt(document.getElementById("nuevoEspecialidad").value);

&nbsp;   const obrasSeleccionadas = Array.from(document.getElementById("nuevoObrasSociales").selectedOptions).map(opt => parseInt(opt.value));

&nbsp;   const valorConsulta = parseFloat(document.getElementById("nuevoValor").value);



&nbsp;   if (!nombre || !apellido || isNaN(especialidad) || obrasSeleccionadas.length === 0 || isNaN(valorConsulta)) {

&nbsp;     alert("Por favor, completá todos los campos correctamente.");

&nbsp;     return;

&nbsp;   }



&nbsp;   // Actualizar datos

&nbsp;   medico.nombre = nombre;

&nbsp;   medico.apellido = apellido;

&nbsp;   medico.especialidad = especialidad;

&nbsp;   medico.obrasSociales = obrasSeleccionadas;

&nbsp;   medico.valorConsulta = valorConsulta;



&nbsp;   localStorage.setItem("medicos", JSON.stringify(medicosStorage));

&nbsp;   mostrarMedicos();

&nbsp;   document.getElementById("formMedicoCard").remove();

&nbsp; });

}

-----------------------------------------------------------------

admin.js



// admin.js



// Obtener contenedores

const medicosTab = document.getElementById("medicos");

const especialidadesTab = document.getElementById("especialidades");

const obrasTab = document.getElementById("obras");

const reservasTab = document.getElementById("reservas");

let turnosStorage = JSON.parse(localStorage.getItem("turnos")) || \[];

const turnosTab = document.getElementById("turnosTab"); 



// Cargar datos desde LocalStorage

let medicosStorage = JSON.parse(localStorage.getItem("medicos") || "\[]");

let especialidadesStorage = JSON.parse(localStorage.getItem("especialidades") || "\[]");

let obrasSocialesStorage = JSON.parse(localStorage.getItem("obrasSociales") || "\[]");

let reservasStorage = JSON.parse(localStorage.getItem("reservas") || "\[]");



// Función para mostrar médicos en tabla

function mostrarMedicos() {

&nbsp; medicosTab.innerHTML = `

&nbsp;   <button class="btn btn-success mb-2" onclick="agregarMedico()">Agregar Médico</button>

&nbsp;   <table class="table table-bordered table-striped">

&nbsp;     <thead>

&nbsp;       <tr>

&nbsp;         <th>ID</th><th>Nombre</th><th>Apellido</th><th>Especialidad</th><th>Obras Sociales</th><th>Valor Consulta</th><th>Acciones</th>

&nbsp;       </tr>

&nbsp;     </thead>

&nbsp;     <tbody>

&nbsp;       ${medicosStorage.map(m => `

&nbsp;         <tr>

&nbsp;           <td>${m.id}</td>

&nbsp;           <td>${m.nombre}</td>

&nbsp;           <td>${m.apellido}</td>

&nbsp;           <td>${especialidadesStorage.find(e => e.id === m.especialidad)?.nombre || ""}</td>

&nbsp;           <td>${m.obrasSociales.map(osId => obrasSocialesStorage.find(o => o.id === osId)?.nombre).join(", ")}</td>

&nbsp;           <td>$${m.valorConsulta}</td>

&nbsp;           <td>

&nbsp;             <button class="btn btn-warning btn-sm" onclick="editarMedico(${m.id})">Editar</button>

&nbsp;             <button class="btn btn-danger btn-sm" onclick="eliminarMedico(${m.id})">Eliminar</button>

&nbsp;           </td>

&nbsp;         </tr>

&nbsp;       `).join("")}

&nbsp;     </tbody>

&nbsp;   </table>

&nbsp; `;

}



// Funciones vacías para agregar, editar y eliminar (vamos a completarlas después)

//function agregarMedico() { alert("Agregar Médico"); }

//function editarMedico(id) { alert("Editar Médico ID " + id); }

//function eliminarMedico(id) { 

&nbsp; if(confirm("¿Eliminar este médico?")){

&nbsp;   medicosStorage = medicosStorage.filter(m => m.id !== id);

&nbsp;   localStorage.setItem("medicos", JSON.stringify(medicosStorage));

&nbsp;   mostrarMedicos();

&nbsp; }

//}



// Mostrar médicos al cargar la página

mostrarMedicos();

function agregarMedico() {

&nbsp; // Crear un formulario dinámico en un modal o div temporal

&nbsp; const formHtml = `

&nbsp;   <div class="card p-3 mb-3" id="formMedicoCard">

&nbsp;     <h5>Agregar Nuevo Médico</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Nombre:</label>

&nbsp;       <input type="text" id="nuevoNombre" class="form-control">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Apellido:</label>

&nbsp;       <input type="text" id="nuevoApellido" class="form-control">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Especialidad:</label>

&nbsp;       <select id="nuevoEspecialidad" class="form-select">

&nbsp;         ${especialidadesStorage.map(e => `<option value="${e.id}">${e.nombre}</option>`).join("")}

&nbsp;       </select>

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Obras Sociales:</label>

&nbsp;       <select id="nuevoObrasSociales" class="form-select" multiple>

&nbsp;         ${obrasSocialesStorage.map(o => `<option value="${o.id}">${o.nombre}</option>`).join("")}

&nbsp;       </select>

&nbsp;       <small class="text-muted">Mantén presionada la tecla Ctrl (o Cmd) para seleccionar varias.</small>

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Valor de consulta:</label>

&nbsp;       <input type="number" id="nuevoValor" class="form-control">

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarMedicoBtn">Guardar Médico</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarMedicoBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;



&nbsp; medicosTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; // Botón Cancelar

&nbsp; document.getElementById("cancelarMedicoBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formMedicoCard").remove();

&nbsp; });



&nbsp; // Botón Guardar

&nbsp; document.getElementById("guardarMedicoBtn").addEventListener("click", () => {

&nbsp;   const nombre = document.getElementById("nuevoNombre").value.trim();

&nbsp;   const apellido = document.getElementById("nuevoApellido").value.trim();

&nbsp;   const especialidad = parseInt(document.getElementById("nuevoEspecialidad").value);

&nbsp;   const obrasSociales = Array.from(document.getElementById("nuevoObrasSociales").selectedOptions).map(o => parseInt(o.value));

&nbsp;   const valorConsulta = parseFloat(document.getElementById("nuevoValor").value);



&nbsp;   if (!nombre || !apellido || !especialidad || obrasSociales.length === 0 || isNaN(valorConsulta)) {

&nbsp;     alert("Completa todos los campos correctamente.");

&nbsp;     return;

&nbsp;   }



&nbsp;   const nuevoMedico = {

&nbsp;     id: Date.now(),

&nbsp;     nombre,

&nbsp;     apellido,

&nbsp;     especialidad,

&nbsp;     obrasSociales,

&nbsp;     valorConsulta

&nbsp;   };



&nbsp;   medicosStorage.push(nuevoMedico);

&nbsp;   localStorage.setItem("medicos", JSON.stringify(medicosStorage));



&nbsp;   document.getElementById("formMedicoCard").remove();

&nbsp;   mostrarMedicos();

&nbsp; });

}

function editarMedico(id) {

&nbsp; // Buscar el médico por ID

&nbsp; const medico = medicosStorage.find(m => m.id === id);

&nbsp; if (!medico) return;



&nbsp; // Crear formulario dinámico con datos cargados

&nbsp; const formHtml = `

&nbsp;   <div class="card p-3 mb-3" id="formMedicoCard">

&nbsp;     <h5>Editar Médico</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Nombre:</label>

&nbsp;       <input type="text" id="editarNombre" class="form-control" value="${medico.nombre}">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Apellido:</label>

&nbsp;       <input type="text" id="editarApellido" class="form-control" value="${medico.apellido}">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Especialidad:</label>

&nbsp;       <select id="editarEspecialidad" class="form-select">

&nbsp;         ${especialidadesStorage.map(e => `<option value="${e.id}" ${e.id === medico.especialidad ? "selected" : ""}>${e.nombre}</option>`).join("")}

&nbsp;       </select>

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Obras Sociales:</label>

&nbsp;       <select id="editarObrasSociales" class="form-select" multiple>

&nbsp;         ${obrasSocialesStorage.map(o => `<option value="${o.id}" ${medico.obrasSociales.includes(o.id) ? "selected" : ""}>${o.nombre}</option>`).join("")}

&nbsp;       </select>

&nbsp;       <small class="text-muted">Mantén presionada la tecla Ctrl (o Cmd) para seleccionar varias.</small>

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Valor de consulta:</label>

&nbsp;       <input type="number" id="editarValor" class="form-control" value="${medico.valorConsulta}">

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarEdicionBtn">Guardar Cambios</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarEdicionBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;



&nbsp; medicosTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; // Botón Cancelar

&nbsp; document.getElementById("cancelarEdicionBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formMedicoCard").remove();

&nbsp; });



&nbsp; // Botón Guardar cambios

&nbsp; document.getElementById("guardarEdicionBtn").addEventListener("click", () => {

&nbsp;   const nombre = document.getElementById("editarNombre").value.trim();

&nbsp;   const apellido = document.getElementById("editarApellido").value.trim();

&nbsp;   const especialidad = parseInt(document.getElementById("editarEspecialidad").value);

&nbsp;   const obrasSociales = Array.from(document.getElementById("editarObrasSociales").selectedOptions).map(o => parseInt(o.value));

&nbsp;   const valorConsulta = parseFloat(document.getElementById("editarValor").value);



&nbsp;   if (!nombre || !apellido || !especialidad || obrasSociales.length === 0 || isNaN(valorConsulta)) {

&nbsp;     alert("Completa todos los campos correctamente.");

&nbsp;     return;

&nbsp;   }



&nbsp;   // Actualizar médico

&nbsp;   medico.nombre = nombre;

&nbsp;   medico.apellido = apellido;

&nbsp;   medico.especialidad = especialidad;

&nbsp;   medico.obrasSociales = obrasSociales;

&nbsp;   medico.valorConsulta = valorConsulta;



&nbsp;   localStorage.setItem("medicos", JSON.stringify(medicosStorage));



&nbsp;   document.getElementById("formMedicoCard").remove();

&nbsp;   mostrarMedicos();

&nbsp; });

}

// Mostrar Especialidades en tabla

function mostrarEspecialidades() {

&nbsp; especialidadesTab.innerHTML = `

&nbsp;   <button class="btn btn-success mb-2" onclick="agregarEspecialidad()">Agregar Especialidad</button>

&nbsp;   <table class="table table-bordered table-striped">

&nbsp;     <thead>

&nbsp;       <tr>

&nbsp;         <th>ID</th><th>Nombre</th><th>Acciones</th>

&nbsp;       </tr>

&nbsp;     </thead>

&nbsp;     <tbody>

&nbsp;       ${especialidadesStorage.map(e => `

&nbsp;         <tr>

&nbsp;           <td>${e.id}</td>

&nbsp;           <td>${e.nombre}</td>

&nbsp;           <td>

&nbsp;             <button class="btn btn-warning btn-sm" onclick="editarEspecialidad(${e.id})">Editar</button>

&nbsp;             <button class="btn btn-danger btn-sm" onclick="eliminarEspecialidad(${e.id})">Eliminar</button>

&nbsp;           </td>

&nbsp;         </tr>

&nbsp;       `).join("")}

&nbsp;     </tbody>

&nbsp;   </table>

&nbsp; `;

}



// Agregar Especialidad

function agregarEspecialidad() {

&nbsp; const formHtml = `

&nbsp;   <div class="card p-3 mb-3" id="formEspecialidadCard">

&nbsp;     <h5>Agregar Nueva Especialidad</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Nombre:</label>

&nbsp;       <input type="text" id="nuevoNombreEsp" class="form-control">

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarEspBtn">Guardar</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarEspBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;

&nbsp; especialidadesTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; document.getElementById("cancelarEspBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formEspecialidadCard").remove();

&nbsp; });



&nbsp; document.getElementById("guardarEspBtn").addEventListener("click", () => {

&nbsp;   const nombre = document.getElementById("nuevoNombreEsp").value.trim();

&nbsp;   if (!nombre) { alert("Ingresa un nombre válido"); return; }



&nbsp;   const nuevaEspecialidad = {

&nbsp;     id: Date.now(),

&nbsp;     nombre

&nbsp;   };



&nbsp;   especialidadesStorage.push(nuevaEspecialidad);

&nbsp;   localStorage.setItem("especialidades", JSON.stringify(especialidadesStorage));



&nbsp;   document.getElementById("formEspecialidadCard").remove();

&nbsp;   mostrarEspecialidades();

&nbsp; });

}



// Editar Especialidad

function editarEspecialidad(id) {

&nbsp; const esp = especialidadesStorage.find(e => e.id === id);

&nbsp; if (!esp) return;



&nbsp; const formHtml = `

&nbsp;   <div class="card p-3 mb-3" id="formEspecialidadCard">

&nbsp;     <h5>Editar Especialidad</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Nombre:</label>

&nbsp;       <input type="text" id="editarNombreEsp" class="form-control" value="${esp.nombre}">

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarEdicionEspBtn">Guardar Cambios</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarEdicionEspBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;

&nbsp; especialidadesTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; document.getElementById("cancelarEdicionEspBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formEspecialidadCard").remove();

&nbsp; });



&nbsp; document.getElementById("guardarEdicionEspBtn").addEventListener("click", () => {

&nbsp;   const nombre = document.getElementById("editarNombreEsp").value.trim();

&nbsp;   if (!nombre) { alert("Ingresa un nombre válido"); return; }



&nbsp;   esp.nombre = nombre;

&nbsp;   localStorage.setItem("especialidades", JSON.stringify(especialidadesStorage));



&nbsp;   document.getElementById("formEspecialidadCard").remove();

&nbsp;   mostrarEspecialidades();

&nbsp; });

}



// Eliminar Especialidad

function eliminarEspecialidad(id) {

&nbsp; if(confirm("¿Eliminar esta especialidad?")){

&nbsp;   especialidadesStorage = especialidadesStorage.filter(e => e.id !== id);

&nbsp;   localStorage.setItem("especialidades", JSON.stringify(especialidadesStorage));

&nbsp;   mostrarEspecialidades();

&nbsp; }

}



// Mostrar especialidades al cargar la pestaña

mostrarEspecialidades();

// Mostrar Obras Sociales en tabla

function mostrarObrasSociales() {

&nbsp; obrasSocialesTab.innerHTML = `

&nbsp;   <button class="btn btn-success mb-2" onclick="agregarObraSocial()">Agregar Obra Social</button>

&nbsp;   <table class="table table-bordered table-striped">

&nbsp;     <thead>

&nbsp;       <tr>

&nbsp;         <th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th>

&nbsp;       </tr>

&nbsp;     </thead>

&nbsp;     <tbody>

&nbsp;       ${obrasSocialesStorage.map(o => `

&nbsp;         <tr>

&nbsp;           <td>${o.id}</td>

&nbsp;           <td>${o.nombre}</td>

&nbsp;           <td>${o.descripcion}</td>

&nbsp;           <td>

&nbsp;             <button class="btn btn-warning btn-sm" onclick="editarObraSocial(${o.id})">Editar</button>

&nbsp;             <button class="btn btn-danger btn-sm" onclick="eliminarObraSocial(${o.id})">Eliminar</button>

&nbsp;           </td>

&nbsp;         </tr>

&nbsp;       `).join("")}

&nbsp;     </tbody>

&nbsp;   </table>

&nbsp; `;

}



// Agregar Obra Social

function agregarObraSocial() {

&nbsp; const formHtml = `

&nbsp;   <div class="card p-3 mb-3" id="formObraCard">

&nbsp;     <h5>Agregar Nueva Obra Social</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Nombre:</label>

&nbsp;       <input type="text" id="nuevoNombreObra" class="form-control">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Descripción:</label>

&nbsp;       <input type="text" id="nuevaDescripcionObra" class="form-control">

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarObraBtn">Guardar</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarObraBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;

&nbsp; obrasSocialesTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; document.getElementById("cancelarObraBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formObraCard").remove();

&nbsp; });



&nbsp; document.getElementById("guardarObraBtn").addEventListener("click", () => {

&nbsp;   const nombre = document.getElementById("nuevoNombreObra").value.trim();

&nbsp;   const descripcion = document.getElementById("nuevaDescripcionObra").value.trim();

&nbsp;   if (!nombre || !descripcion) { alert("Completa todos los campos"); return; }



&nbsp;   const nuevaObra = {

&nbsp;     id: Date.now(),

&nbsp;     nombre,

&nbsp;     descripcion

&nbsp;   };



&nbsp;   obrasSocialesStorage.push(nuevaObra);

&nbsp;   localStorage.setItem("obrasSociales", JSON.stringify(obrasSocialesStorage));



&nbsp;   document.getElementById("formObraCard").remove();

&nbsp;   mostrarObrasSociales();

&nbsp; });

}



// Editar Obra Social

function editarObraSocial(id) {

&nbsp; const obra = obrasSocialesStorage.find(o => o.id === id);

&nbsp; if (!obra) return;



&nbsp; const formHtml = `

&nbsp;   <div class="card p-3 mb-3" id="formObraCard">

&nbsp;     <h5>Editar Obra Social</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Nombre:</label>

&nbsp;       <input type="text" id="editarNombreObra" class="form-control" value="${obra.nombre}">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Descripción:</label>

&nbsp;       <input type="text" id="editarDescripcionObra" class="form-control" value="${obra.descripcion}">

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarEdicionObraBtn">Guardar Cambios</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarEdicionObraBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;

&nbsp; obrasSocialesTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; document.getElementById("cancelarEdicionObraBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formObraCard").remove();

&nbsp; });



&nbsp; document.getElementById("guardarEdicionObraBtn").addEventListener("click", () => {

&nbsp;   const nombre = document.getElementById("editarNombreObra").value.trim();

&nbsp;   const descripcion = document.getElementById("editarDescripcionObra").value.trim();

&nbsp;   if (!nombre || !descripcion) { alert("Completa todos los campos"); return; }



&nbsp;   obra.nombre = nombre;

&nbsp;   obra.descripcion = descripcion;

&nbsp;   localStorage.setItem("obrasSociales", JSON.stringify(obrasSocialesStorage));



&nbsp;   document.getElementById("formObraCard").remove();

&nbsp;   mostrarObrasSociales();

&nbsp; });

}



// Eliminar Obra Social

function eliminarObraSocial(id) {

&nbsp; if(confirm("¿Eliminar esta obra social?")){

&nbsp;   obrasSocialesStorage = obrasSocialesStorage.filter(o => o.id !== id);

&nbsp;   localStorage.setItem("obrasSociales", JSON.stringify(obrasSocialesStorage));

&nbsp;   mostrarObrasSociales();

&nbsp; }

}



// Mostrar obras sociales al cargar la pestaña

mostrarObrasSociales();





/////////////////////TURNOS VER SI NO CONVIENE HACER UN LOGIN USUARIO

// Mostrar Turnos en tabla

function mostrarTurnos() {

&nbsp; turnosTab.innerHTML = `

&nbsp;   <button class="btn btn-success mb-2" onclick="agregarTurno()">Agregar Turno</button>

&nbsp;   <table class="table table-bordered table-striped">

&nbsp;     <thead>

&nbsp;       <tr>

&nbsp;         <th>ID</th>

&nbsp;         <th>Médico</th>

&nbsp;         <th>Fecha y Hora</th>

&nbsp;         <th>Disponible</th>

&nbsp;         <th>Acciones</th>

&nbsp;       </tr>

&nbsp;     </thead>

&nbsp;     <tbody>

&nbsp;       ${turnosStorage.map(t => `

&nbsp;         <tr>

&nbsp;           <td>${t.id}</td>

&nbsp;           <td>${medicosStorage.find(m => m.id === t.medico)?.nombre || "Sin asignar"}</td>

&nbsp;           <td>${t.fechaHora}</td>

&nbsp;           <td>${t.disponible ? "Sí" : "No"}</td>

&nbsp;           <td>

&nbsp;             <button class="btn btn-warning btn-sm" onclick="editarTurno(${t.id})">Editar</button>

&nbsp;             <button class="btn btn-danger btn-sm" onclick="eliminarTurno(${t.id})">Eliminar</button>

&nbsp;           </td>

&nbsp;         </tr>

&nbsp;       `).join("")}

&nbsp;     </tbody>

&nbsp;   </table>

&nbsp; `;

}



// Agregar Turno

function agregarTurno() {

&nbsp; const formHtml = `

&nbsp;   <div class="card p-3 mb-3" id="formTurnoCard">

&nbsp;     <h5>Agregar Nuevo Turno</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Médico:</label>

&nbsp;       <select id="nuevoMedicoTurno" class="form-select">

&nbsp;         ${medicosStorage.map(m => `<option value="${m.id}">${m.nombre} ${m.apellido}</option>`).join("")}

&nbsp;       </select>

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Fecha y Hora:</label>

&nbsp;       <input type="datetime-local" id="nuevaFechaHora" class="form-control">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Disponible:</label>

&nbsp;       <select id="nuevoDisponible" class="form-select">

&nbsp;         <option value="true" selected>Sí</option>

&nbsp;         <option value="false">No</option>

&nbsp;       </select>

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarTurnoBtn">Guardar</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarTurnoBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;

&nbsp; turnosTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; document.getElementById("cancelarTurnoBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formTurnoCard").remove();

&nbsp; });



&nbsp; document.getElementById("guardarTurnoBtn").addEventListener("click", () => {

&nbsp;   const medicoId = parseInt(document.getElementById("nuevoMedicoTurno").value);

&nbsp;   const fechaHora = document.getElementById("nuevaFechaHora").value;

&nbsp;   const disponible = document.getElementById("nuevoDisponible").value === "true";



&nbsp;   if (!medicoId || !fechaHora) { alert("Completa todos los campos"); return; }



&nbsp;   const nuevoTurno = {

&nbsp;     id: Date.now(),

&nbsp;     medico: medicoId,

&nbsp;     fechaHora,

&nbsp;     disponible

&nbsp;   };



&nbsp;   turnosStorage.push(nuevoTurno);

&nbsp;   localStorage.setItem("turnos", JSON.stringify(turnosStorage));



&nbsp;   document.getElementById("formTurnoCard").remove();

&nbsp;   mostrarTurnos();

&nbsp; });

}



// Editar Turno

function editarTurno(id) {

&nbsp; const turno = turnosStorage.find(t => t.id === id);

&nbsp; if (!turno) return;



&nbsp; const formHtml = `

&nbsp;   <div class="card p-3 mb-3" id="formTurnoCard">

&nbsp;     <h5>Editar Turno</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Médico:</label>

&nbsp;       <select id="editarMedicoTurno" class="form-select">

&nbsp;         ${medicosStorage.map(m => `<option value="${m.id}" ${m.id === turno.medico ? "selected" : ""}>${m.nombre} ${m.apellido}</option>`).join("")}

&nbsp;       </select>

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Fecha y Hora:</label>

&nbsp;       <input type="datetime-local" id="editarFechaHora" class="form-control" value="${turno.fechaHora}">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Disponible:</label>

&nbsp;       <select id="editarDisponible" class="form-select">

&nbsp;         <option value="true" ${turno.disponible ? "selected" : ""}>Sí</option>

&nbsp;         <option value="false" ${!turno.disponible ? "selected" : ""}>No</option>

&nbsp;       </select>

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarEdicionTurnoBtn">Guardar Cambios</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarEdicionTurnoBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;

&nbsp; turnosTab.insertAdjacentHTML("afterbegin", formHtml);



&nbsp; document.getElementById("cancelarEdicionTurnoBtn").addEventListener("click", () => {

&nbsp;   document.getElementById("formTurnoCard").remove();

&nbsp; });



&nbsp; document.getElementById("guardarEdicionTurnoBtn").addEventListener("click", () => {

&nbsp;   const medicoId = parseInt(document.getElementById("editarMedicoTurno").value);

&nbsp;   const fechaHora = document.getElementById("editarFechaHora").value;

&nbsp;   const disponible = document.getElementById("editarDisponible").value === "true";



&nbsp;   if (!medicoId || !fechaHora) { alert("Completa todos los campos"); return; }



&nbsp;   turno.medico = medicoId;

&nbsp;   turno.fechaHora = fechaHora;

&nbsp;   turno.disponible = disponible;



&nbsp;   localStorage.setItem("turnos", JSON.stringify(turnosStorage));

&nbsp;   document.getElementById("formTurnoCard").remove();

&nbsp;   mostrarTurnos();

&nbsp; });

}



// Eliminar Turno

function eliminarTurno(id) {

&nbsp; if(confirm("¿Eliminar este turno?")){

&nbsp;   turnosStorage = turnosStorage.filter(t => t.id !== id);

&nbsp;   localStorage.setItem("turnos", JSON.stringify(turnosStorage));

&nbsp;   mostrarTurnos();

&nbsp; }

}



// Mostrar turnos al cargar la pestaña

mostrarTurnos();

------------------------------------------------------

ESPACIALIDAD.HTML

<!DOCTYPE html>

<html lang="es">

<head>

&nbsp; <meta charset="UTF-8">

&nbsp; <meta name="viewport" content="width=device-width, initial-scale=1.0">

&nbsp; <title>Especialidades - Administración</title>

&nbsp; <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body>

&nbsp; <div class="container my-4">

&nbsp;   <h2>Gestión de Especialidades</h2>

&nbsp;   <div id="especialidadesTab"></div>

&nbsp; </div>



&nbsp; <script src="especialidades.js"></script>

</body>

</html>

---------------------------------------

ESPECIALIDAD.JS

// Obtener contenedor del tab de especialidades

const especialidadesTab = document.getElementById("especialidades");



// Cargar datos desde LocalStorage

let especialidadesStorage = JSON.parse(localStorage.getItem("especialidades") || "\[]");



// Mostrar tabla de especialidades

function mostrarEspecialidades() {

&nbsp; especialidadesTab.innerHTML = `

&nbsp;   <div class="d-flex justify-content-between align-items-center mb-3">

&nbsp;     <h4 class="text-primary">Listado de Especialidades</h4>

&nbsp;     <button class="btn btn-success" id="nuevaEspecialidadBtn">➕ Nueva Especialidad</button>

&nbsp;   </div>

&nbsp;   <table class="table table-bordered table-hover">

&nbsp;     <thead class="table-dark">

&nbsp;       <tr>

&nbsp;         <th>ID</th>

&nbsp;         <th>Nombre</th>

&nbsp;         <th>Acciones</th>

&nbsp;       </tr>

&nbsp;     </thead>

&nbsp;     <tbody>

&nbsp;       ${especialidadesStorage.map(e => `

&nbsp;         <tr>

&nbsp;           <td>${e.id}</td>

&nbsp;           <td>${e.nombre}</td>

&nbsp;           <td>

&nbsp;             <button class="btn btn-warning btn-sm editarEspecialidadBtn" data-id="${e.id}">Editar</button>

&nbsp;             <button class="btn btn-danger btn-sm eliminarEspecialidadBtn" data-id="${e.id}">Eliminar</button>

&nbsp;           </td>

&nbsp;         </tr>

&nbsp;       `).join("")}

&nbsp;     </tbody>

&nbsp;   </table>

&nbsp; `;



&nbsp; document.getElementById("nuevaEspecialidadBtn").addEventListener("click", () => mostrarFormularioEspecialidad());

}



// Mostrar formulario de alta o edición

function mostrarFormularioEspecialidad(especialidad = null) {

&nbsp; especialidadesTab.innerHTML = `

&nbsp;   <div class="card p-4 bg-light mb-4">

&nbsp;     <h5 class="mb-3">${especialidad ? "Editar Especialidad" : "Nueva Especialidad"}</h5>

&nbsp;     <div class="mb-3">

&nbsp;       <label class="form-label">Nombre:</label>

&nbsp;       <input type="text" id="nombreEspecialidad" class="form-control" value="${especialidad ? especialidad.nombre : ""}">

&nbsp;     </div>

&nbsp;     <div>

&nbsp;       <button class="btn btn-success me-2" id="guardarEspecialidadBtn" ${especialidad ? `data-id="${especialidad.id}"` : ""}>

&nbsp;         ${especialidad ? "Guardar Cambios" : "Agregar Especialidad"}

&nbsp;       </button>

&nbsp;       <button class="btn btn-secondary" id="cancelarEspecialidadBtn">Cancelar</button>

&nbsp;     </div>

&nbsp;   </div>

&nbsp; `;

}



// Eventos para guardar, editar, eliminar

document.addEventListener("click", (e) => {

&nbsp; if (e.target.id === "guardarEspecialidadBtn") {

&nbsp;   const nombre = document.getElementById("nombreEspecialidad").value.trim();

&nbsp;   if (!nombre) {

&nbsp;     alert("Por favor, ingresá un nombre.");

&nbsp;     return;

&nbsp;   }



&nbsp;   const id = e.target.dataset.id ? parseInt(e.target.dataset.id) : null;



&nbsp;   if (id) {

&nbsp;     // Editar

&nbsp;     const esp = especialidadesStorage.find(e => e.id === id);

&nbsp;     if (esp) esp.nombre = nombre;

&nbsp;   } else {

&nbsp;     // Agregar nueva

&nbsp;     const nuevoId = especialidadesStorage.length > 0 ? Math.max(...especialidadesStorage.map(e => e.id)) + 1 : 1;

&nbsp;     especialidadesStorage.push({ id: nuevoId, nombre });

&nbsp;   }



&nbsp;   localStorage.setItem("especialidades", JSON.stringify(especialidadesStorage));

&nbsp;   mostrarEspecialidades();

&nbsp; }



&nbsp; if (e.target.id === "cancelarEspecialidadBtn") {

&nbsp;   mostrarEspecialidades();

&nbsp; }



&nbsp; if (e.target.classList.contains("editarEspecialidadBtn")) {

&nbsp;   const id = parseInt(e.target.dataset.id);

&nbsp;   const esp = especialidadesStorage.find(e => e.id === id);

&nbsp;   mostrarFormularioEspecialidad(esp);

&nbsp; }



&nbsp; if (e.target.classList.contains("eliminarEspecialidadBtn")) {

&nbsp;   const id = parseInt(e.target.dataset.id);

&nbsp;   if (confirm("¿Eliminar esta especialidad?")) {

&nbsp;     especialidadesStorage = especialidadesStorage.filter(e => e.id !== id);

&nbsp;     localStorage.setItem("especialidades", JSON.stringify(especialidadesStorage));

&nbsp;     mostrarEspecialidades();

&nbsp;   }

&nbsp; }

});



// Inicializar módulo

mostrarEspecialidades();

----------------------------------------------------

OBRAS SOCIALES 

JS



// obrasSociales.js



const obrasTab = document.getElementById("obrasTab");

let obrasStorage = JSON.parse(localStorage.getItem("obrasSociales")) || \[];



// Mostrar formulario de obra social

function mostrarFormularioObra(obra = null) {

&nbsp; obrasTab.innerHTML = `

&nbsp;   <div class="card p-3 mb-3">

&nbsp;     <h5>${obra ? "Editar Obra Social" : "Nueva Obra Social"}</h5>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Nombre:</label>

&nbsp;       <input type="text" id="nombreObra" class="form-control" value="${obra ? obra.nombre : ""}">

&nbsp;     </div>

&nbsp;     <div class="mb-2">

&nbsp;       <label>Descripción:</label>

&nbsp;       <textarea id="descripcionObra" class="form-control">${obra ? obra.descripcion : ""}</textarea>

&nbsp;     </div>

&nbsp;     <button class="btn btn-success mt-2" id="guardarObraBtn">${obra ? "Guardar Cambios" : "Agregar Obra"}</button>

&nbsp;     <button class="btn btn-secondary mt-2" id="cancelarObraBtn">Cancelar</button>

&nbsp;   </div>

&nbsp; `;

}



// Guardar o actualizar obra social

document.addEventListener("click", (e) => {

&nbsp; if (e.target \&\& e.target.id === "guardarObraBtn") {

&nbsp;   const nombre = document.getElementById("nombreObra").value.trim();

&nbsp;   const descripcion = document.getElementById("descripcionObra").value.trim();



&nbsp;   if (!nombre || !descripcion) {

&nbsp;     alert("Complete todos los campos");

&nbsp;     return;

&nbsp;   }



&nbsp;   if (e.target.dataset.id) {

&nbsp;     const id = parseInt(e.target.dataset.id);

&nbsp;     const o = obrasStorage.find(o => o.id === id);

&nbsp;     Object.assign(o, { nombre, descripcion });

&nbsp;   } else {

&nbsp;     obrasStorage.push({

&nbsp;       id: Date.now(),

&nbsp;       nombre,

&nbsp;       descripcion

&nbsp;     });

&nbsp;   }



&nbsp;   localStorage.setItem("obrasSociales", JSON.stringify(obrasStorage));

&nbsp;   mostrarObras();

&nbsp; }



&nbsp; if (e.target \&\& e.target.id === "cancelarObraBtn") {

&nbsp;   mostrarObras();

&nbsp; }



&nbsp; if (e.target \&\& e.target.classList.contains("editarObraBtn")) {

&nbsp;   const id = parseInt(e.target.dataset.id);

&nbsp;   const obra = obrasStorage.find(o => o.id === id);

&nbsp;   mostrarFormularioObra(obra);

&nbsp;   document.getElementById("guardarObraBtn").dataset.id = id;

&nbsp; }



&nbsp; if (e.target \&\& e.target.classList.contains("eliminarObraBtn")) {

&nbsp;   const id = parseInt(e.target.dataset.id);

&nbsp;   if (confirm("¿Desea eliminar esta obra social?")) {

&nbsp;     obrasStorage = obrasStorage.filter(o => o.id !== id);

&nbsp;     localStorage.setItem("obrasSociales", JSON.stringify(obrasStorage));

&nbsp;     mostrarObras();

&nbsp;   }

&nbsp; }

});



// Mostrar tabla de obras sociales

function mostrarObras() {

&nbsp; obrasTab.innerHTML = `

&nbsp;   <button class="btn btn-primary mb-3" id="nuevaObraBtn">Nueva Obra Social</button>

&nbsp;   <table class="table table-bordered table-striped">

&nbsp;     <thead>

&nbsp;       <tr>

&nbsp;         <th>ID</th>

&nbsp;         <th>Nombre</th>

&nbsp;         <th>Descripción</th>

&nbsp;         <th>Acciones</th>

&nbsp;       </tr>

&nbsp;     </thead>

&nbsp;     <tbody>

&nbsp;       ${obrasStorage.map(o => `

&nbsp;         <tr>

&nbsp;           <td>${o.id}</td>

&nbsp;           <td>${o.nombre}</td>

&nbsp;           <td>${o.descripcion}</td>

&nbsp;           <td>

&nbsp;             <button class="btn btn-warning btn-sm editarObraBtn" data-id="${o.id}">Editar</button>

&nbsp;             <button class="btn btn-danger btn-sm eliminarObraBtn" data-id="${o.id}">Eliminar</button>

&nbsp;           </td>

&nbsp;         </tr>

&nbsp;       `).join("")}

&nbsp;     </tbody>

&nbsp;   </table>

&nbsp; `;



&nbsp; document.getElementById("nuevaObraBtn").addEventListener("click", () => mostrarFormularioObra());

}



// Inicializar

mostrarObras();

------------------------------------------------------------

OBRAS SOCIALES HTML

<!DOCTYPE html>

<html lang="es">

<head>

&nbsp; <meta charset="UTF-8">

&nbsp; <meta name="viewport" content="width=device-width, initial-scale=1.0">

&nbsp; <title>Obras Sociales - Administración</title>

&nbsp; <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body>

&nbsp; <div class="container my-4">

&nbsp;   <h2>Gestión de Obras Sociales</h2>

&nbsp;   <div id="obrasTab"></div>

&nbsp; </div>



&nbsp; <script src="obrasSociales.js"></script>

</body>

</html>

-----------------------------------------------

<li class="nav-item">

&nbsp;     <button class="nav-link" data-bs-toggle="tab" data-bs-target="#reservas" type="button">Reservas</button>

&nbsp;   </li>

------------------------------------------------------

RESERVAS.JS 

// reserva.js



// ⚡ Referencias a elementos del DOM

const especialidadSelect = document.getElementById("especialidadSelect");

const medicoSelect = document.getElementById("medicoSelect");

const obraSocialSelect = document.getElementById("obraSocialSelect");

const fechaTurno = document.getElementById("fechaTurno");

const horaTurno = document.getElementById("horaTurno");

const reservaForm = document.getElementById("reservaForm");

const resumenReserva = document.getElementById("resumenReserva");

const resumenContenido = document.getElementById("resumenContenido");

const reservasTab = document.getElementById("reservasTab"); // div para mostrar reservas



// ⚡ Cargar datos desde LocalStorage

const medicosStorage = JSON.parse(localStorage.getItem("medicos")) || \[];

const especialidadesStorage = JSON.parse(localStorage.getItem("especialidades")) || \[];

const obrasSocialesStorage = JSON.parse(localStorage.getItem("obrasSociales")) || \[];

let reservasStorage = JSON.parse(localStorage.getItem("reservas")) || \[];

const turnosStorage = JSON.parse(localStorage.getItem("turnos")) || \[];



// =========================

// 1️⃣ Cargar especialidades en el select

// =========================

especialidadesStorage.forEach(e => {

&nbsp; let option = document.createElement("option");

&nbsp; option.value = e.id;

&nbsp; option.textContent = e.nombre;

&nbsp; especialidadSelect.appendChild(option);

});



// =========================

// 2️⃣ Filtrar médicos según especialidad

// =========================

especialidadSelect.addEventListener("change", () => {

&nbsp; const idEsp = parseInt(especialidadSelect.value);

&nbsp; medicoSelect.innerHTML = '<option value="">Seleccione médico</option>';

&nbsp; obraSocialSelect.innerHTML = '<option value="">Seleccione obra social</option>';



&nbsp; medicosStorage

&nbsp;   .filter(m => m.especialidad === idEsp)

&nbsp;   .forEach(m => {

&nbsp;     let option = document.createElement("option");

&nbsp;     option.value = m.id;

&nbsp;     option.textContent = `${m.nombre} ${m.apellido}`;

&nbsp;     medicoSelect.appendChild(option);

&nbsp;   });

});



// =========================

// 3️⃣ Cargar obras sociales según médico

// =========================

medicoSelect.addEventListener("change", () => {

&nbsp; const medicoId = parseInt(medicoSelect.value);

&nbsp; const medico = medicosStorage.find(m => m.id === medicoId);



&nbsp; obraSocialSelect.innerHTML = '<option value="">Seleccione obra social</option>';

&nbsp; if (medico) {

&nbsp;   medico.obrasSociales.forEach(osId => {

&nbsp;     const os = obrasSocialesStorage.find(o => o.id === osId);

&nbsp;     let option = document.createElement("option");

&nbsp;     option.value = os.id;

&nbsp;     option.textContent = os.nombre;

&nbsp;     obraSocialSelect.appendChild(option);

&nbsp;   });

&nbsp; }



&nbsp; // Mostrar turnos disponibles del médico

&nbsp; const turnoSelect = document.getElementById("selectTurno");

&nbsp; if (turnoSelect) {

&nbsp;   const turnosDisponibles = turnosStorage.filter(t => t.medico === medicoId \&\& t.disponible);

&nbsp;   turnoSelect.innerHTML = `<option value="">Seleccione turno</option>` +

&nbsp;     turnosDisponibles.map(t => `<option value="${t.id}">${t.fechaHora}</option>`).join("");

&nbsp;   turnoSelect.disabled = false;

&nbsp; }



&nbsp; document.getElementById("valorTotal").value = "";

});



// =========================

// 4️⃣ Calcular valor de reserva

// =========================

function calcularValorReserva() {

&nbsp; const medicoId = parseInt(document.getElementById("selectMedico").value);

&nbsp; const obraId = parseInt(document.getElementById("selectObra").value);

&nbsp; if (!medicoId || !obraId) return;



&nbsp; const medico = medicosStorage.find(m => m.id === medicoId);

&nbsp; document.getElementById("valorTotal").value = medico ? medico.valorConsulta.toFixed(2) : "";

}



document.getElementById("selectTurno").addEventListener("change", calcularValorReserva);

document.getElementById("selectObra").addEventListener("change", calcularValorReserva);



// =========================

// 5️⃣ Guardar reserva

// =========================

document.addEventListener("click", (e) => {

&nbsp; if (e.target \&\& e.target.id === "guardarReservaBtn") {

&nbsp;   const nombre = document.getElementById("nombrePaciente").value.trim();

&nbsp;   const documento = document.getElementById("documentoPaciente").value.trim();

&nbsp;   const especialidadId = parseInt(document.getElementById("selectEspecialidad").value);

&nbsp;   const medicoId = parseInt(document.getElementById("selectMedico").value);

&nbsp;   const obraId = parseInt(document.getElementById("selectObra").value);

&nbsp;   const turnoId = parseInt(document.getElementById("selectTurno").value);

&nbsp;   const valorTotal = parseFloat(document.getElementById("valorTotal").value);



&nbsp;   if (!nombre || !documento || !especialidadId || !medicoId || !obraId || !turnoId) {

&nbsp;     alert("Completa todos los campos");

&nbsp;     return;

&nbsp;   }



&nbsp;   // Crear nueva reserva

&nbsp;   const nuevaReserva = {

&nbsp;     id: Date.now(),

&nbsp;     nombrePaciente: nombre,

&nbsp;     documento,

&nbsp;     turno: turnoId,

&nbsp;     especialidad: especialidadId,

&nbsp;     obraSocial: obraId,

&nbsp;     medico: medicoId,

&nbsp;     valorTotal

&nbsp;   };



&nbsp;   reservasStorage.push(nuevaReserva);

&nbsp;   localStorage.setItem("reservas", JSON.stringify(reservasStorage));



&nbsp;   // Marcar turno como no disponible

&nbsp;   const turno = turnosStorage.find(t => t.id === turnoId);

&nbsp;   if (turno) {

&nbsp;     turno.disponible = false;

&nbsp;     localStorage.setItem("turnos", JSON.stringify(turnosStorage));

&nbsp;   }



&nbsp;   alert("Reserva registrada con éxito!");

&nbsp;   mostrarReservas(); // actualizar tabla

&nbsp;   mostrarFormularioReserva(); // reiniciar formulario

&nbsp; }

});



// =========================

// 6️⃣ Mostrar reservas en tabla

// =========================

function mostrarReservas() {

&nbsp; if (!reservasTab) return;



&nbsp; reservasTab.innerHTML = `

&nbsp;   <h5>Reservas Registradas</h5>

&nbsp;   <table class="table table-bordered table-striped">

&nbsp;     <thead>

&nbsp;       <tr>

&nbsp;         <th>ID</th>

&nbsp;         <th>Paciente</th>

&nbsp;         <th>Documento</th>

&nbsp;         <th>Especialidad</th>

&nbsp;         <th>Médico</th>

&nbsp;         <th>Obra Social</th>

&nbsp;         <th>Turno</th>

&nbsp;         <th>Valor Total</th>

&nbsp;         <th>Acciones</th>

&nbsp;       </tr>

&nbsp;     </thead>

&nbsp;     <tbody>

&nbsp;       ${reservasStorage.map(r => {

&nbsp;         const especialidad = especialidadesStorage.find(e => e.id === r.especialidad)?.nombre || "";

&nbsp;         const medico = medicosStorage.find(m => m.id === r.medico);

&nbsp;         const nombreMedico = medico ? `${medico.nombre} ${medico.apellido}` : "";

&nbsp;         const obra = obrasSocialesStorage.find(o => o.id === r.obraSocial)?.nombre || "";

&nbsp;         const turno = turnosStorage.find(t => t.id === r.turno)?.fechaHora || "";

&nbsp;         return `

&nbsp;           <tr>

&nbsp;             <td>${r.id}</td>

&nbsp;             <td>${r.nombrePaciente}</td>

&nbsp;             <td>${r.documento}</td>

&nbsp;             <td>${especialidad}</td>

&nbsp;             <td>${nombreMedico}</td>

&nbsp;             <td>${obra}</td>

&nbsp;             <td>${turno}</td>

&nbsp;             <td>$${r.valorTotal.toFixed(2)}</td>

&nbsp;             <td>

&nbsp;               <button class="btn btn-danger btn-sm" onclick="eliminarReserva(${r.id})">Eliminar</button>

&nbsp;             </td>

&nbsp;           </tr>

&nbsp;         `;

&nbsp;       }).join("")}

&nbsp;     </tbody>

&nbsp;   </table>

&nbsp; `;

}



// =========================

// 7️⃣ Eliminar reserva

// =========================

function eliminarReserva(id) {

&nbsp; if (confirm("¿Desea eliminar esta reserva?")) {

&nbsp;   const reserva = reservasStorage.find(r => r.id === id);



&nbsp;   // Restaurar turno como disponible

&nbsp;   if (reserva) {

&nbsp;     const turno = turnosStorage.find(t => t.id === reserva.turno);

&nbsp;     if (turno) {

&nbsp;       turno.disponible = true;

&nbsp;       localStorage.setItem("turnos", JSON.stringify(turnosStorage));

&nbsp;     }

&nbsp;   }



&nbsp;   reservasStorage = reservasStorage.filter(r => r.id !== id);

&nbsp;   localStorage.setItem("reservas", JSON.stringify(reservasStorage));

&nbsp;   mostrarReservas();

&nbsp; }

}



// =========================

// 8️⃣ Inicializar

// =========================

mostrarReservas();





---------------------------------------

**reservas HTML**

<!DOCTYPE html>

<html lang="es">

<head>

&nbsp; <meta charset="UTF-8" />

&nbsp; <meta name="viewport" content="width=device-width, initial-scale=1.0" />

&nbsp; <title>Reservar Turno - Vital Consultorios</title>

&nbsp; <link href="bootstrap-5.3.8-dist/css/bootstrap.min.css" rel="stylesheet" />

&nbsp; <link rel="stylesheet" href="estilos/index.css" />

</head>

<body class="p-3">

&nbsp; <h2 class="text-center text-primary mb-4">Reservar Turno Médico</h2>



&nbsp; <form id="formReserva" class="container">

&nbsp;   <div class="row g-3">

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label">Nombre y Apellido:</label>

&nbsp;       <input type="text" id="nombrePaciente" class="form-control" required />

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label">Documento:</label>

&nbsp;       <input type="text" id="documentoPaciente" class="form-control" required />

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label">Especialidad:</label>

&nbsp;       <select id="especialidadSelect" class="form-select" required></select>

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label">Médico:</label>

&nbsp;       <select id="medicoSelect" class="form-select" required></select>

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label">Obra Social:</label>

&nbsp;       <select id="obraSocialSelect" class="form-select" required></select>

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label">Fecha y Hora:</label>

&nbsp;       <input type="datetime-local" id="fechaHora" class="form-control" required />

&nbsp;     </div>

&nbsp;   </div>



&nbsp;   <div class="mt-4">

&nbsp;     <button type="submit" class="btn btn-success">Confirmar Reserva</button>

&nbsp;     <button type="button" class="btn btn-danger mt-3" id="cancelarReservaBtn">Cancelar Reserva</button>

&nbsp;   </div>

&nbsp; </form>



&nbsp; <div id="resumenReserva" class="container mt-5"></div>



&nbsp; <script src="reservas.js"></script>

</body>

</html>

----------------------------RESERVA FUNCIONAL ------------

<!DOCTYPE html>

<html lang="es">

<head>

&nbsp; <meta charset="UTF-8" />

&nbsp; <meta name="viewport" content="width=device-width, initial-scale=1.0" />

&nbsp; <title>Reservar Turno - Vital Consultorios</title>

&nbsp; <link href="../bootstrap-5.3.8-dist/css/bootstrap.min.css" rel="stylesheet" />

&nbsp; <link rel="stylesheet" href="../estilos/index.css" />

</head>

<body class="bg-light">

&nbsp; <!-- NAVBAR -->

&nbsp; <nav class="navbar navbar-principal navbar-expand-sm fixed-top shadow-sm">

&nbsp;   <div class="container-fluid d-flex justify-content-between align-items-center">

&nbsp;     <a class="navbar-brand" href="../index.html">

&nbsp;       <img src="../imagenes/Logo.jpg" alt="Logo Vital Consultorios" class="rounded-circle border" />

&nbsp;     </a>

&nbsp;     <span class="titulo-navbar mx-auto">Vital Consultorios</span>

&nbsp;     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">

&nbsp;       <span class="navbar-toggler-icon"></span>

&nbsp;     </button>

&nbsp;     <div class="collapse navbar-collapse justify-content-end" id="navbarNav">

&nbsp;       <ul class="navbar-nav">

&nbsp;         <li class="nav-item"><a class="nav-link" href="../index.html">Inicio</a></li>

&nbsp;       </ul>

&nbsp;     </div>

&nbsp;   </div>

&nbsp; </nav>



&nbsp; <!-- PORTADA -->

&nbsp; <section class="portada d-flex flex-column align-items-center justify-content-center text-center">

&nbsp;   <h3 class="fs-4 fs-sm-3 fs-md-2 fs-lg-1">Reservá tu turno médico</h3>

&nbsp;   <p class="p-2 p-md-3 p-lg-4">

&nbsp;     En <strong>Vital Consultorios</strong> podés agendar tu consulta con nuestros profesionales de forma rápida y segura.

&nbsp;   </p>

&nbsp; </section>



&nbsp; <!-- FORMULARIO -->

&nbsp; <main class="container my-5">

&nbsp;   <h2 class="text-center text-primary mb-4 fw-bold">Formulario de Reserva</h2>



&nbsp;   <form id="formReserva" class="card row g-3 p-4 shadow" style="background-color: #e8fdf7; border: 2px solid #31a387;">

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label fw-semibold">Nombre y Apellido:</label>

&nbsp;       <input type="text" id="nombrePaciente" class="form-control" required />

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label fw-semibold">Documento:</label>

&nbsp;       <input type="text" id="documentoPaciente" class="form-control" required />

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label fw-semibold">Especialidad:</label>

&nbsp;       <select id="especialidadSelect" class="form-select" required></select>

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label fw-semibold">Médico:</label>

&nbsp;       <select id="medicoSelect" class="form-select" required></select>

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label fw-semibold">Obra Social:</label>

&nbsp;       <select id="obraSocialSelect" class="form-select" required></select>

&nbsp;     </div>

&nbsp;     <div class="col-md-6">

&nbsp;       <label class="form-label fw-semibold">Fecha y Hora:</label>

&nbsp;       <input type="datetime-local" id="fechaHora" class="form-control" required />

&nbsp;     </div>

&nbsp;     <div class="col-12 mt-3 text-center">

&nbsp;       <button type="submit" class="btn btn-success me-2">Confirmar Reserva</button>

&nbsp;       <button type="button" class="btn btn-danger" id="cancelarReservaBtn">Cancelar Reserva</button>

&nbsp;     </div>

&nbsp;   </form>



&nbsp;   <div id="resumenReserva" class="mt-5"></div>

&nbsp; </main>



&nbsp; <!-- FOOTER -->

&nbsp; <footer class="pie\_de\_portada mt-5 px-3 px-md-5">

&nbsp;   <p>\&copy; 2025 Vital Consultorios. Todos los derechos reservados.</p>

&nbsp;   <p>Dirección: Alameda de la Federación 520 - Paraná - Entre Ríos - Argentina</p>

&nbsp;   <p>Teléfono: +54 0343 4232828 | Email:

&nbsp;     <a href="mailto:contacto@vitalconsultorios.com.ar">contacto@vitalconsultorios.com.ar</a>

&nbsp;   </p>

&nbsp;   <p>Instagram:

&nbsp;     <a href="https://www.instagram.com/vitalconsultorios" target="\_blank">@vitalconsultorios</a>

&nbsp;   </p>

&nbsp; </footer>



&nbsp; <!-- BOTÓN MODO OSCURO -->

&nbsp; <button id="modoOscuroBtn" class="btn btn-secondary position-fixed bottom-0 end-0 m-3" aria-label="Activar o desactivar modo oscuro">Modo oscuro</button>



&nbsp; <!-- JS Bootstrap + Modo Oscuro + Lógica -->

&nbsp; <script src="../bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>

&nbsp; <script>

&nbsp;   document.getElementById('modoOscuroBtn').addEventListener('click', () => {

&nbsp;     document.body.classList.toggle('dark-mode');

&nbsp;   });

&nbsp; </script>

&nbsp; <script src="reservas.js"></script>

------------------------------------------------

INDEX.CSS 

body {

&nbsp; margin: 0;

&nbsp; padding: 0;

&nbsp; font-family: "Open Sans", sans-serif;

&nbsp; color: #333;

}

&nbsp;/\* estilo para el logo vital \*/

div a img{

&nbsp; width: 80px;

}

/\*CARDS #062336 \*/

.card {

&nbsp; border-radius: 10px;

&nbsp; overflow: hidden;

&nbsp; border: 2px solid #062336 ;

&nbsp; transition: transform 0.3s ease, box-shadow 0.3s ease;

&nbsp; background-color: #e8fdf7;

}



.card:hover {

&nbsp; transform: translateY(-5px);

&nbsp; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

}



.card-body {

&nbsp; display: flex;

&nbsp; flex-direction: column;

&nbsp; justify-content: center;

&nbsp; min-height: 120px;

}



.card-img-top {

&nbsp; aspect-ratio: 3 / 4;

&nbsp; width: 100%;

&nbsp; object-fit: cover;

&nbsp; object-position: top;

&nbsp; background-color: #68d9bd;

&nbsp; padding: 10px;

}



.card-title {

&nbsp; font-weight: 700;

&nbsp; color: #003366;

}



.card-text {

&nbsp; color:#444;

}



/\*  PORTADA \*/

.portada {

&nbsp; min-height: 90vh;

&nbsp; background: url("https://st.depositphotos.com/1915897/4148/i/950/depositphotos\_41483009-stock-photo-waiting-area-and-surgery-rooms.jpg") no-repeat center top;

&nbsp; background-size: cover;

&nbsp; display: flex;

&nbsp; flex-direction: column;

&nbsp; align-items: center;

&nbsp; justify-content: center;

&nbsp; margin-top: 80px;

&nbsp; text-align: center;

}



.portada h3,

.portada p {

&nbsp; background:#31a387;

&nbsp; padding: 10px 15px;

&nbsp; border-radius: 8px;

&nbsp; color: #333;

&nbsp; max-width: 600px;

}



/\*  OBRAS SOCIALES\*/

section.obras\_sociales {

&nbsp; background-color: #fff;

&nbsp; padding: 20px;

&nbsp; margin-bottom: 20px;

&nbsp; border-radius: 6px;

&nbsp; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

}



section.obras\_sociales h3 {

&nbsp; color:#003366;

&nbsp; font-size: 1.5em;

&nbsp; margin-bottom: 15px;

&nbsp; 

&nbsp; font-weight: 700;

}

.obras\_sociales button {

&nbsp; min-width: 120px;

&nbsp; font-weight: 500;

}





/\* EQUIPO MÉDICO \*/

.equipo\_medico {

&nbsp; font-size: 2em;

&nbsp; font-weight: 700;

&nbsp; color: #003366;

&nbsp; font-family: "Montserrat", sans-serif;

}



/\* NAVBAR\*/

.navbar-principal {

&nbsp; background-color: #31a387;

&nbsp; color:#ffffff;

}

/\* Enlaces de la barra de navegación \*/

.navbar-principal .nav-link\[href="institucional.html"],

.navbar-principal .nav-link\[href="contacto.html"] {

&nbsp; color: #ffffff;

&nbsp; font-weight: 600;

}





/\*  MODO OSCURO  \*/

body.dark-mode {

&nbsp; background-color: #121212;

&nbsp; color: #e0e0e0;

}



.dark-mode .card {

&nbsp; background-color: #1e1e1e;

&nbsp; border-color: #444;

}



.dark-mode .card-title {

&nbsp; color: #90caf9;

}



.dark-mode .card-text {

&nbsp; color: #e0e0e0;

}



.dark-mode .navbar-principal,

.dark-mode .pie\_de\_portada {

&nbsp; background-color: #222;

&nbsp; color: #e0e0e0;

}



.dark-mode .nav-link {

&nbsp; color: #e0e0e0 ;

}



.dark-mode .nav-link:hover {

&nbsp; color: #90caf9 ;

}



.dark-mode ul.obras\_sociales li {

&nbsp; background: #444;

&nbsp; color: #fff;

}



.dark-mode a {

&nbsp; color: #90caf9;

}



.dark-mode a:hover {

&nbsp; color: #bbdefb;

}





.dark-mode .navbar-toggler {

&nbsp; background-color: #444;

&nbsp; border: 1px solid #888;

}



.dark-mode .navbar-toggler-icon {

&nbsp; filter: invert(1);

}



&nbsp; .card-img-top {

&nbsp;   aspect-ratio: 3 / 4;

&nbsp;   height: auto;

&nbsp; }



&nbsp; .card-img-top {

&nbsp;   height: 220px; 

&nbsp; }



&nbsp; .card-img-top {

&nbsp;   height: 270px; 

&nbsp; }

&nbsp; .nav-link:hover{

&nbsp; font-size: larger;

&nbsp; text-decoration: underline;

}

.navbar-nav .nav-link:hover {

&nbsp; color: #080303; /\* color al pasar el mouse \*/

&nbsp; font-size: larger;

}



.titulo-navbar {

&nbsp; color: white;

&nbsp; font-size: 40px;

&nbsp; font-weight: bold;

&nbsp; margin-left: 15px;

&nbsp; display: center;

&nbsp; align-items: center;

}



/\* footer \*/



.pie\_de\_portada {

&nbsp;background: #31a387;

&nbsp; color: #fff;

&nbsp; text-align: center;

&nbsp; padding: 15px;

&nbsp; font-family: "Open Sans", sans-serif;

&nbsp; line-height: 1.5;

}



.pie\_de\_portada a {

&nbsp; color:white ; 

&nbsp; text-decoration: none;

&nbsp; font-weight: bold;

}



.pie\_de\_portada a:hover {

&nbsp; text-decoration: underline;

&nbsp; color: #080303; /\* color al pasar el mouse \*/

&nbsp; 

}

.------------------------------INDEX.HTML----------

<!DOCTYPE html>

<html lang="es">

<head>

&nbsp; <meta charset="UTF-8" />

&nbsp; <meta name="viewport" content="width=device-width, initial-scale=1.0" />

&nbsp; <title>Vital Consultorios - Salud Médica Integral</title>

&nbsp; <link href="bootstrap-5.3.8-dist/css/bootstrap.min.css" rel="stylesheet" />

&nbsp; <link rel="stylesheet" href="estilos/index.css" />

</head>

<body>

<header>

&nbsp; <!-- NAVBAR -->

&nbsp;  

&nbsp; <nav class="navbar navbar-principal fixed-top shadow-sm navbar-principal navbar-expand-sm">

&nbsp;   <div class="container-fluid ">

&nbsp;    <div class="d-flex align-items-center gap-3 flex-grow-1">

&nbsp;       <a class="navbar-brand m-0 p-0" href="index.html">

&nbsp;         <img src="imagenes/Logo.jpg" alt="Logo Vital Consultorios" class="rounded-circle border" />

&nbsp;       </a>

&nbsp;     </div>

&nbsp;         <div class="d-flex justify-content-center w-100">

&nbsp; 						<span class="titulo-navbar">Vital Consultorios</span>

&nbsp;					</div>

&nbsp;     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"

&nbsp;       aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">

&nbsp;       <span class="navbar-toggler-icon"></span>

&nbsp;       <span class="ms-2">Menú</span>

&nbsp;     </button>

&nbsp;     <div class="collapse navbar-collapse justify-content-end" id="navbarNav">

&nbsp;       <ul class="navbar-nav">

&nbsp;         

&nbsp;         <li class="nav-item"><a class="nav-link" href="institucional.html">Institucional</a></li>

&nbsp;         <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>

&nbsp;       </ul>

&nbsp;     </div>

&nbsp;   </div>

&nbsp; </nav>

</header>

&nbsp; <!-- PORTADA -->

&nbsp; <section class="portada d-flex flex-column align-items-center justify-content-center text-center">

&nbsp;   

&nbsp;   <h3 class="fs-4 fs-sm-3 fs-md-2 fs-lg-1">Bienvenidos</h3>

&nbsp;   <p class="p-2 p-md-3 p-lg-4">

&nbsp;     En <strong>Vital Consultorios</strong> ofrecemos atención médica integral para toda la familia

&nbsp;     con profesionales de distintas especialidades.

&nbsp;   </p>

&nbsp;   <!--modifique visit/reserva en solicitar turnos -->

&nbsp;   <a href="visit/reserva.html" class="btn btn-warning btn-lg mt-3">Solicitar turnos</a>

&nbsp; </section>



&nbsp; <!-- OBRAS SOCIALES -->

&nbsp; <section class="obras\_sociales container-fluid my-5">

&nbsp;   <h3 class="mb-3 text-center fs-4 fs-md-3">Obras Sociales</h3>

&nbsp;   <div class="d-flex flex-wrap justify-content-center gap-2 mb-4">

&nbsp;       <button class="btn btn-info btn-sm" type="button">OSDE</button>

&nbsp;       <button class="btn btn-info btn-sm" type="button">Swiss Medical</button>

&nbsp;       <button class="btn btn-info btn-sm" type="button">Galeno</button>

&nbsp;       <button class="btn btn-info btn-sm" type="button">Medifé</button>

&nbsp;       <button class="btn btn-info btn-sm" type="button">Federada Salud</button>

&nbsp;       <button class="btn btn-info btn-sm" type="button">Sancor Salud</button>

&nbsp;       <button class="btn btn-info btn-sm" type="button">PAMI</button>

&nbsp;       <button class="btn btn-info btn-sm" type="button">IOMA</button>

&nbsp;       <button class="btn btn-info btn-sm" type="button">OSPE</button>

&nbsp;   </div>

&nbsp; </section>

&nbsp; <!-- EQUIPO MÉDICO -->

&nbsp; <section class="catalogo container my-5">

&nbsp;   <h3 class="equipo\_medico text-center mb-4">Nuestro equipo médico</h3>

&nbsp;   <div class="row g-3">



&nbsp;     <!-- CARD 1 -->

&nbsp;     <div class=" col-12 col-sm-6 col-md-4 col-lg-3">

&nbsp;       <div class="card h-100 text-center">

&nbsp;         <img src="imagenes/Dr Ana Maria Ruiz.jpg" class="card-img-top img-fluid" alt="Foto de la Dra. Ana Maria Ruiz - Pediatría" />

&nbsp;         <div class="card-body">

&nbsp;           <h5 class="card-title">Dra. Ana Maria Ruiz</h5>

&nbsp;           <p class="card-text">Especialidad: Pediatría</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>



&nbsp;     <!-- CARD 2 -->

&nbsp;     <div class="col-12 col-sm-6 col-md-4 col-lg-3">

&nbsp;       <div class="card h-100 text-center">

&nbsp;         <img src="imagenes/Dr Alfonsina Rivas.jpg" class="card-img-top img-fluid" alt="Dr Alfonsina Rivas - Ginecología" />

&nbsp;         <div class="card-body">

&nbsp;           <h5 class="card-title">Dr. Alfonsina Rivas </h5>

&nbsp;           <p class="card-text">Especialidad: Ginecología</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>

&nbsp;   



&nbsp;     <!-- CARD 3 -->

&nbsp;     <div class="col-12 col-sm-6 col-md-4 col-lg-3">

&nbsp;       <div class="card h-100 text-center">

&nbsp;         <img src="imagenes/Dr Anibal Mendoza.jpg" class="card-img-top img-fluid" alt="Dr Anibal Mendoza - Ginecología" />

&nbsp;         <div class="card-body">

&nbsp;           <h5 class="card-title">Dr. Anibal Mendoza</h5>

&nbsp;           <p class="card-text">Especialidad: Ginecología</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>



&nbsp;     <!-- CARD 4 -->

&nbsp;     <div class="col-12 col-sm-6 col-md-4 col-lg-3">

&nbsp;       <div class="card h-100 text-center">

&nbsp;         <img src="imagenes/Martin Torres.png" class="card-img-top img-fluid" alt="Dr Martin Torres - Traumatología" />

&nbsp;         <div class="card-body">

&nbsp;           <h5 class="card-title">Dr. Martin Torres</h5>

&nbsp;           <p class="card-text">Especialidad: Traumatología</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>



&nbsp;     <!-- CARD 5 -->

&nbsp;     <div class="col-12 col-sm-6 col-md-4 col-lg-3">

&nbsp;       <div class="card h-100 text-center">

&nbsp;         <img src="imagenes/Dr. Antonio Moreno.png" class="card-img-top img-fluid" alt="Dr Antonio Moreno - Psicología" />

&nbsp;         <div class="card-body">

&nbsp;           <h5 class="card-title">Dr. Antonio Moreno</h5>

&nbsp;           <p class="card-text">Especialidad: Psicología</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>



&nbsp;     <!-- CARD 6 -->

&nbsp;     <div class="col-12 col-sm-6 col-md-4 col-lg-3">

&nbsp;       <div class="card h-100 text-center">

&nbsp;         <img src="imagenes/Dr Camila Molina.png" class="card-img-top img-fluid" alt="Dr Camila Molina - Medicina Familiar" />

&nbsp;         <div class="card-body">

&nbsp;           <h5 class="card-title">Dr. Camila Molina</h5>

&nbsp;           <p class="card-text">Especialidad: Cardiología</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>



&nbsp;     <!-- CARD 7 -->

&nbsp;     <div class="col-12 col-sm-6 col-md-4 col-lg-3">

&nbsp;       <div class="card h-100 text-center">

&nbsp;         <img src="imagenes/Dr Esteban Morh.png" class="card-img-top img-fluid" alt="Dr Esteban Morh - Oftamología" />

&nbsp;         <div class="card-body">

&nbsp;           <h5 class="card-title">Dr. Esteban Morh</h5>

&nbsp;           <p class="card-text">Especialidad: Oftamología</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>



&nbsp;     <!-- CARD 8 -->

&nbsp;     <div class="col-12 col-sm-6 col-md-4 col-lg-3">

&nbsp;       <div class="card h-100 text-center">

&nbsp;         <img src="imagenes/Dr Estefania Rasgido.png" class="card-img-top img-fluid" alt="Dr Estefania Rasgido - Cirugía General" />

&nbsp;         <div class="card-body">

&nbsp;           <h5 class="card-title">Dr. Estefania Rasgido</h5>

&nbsp;           <p class="card-text">Especialidad: Cirugía General</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>



&nbsp;   </div>

&nbsp; </section>



&nbsp; <!-- FOOTER -->

&nbsp; <footer class="pie\_de\_portada px-3 px-md-5">

&nbsp;   <p>\&copy; 2025 Vital Consultorios. Todos los derechos reservados.</p>

&nbsp;   <p>Dirección: Alameda de la Federación 520 - Paraná - Entre Ríos - Argentina</p>

&nbsp;   <p>Teléfono: +54 0343 4232828 | Email:

&nbsp;     <a href="mailto:contacto@vitalconsultorios.com.ar">contacto@vitalconsultorios.com.ar</a>

&nbsp;   </p>

&nbsp;   <p>Instagram:

&nbsp;     <a href="https://www.instagram.com/vitalconsultorios" target="\_blank">@vitalconsultorios</a>

&nbsp;   </p>

&nbsp; </footer>



&nbsp; <!-- BOTÓN MODO OSCURO -->

&nbsp; <button id="modoOscuroBtn" class="btn btn-secondary position-fixed bottom-0 end-0 m-3" aria-label="Activar o desactivar modo oscuro">Modo oscuro</button>



&nbsp; <!-- JS Bootstrap + Modo Oscuro -->

&nbsp; <script src="bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>

&nbsp; <script>

&nbsp;   const btn = document.getElementById('modoOscuroBtn');

&nbsp;   btn.addEventListener('click', () => {

&nbsp;     document.body.classList.toggle('dark-mode');

&nbsp;   });

&nbsp; </script>



</body>

</html>

-----------------------------------

INDEX.CSS

body {

&nbsp; margin: 0;

&nbsp; padding: 0;

&nbsp; font-family: "Open Sans", sans-serif;

&nbsp; color: #333;

}

&nbsp;/\* estilo para el logo vital \*/

div a img{

&nbsp; width: 80px;

}

/\*CARDS #062336 \*/

.card {

&nbsp; border-radius: 10px;

&nbsp; overflow: hidden;

&nbsp; border: 2px solid #062336 ;

&nbsp; transition: transform 0.3s ease, box-shadow 0.3s ease;

&nbsp; background-color: #e8fdf7;

}



.card:hover {

&nbsp; transform: translateY(-5px);

&nbsp; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

}



.card-body {

&nbsp; display: flex;

&nbsp; flex-direction: column;

&nbsp; justify-content: center;

&nbsp; min-height: 120px;

}



.card-img-top {

&nbsp; aspect-ratio: 3 / 4;

&nbsp; width: 100%;

&nbsp; object-fit: cover;

&nbsp; object-position: top;

&nbsp; background-color: #68d9bd;

&nbsp; padding: 10px;

}



.card-title {

&nbsp; font-weight: 700;

&nbsp; color: #003366;

}



.card-text {

&nbsp; color:#444;

}



/\*  PORTADA \*/

.portada {

&nbsp; min-height: 90vh;

&nbsp; background: url("https://st.depositphotos.com/1915897/4148/i/950/depositphotos\_41483009-stock-photo-waiting-area-and-surgery-rooms.jpg") no-repeat center top;

&nbsp; background-size: cover;

&nbsp; display: flex;

&nbsp; flex-direction: column;

&nbsp; align-items: center;

&nbsp; justify-content: center;

&nbsp; margin-top: 80px;

&nbsp; text-align: center;

}



.portada h3,

.portada p {

&nbsp; background:#31a387;

&nbsp; padding: 10px 15px;

&nbsp; border-radius: 8px;

&nbsp; color: #333;

&nbsp; max-width: 600px;

}



/\*  OBRAS SOCIALES\*/

section.obras\_sociales {

&nbsp; background-color: #fff;

&nbsp; padding: 20px;

&nbsp; margin-bottom: 20px;

&nbsp; border-radius: 6px;

&nbsp; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

}



section.obras\_sociales h3 {

&nbsp; color:#003366;

&nbsp; font-size: 1.5em;

&nbsp; margin-bottom: 15px;

&nbsp; 

&nbsp; font-weight: 700;

}

.obras\_sociales button {

&nbsp; min-width: 120px;

&nbsp; font-weight: 500;

}





/\* EQUIPO MÉDICO \*/

.equipo\_medico {

&nbsp; font-size: 2em;

&nbsp; font-weight: 700;

&nbsp; color: #003366;

&nbsp; font-family: "Montserrat", sans-serif;

}



/\* NAVBAR\*/

.navbar-principal {

&nbsp; background-color: #31a387;

&nbsp; color:#ffffff;

}

/\* Enlaces de la barra de navegación \*/

.navbar-principal .nav-link\[href="institucional.html"],

.navbar-principal .nav-link\[href="contacto.html"] {

&nbsp; color: #ffffff;

&nbsp; font-weight: 600;

}





/\*  MODO OSCURO  \*/

body.dark-mode {

&nbsp; background-color: #121212;

&nbsp; color: #e0e0e0;

}



.dark-mode .card {

&nbsp; background-color: #1e1e1e;

&nbsp; border-color: #444;

}



.dark-mode .card-title {

&nbsp; color: #90caf9;

}



.dark-mode .card-text {

&nbsp; color: #e0e0e0;

}



.dark-mode .navbar-principal,

.dark-mode .pie\_de\_portada {

&nbsp; background-color: #222;

&nbsp; color: #e0e0e0;

}



.dark-mode .nav-link {

&nbsp; color: #e0e0e0 ;

}



.dark-mode .nav-link:hover {

&nbsp; color: #90caf9 ;

}



.dark-mode ul.obras\_sociales li {

&nbsp; background: #444;

&nbsp; color: #fff;

}



.dark-mode a {

&nbsp; color: #90caf9;

}



.dark-mode a:hover {

&nbsp; color: #bbdefb;

}





.dark-mode .navbar-toggler {

&nbsp; background-color: #444;

&nbsp; border: 1px solid #888;

}



.dark-mode .navbar-toggler-icon {

&nbsp; filter: invert(1);

}



&nbsp; .card-img-top {

&nbsp;   aspect-ratio: 3 / 4;

&nbsp;   height: auto;

&nbsp; }



&nbsp; .card-img-top {

&nbsp;   height: 220px; 

&nbsp; }



&nbsp; .card-img-top {

&nbsp;   height: 270px; 

&nbsp; }

&nbsp; .nav-link:hover{

&nbsp; font-size: larger;

&nbsp; text-decoration: underline;

}

.navbar-nav .nav-link:hover {

&nbsp; color: #080303; /\* color al pasar el mouse \*/

&nbsp; font-size: larger;

}



.titulo-navbar {

&nbsp; color: white;

&nbsp; font-size: 40px;

&nbsp; font-weight: bold;

&nbsp; margin-left: 15px;

&nbsp; display: center;

&nbsp; align-items: center;

}



/\* footer \*/



.pie\_de\_portada {

&nbsp;background: #31a387;

&nbsp; color: #fff;

&nbsp; text-align: center;

&nbsp; padding: 15px;

&nbsp; font-family: "Open Sans", sans-serif;

&nbsp; line-height: 1.5;

}



.pie\_de\_portada a {

&nbsp; color:white ; 

&nbsp; text-decoration: none;

&nbsp; font-weight: bold;

}



.pie\_de\_portada a:hover {

&nbsp; text-decoration: underline;

&nbsp; color: #080303; /\* color al pasar el mouse \*/

&nbsp; 

}

/\*......................................

/\* Botón institucional: Administrador \*/

.boton-admin {

&nbsp; background-color: #ffc107; /\* color del botón 'Solicitar turnos' \*/

&nbsp; color: #333;

&nbsp; font-family: "Open Sans", sans-serif;

&nbsp; font-weight: 600;

&nbsp; font-size: 1rem;

&nbsp; padding: 6px 15px;

&nbsp; border-radius: 6px;

&nbsp; border: none;

&nbsp; transition: background-color 0.3s ease, color 0.3s ease;

&nbsp; text-decoration: none;

&nbsp; display: inline-block;

}



.boton-admin:hover {

&nbsp; background-color: #080303 ;

&nbsp; color: white ;

&nbsp; text-decoration: none;

}

--------------------------

ADMIN

<!DOCTYPE html>

<html lang="es">

<head>

&nbsp; <meta charset="UTF-8">

&nbsp; <meta name="viewport" content="width=device-width, initial-scale=1.0">

&nbsp; <title>Administrador - Vital Consultorios</title>

&nbsp; <link href="bootstrap-5.3.8-dist/css/bootstrap.min.css" rel="stylesheet">

&nbsp; <link rel="stylesheet" href="estilos/index.css">

</head>

<body class="p-3">



&nbsp; <h2 class="mb-4 text-center text-primary">Panel de Administración</h2>



&nbsp; <ul class="nav nav-tabs mb-3" id="adminTabs" role="tablist">

&nbsp;   <li class="nav-item">

&nbsp;     <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#medicos" type="button">Médicos</button>

&nbsp;   </li>

&nbsp;   <li class="nav-item">

&nbsp;     <button class="nav-link" data-bs-toggle="tab" data-bs-target="#especialidades" type="button">Especialidades</button>

&nbsp;   </li>

&nbsp;   <li class="nav-item">

&nbsp;     <button class="nav-link" data-bs-toggle="tab" data-bs-target="#obrasTab" type="button">Obras Sociales</button>

&nbsp;   </li>

&nbsp;   

&nbsp; </ul>



&nbsp; <div class="tab-content" id="adminTabsContent">

&nbsp;   <div class="tab-pane fade show active" id="medicos"></div>

&nbsp;   <div class="tab-pane fade" id="especialidades"></div>

&nbsp;   <div class="tab-pane fade" id="obrasTab"></div>

&nbsp;   <div class="tab-pane fade" id="reservas"></div>

&nbsp; </div>



&nbsp; <!-- Scripts de tus módulos -->

&nbsp; <script src="bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>

&nbsp; <script src="medicos.js"></script>

&nbsp; <script src="especialidad.js"></script>

&nbsp; <script src="obrasSociales.js"></script>

&nbsp; <script src="reservas.js"></script>

&nbsp; <script>

&nbsp; // Verifica si el administrador está logueado

&nbsp; if (localStorage.getItem("adminLogueado") !== "true") {

&nbsp;   alert("Acceso denegado. Debes iniciar sesión primero.");

&nbsp;   window.location.href = "login.html";

&nbsp; }

</script>

</body>

</html>

--------------------

ADMIN CORREGIDO 

<!DOCTYPE html>

<html lang="es">

<head>

&nbsp; <meta charset="UTF-8" />

&nbsp; <meta name="viewport" content="width=device-width, initial-scale=1.0" />

&nbsp; <title>Administrador - Vital Consultorios</title>

&nbsp; <link href="../bootstrap-5.3.8-dist/css/bootstrap.min.css" rel="stylesheet" />

&nbsp; <link rel="stylesheet" href="../estilos/index.css" />

</head>

<body class="bg-light">



&nbsp; <!-- NAVBAR INSTITUCIONAL -->

&nbsp; <nav class="navbar navbar-principal fixed-top shadow-sm navbar-expand-sm">

&nbsp;   <div class="container-fluid">

&nbsp;     <div class="d-flex align-items-center gap-3 flex-grow-1">

&nbsp;       <a class="navbar-brand m-0 p-0" href="../index.html">

&nbsp;         <img src="../imagenes/Logo.jpg" alt="Logo Vital Consultorios" class="rounded-circle border" />

&nbsp;       </a>

&nbsp;     </div>

&nbsp;     <div class="d-flex justify-content-center w-100">

&nbsp;       <span class="titulo-navbar">Vital Consultorios</span>

&nbsp;     </div>

&nbsp;     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">

&nbsp;       <span class="navbar-toggler-icon"></span>

&nbsp;       <span class="ms-2">Menú</span>

&nbsp;     </button>

&nbsp;     <div class="collapse navbar-collapse justify-content-end" id="navbarNav">

&nbsp;       <ul class="navbar-nav">

&nbsp;         <li class="nav-item"><a class="nav-link" href="../index.html">Inicio</a></li>

&nbsp;         <li class="nav-item"><a class="nav-link" href="login.html" onclick="cerrarSesion()">Cerrar sesión</a></li>

&nbsp;       </ul>

&nbsp;     </div>

&nbsp;   </div>

&nbsp; </nav>



&nbsp; <!-- PORTADA ADMIN -->

&nbsp; <section class="portada d-flex flex-column align-items-center justify-content-center text-center">

&nbsp;   <h3 class="fs-4 fs-sm-3 fs-md-2 fs-lg-1">Panel de Administración</h3>

&nbsp;   <p class="p-2 p-md-3 p-lg-4">

&nbsp;     Gestioná médicos, especialidades y obras sociales de <strong>Vital Consultorios</strong>.

&nbsp;   </p>

&nbsp;   <a href="../index.html" class="btn btn-outline-light mt-3">Volver a la página principal</a>

&nbsp; </section>



&nbsp; <!-- TABS ADMINISTRATIVAS -->

&nbsp; <main class="container my-5">

&nbsp;   <ul class="nav nav-tabs mb-3" id="adminTabs" role="tablist">

&nbsp;     <li class="nav-item">

&nbsp;       <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#medicos" type="button">Médicos</button>

&nbsp;     </li>

&nbsp;     <li class="nav-item">

&nbsp;       <button class="nav-link" data-bs-toggle="tab" data-bs-target="#especialidades" type="button">Especialidades</button>

&nbsp;     </li>

&nbsp;     <li class="nav-item">

&nbsp;       <button class="nav-link" data-bs-toggle="tab" data-bs-target="#obrasTab" type="button">Obras Sociales</button>

&nbsp;     </li>

&nbsp;   </ul>



&nbsp;   <div class="tab-content" id="adminTabsContent">

&nbsp;     <div class="tab-pane fade show active" id="medicos"></div>

&nbsp;     <div class="tab-pane fade" id="especialidades"></div>

&nbsp;     <div class="tab-pane fade" id="obrasTab"></div>

&nbsp;   </div>

&nbsp; </main>



&nbsp; <!-- FOOTER INSTITUCIONAL -->

&nbsp; <footer class="pie\_de\_portada mt-5 px-3 px-md-5">

&nbsp;   <p>\&copy; 2025 Vital Consultorios. Todos los derechos reservados.</p>

&nbsp;   <p>Dirección: Alameda de la Federación 520 - Paraná - Entre Ríos - Argentina</p>

&nbsp;   <p>Teléfono: +54 0343 4232828 | Email:

&nbsp;     <a href="mailto:contacto@vitalconsultorios.com.ar">contacto@vitalconsultorios.com.ar</a>

&nbsp;   </p>

&nbsp;   <p>Instagram:

&nbsp;     <a href="https://www.instagram.com/vitalconsultorios" target="\_blank">@vitalconsultorios</a>

&nbsp;   </p>

&nbsp; </footer>



&nbsp; <!-- BOTÓN MODO OSCURO -->

&nbsp; <button id="modoOscuroBtn" class="btn btn-secondary position-fixed bottom-0 end-0 m-3" aria-label="Activar o desactivar modo oscuro">Modo oscuro</button>



&nbsp; <!-- SCRIPTS -->

&nbsp; <script src="../bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>

&nbsp; <script src="medicos.js"></script>

&nbsp; <script src="especialidad.js"></script>

&nbsp; <script src="obrasSociales.js"></script>

&nbsp; <script>

&nbsp;   // Verifica si el administrador está logueado

&nbsp;   if (localStorage.getItem("adminLogueado") !== "true") {

&nbsp;     alert("Acceso denegado. Debes iniciar sesión primero.");

&nbsp;     window.location.href = "login.html";

&nbsp;   }



&nbsp;   // Cerrar sesión

&nbsp;   function cerrarSesion() {

&nbsp;     localStorage.removeItem("adminLogueado");

&nbsp;   }



&nbsp;   // Modo oscuro

&nbsp;   document.getElementById("modoOscuroBtn").addEventListener("click", () => {

&nbsp;     document.body.classList.toggle("dark-mode");

&nbsp;   });

&nbsp; </script>

</body>

