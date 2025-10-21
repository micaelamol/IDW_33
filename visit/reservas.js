
document.addEventListener("DOMContentLoaded", () => {
  const especialidadSelect = document.getElementById("especialidadSelect");
  const medicoSelect = document.getElementById("medicoSelect");
  const obraSocialSelect = document.getElementById("obraSocialSelect");
  const formReserva = document.getElementById("formReserva");
  const resumenReserva = document.getElementById("resumenReserva");

  const especialidades = JSON.parse(localStorage.getItem("especialidades") || "[]");
  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");
  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales") || "[]");
  let reservas = JSON.parse(localStorage.getItem("reservas") || "[]");

  // Cargar especialidades
  especialidadSelect.innerHTML = `<option value="">Seleccione una especialidad</option>` +
    especialidades.map(e => `<option value="${e.id}">${e.nombre}</option>`).join("");

  // Cargar obras sociales
  obraSocialSelect.innerHTML = `<option value="">Seleccione una obra social</option>` +
    obrasSociales.map(o => `<option value="${o.id}">${o.nombre}</option>`).join("");

  // Cargar todos los médicos inicialmente
  actualizarMedicos(medicos);

  // Filtrar médicos por especialidad
  especialidadSelect.addEventListener("change", () => {
    const idEspecialidad = parseInt(especialidadSelect.value);
    if (isNaN(idEspecialidad)) {
      actualizarMedicos(medicos); // Mostrar todos si no hay selección
    } else {
      const medicosFiltrados = medicos.filter(m => m.especialidad === idEspecialidad);
      actualizarMedicos(medicosFiltrados);
    }
  });

  function actualizarMedicos(lista) {
    medicoSelect.innerHTML = `<option value="">Seleccione un médico</option>` +
      lista.map(m => `<option value="${m.id}">${m.nombre} ${m.apellido}</option>`).join("");
  }

  // Confirmar reserva
  formReserva.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombrePaciente = document.getElementById("nombrePaciente").value.trim();
    const documentoPaciente = document.getElementById("documentoPaciente").value.trim();
    const idEspecialidad = parseInt(especialidadSelect.value);
    const idMedico = parseInt(medicoSelect.value);
    const idObraSocial = parseInt(obraSocialSelect.value);
    const fechaHora = document.getElementById("fechaHora").value;

    if (!nombrePaciente || !documentoPaciente || isNaN(idEspecialidad) || isNaN(idMedico) || isNaN(idObraSocial) || !fechaHora) {
      alert("Por favor, completá todos los campos correctamente.");
      return;
    }

    const medico = medicos.find(m => m.id === idMedico);
    const especialidad = especialidades.find(e => e.id === idEspecialidad);
    const obraSocial = obrasSociales.find(o => o.id === idObraSocial);
    const valorConsulta = medico.valorConsulta;

    const nuevaReserva = {
      id: reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1,
      documento: documentoPaciente,
      paciente: nombrePaciente,
      medico: idMedico,
      especialidad: idEspecialidad,
      obraSocial: idObraSocial,
      fechaHora,
      valorTotal: valorConsulta
    };

    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // Mostrar resumen en tabla con botón de cancelar
    resumenReserva.innerHTML = `
      <h5 class="text-success mb-3">Reserva confirmada</h5>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="table-dark">
            <tr>
              <th>Paciente</th>
              <th>Documento</th>
              <th>Médico</th>
              <th>Especialidad</th>
              <th>Obra Social</th>
              <th>Fecha y Hora</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${nombrePaciente}</td>
              <td>${documentoPaciente}</td>
              <td>${medico.nombre} ${medico.apellido}</td>
              <td>${especialidad.nombre}</td>
              <td>${obraSocial.nombre}</td>
              <td>${new Date(fechaHora).toLocaleString()}</td>
              <td>$${valorConsulta}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" class="btn btn-danger mt-3" id="cancelarReservaBtn">Cancelar Reserva</button>
    `;

    formReserva.reset();
    actualizarMedicos(medicos); 
  });

  // Cancelar reserva
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "cancelarReservaBtn") {
      reservas.pop(); 
      localStorage.setItem("reservas", JSON.stringify(reservas));
      resumenReserva.innerHTML = `<div class="alert alert-warning">La reserva fue cancelada.</div>`;
    }
  });
  });