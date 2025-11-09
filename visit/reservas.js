
document.addEventListener("DOMContentLoaded", () => {
  const especialidadSelect = document.getElementById("especialidadSelect");
  const medicoSelect = document.getElementById("medicoSelect");
  const obraSocialSelect = document.getElementById("obraSocialSelect");
  const turnoSelect = document.getElementById("turnoSelect");
  const formReserva = document.getElementById("formReserva");
  const resumenReserva = document.getElementById("resumenReserva");

  const especialidades = JSON.parse(localStorage.getItem("especialidades") || "[]");
  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");
  const obrasSociales = JSON.parse(localStorage.getItem("obrasSociales") || "[]");
  let turnos = JSON.parse(localStorage.getItem("turnos") || "[]");
  let reservas = JSON.parse(localStorage.getItem("reservas") || "[]");

  // Cargar especialidades
  especialidadSelect.innerHTML = `<option value="">Seleccione una especialidad</option>` +
    especialidades.map(e => `<option value="${e.id}">${e.nombre}</option>`).join("");

  // Cargar obras sociales
  obraSocialSelect.innerHTML = `<option value="">Seleccione una obra social</option>` +
    obrasSociales.map(o => `<option value="${o.id}">${o.nombre}</option>`).join("");

  // Mostrar todos los médicos inicialmente
  actualizarMedicos(medicos);

  // Filtrar médicos por especialidad
  especialidadSelect.addEventListener("change", () => {
    const idEspecialidad = parseInt(especialidadSelect.value);
    const filtrados = isNaN(idEspecialidad)
      ? medicos
      : medicos.filter(m => m.especialidad === idEspecialidad);
    actualizarMedicos(filtrados);
  });

  // Mostrar turnos disponibles al seleccionar médico
  medicoSelect.addEventListener("change", () => {
    const idMedico = parseInt(medicoSelect.value);
    const turnosDisponibles = turnos.filter(t => t.medico === idMedico && t.disponible);
    turnoSelect.innerHTML = `<option value="">Seleccione un turno disponible</option>` +
      turnosDisponibles.map(t => `<option value="${t.id}">${new Date(t.fechaHora).toLocaleString()}</option>`).join("");
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
    const idTurno = parseInt(turnoSelect.value);

    if (!nombrePaciente || !documentoPaciente || isNaN(idEspecialidad) || isNaN(idMedico) || isNaN(idObraSocial) || isNaN(idTurno)) {
      alert("Por favor, completá todos los campos correctamente.");
      return;
    }

    const turnoSeleccionado = turnos.find(t => t.id === idTurno);
    if (!turnoSeleccionado || !turnoSeleccionado.disponible) {
      alert("El turno seleccionado no está disponible.");
      return;
    }

    const medico = medicos.find(m => m.id === idMedico);
    const especialidad = especialidades.find(e => e.id === idEspecialidad);
    const obraSocial = obrasSociales.find(o => o.id === idObraSocial);
    const porcentajeDescuento = obraSocial.porcentaje || 0;
    const valorConsulta = medico.valorConsulta;
    const valorTotal = valorConsulta - (valorConsulta * porcentajeDescuento / 100);

    // Marcar turno como reservado
    turnoSeleccionado.disponible = false;
    localStorage.setItem("turnos", JSON.stringify(turnos));

    
      const nuevaReserva = {
        id: reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1,
        nombre: nombrePaciente,
        documento: documentoPaciente,
        medicoId: idMedico,
        especialidad: especialidad.nombre,
        obraSocial: obraSocial.nombre,
        fechaHora: turnoSeleccionado.fechaHora,
        monto: valorTotal
      };


    reservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // Mostrar resumen
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
              <td>${new Date(turnoSeleccionado.fechaHora).toLocaleString()}</td>
              <td class="fw-bold text-primary">$${valorTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="6" class="text-end fw-semibold">Valor original:</td>
              <td>$${valorConsulta.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="6" class="text-end fw-semibold">Descuento (${porcentajeDescuento}%):</td>
              <td>-$${(valorConsulta * porcentajeDescuento / 100).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    formReserva.reset();
    actualizarMedicos(medicos);
    turnoSelect.innerHTML = `<option value="">Seleccione un turno disponible</option>`;
  });

  // Cancelar reserva
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "cancelarReservaBtn") {
      const reservaCancelada = reservas.pop();
      const turnoLiberado = turnos.find(t => t.id === reservaCancelada.turno);
      if (turnoLiberado) turnoLiberado.disponible = true;

      localStorage.setItem("reservas", JSON.stringify(reservas));
      localStorage.setItem("turnos", JSON.stringify(turnos));

      resumenReserva.innerHTML = `<div class="alert alert-warning">La reserva fue cancelada.</div>`;
    }
  });
});