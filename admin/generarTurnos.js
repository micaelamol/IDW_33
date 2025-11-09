function generarAgendaTurnos(medicos) {
  const turnosExistentes = JSON.parse(localStorage.getItem("turnos") || "[]");
  if (turnosExistentes.length > 0) {
    console.warn("Ya existen turnos en el sistema. No se generaron nuevos.");
    return;
  }

  const turnos = [];
  const fechaInicio = new Date("2025-11-7");
  const dias = 5;
  const feriados = ["2025-11-12", "2025-12-08"];
  let idTurno = 1;

  for (let d = 0; d < dias; d++) {
  const fechaActual = new Date(fechaInicio.getTime());
  fechaActual.setDate(fechaActual.getDate() + d);

    const fechaISO = fechaActual.toISOString().slice(0, 10);
    const diaSemana = fechaActual.getDay();
    if ([0, 6].includes(diaSemana) || feriados.includes(fechaISO)) continue;

    medicos.forEach(medico => {
      for (let i = 0; i < 4; i++) {
        const turnoFecha = new Date(fechaActual);
        turnoFecha.setHours(9 + i, 0, 0, 0); // 9:00, 10:00, 11:00, 12:00

        turnos.push({
          id: idTurno++,
          medico: medico.id,
          fechaHora: turnoFecha.toISOString(),
          disponible: true
        });
      }
    });
  }

  localStorage.setItem("turnos", JSON.stringify(turnos));
  console.log(`Se generaron ${turnos.length} turnos para la semana.`);

  const mensaje = document.getElementById("mensajeTurnos");
  if (mensaje) {
    mensaje.innerHTML = `<div class="alert alert-success">Se generaron ${turnos.length} turnos para la semana.</div>`;
  }

  if (typeof renderTabla === "function") {
    renderTabla();
  }
}

window.generarAgendaTurnos = generarAgendaTurnos;

document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.getElementById("tablaTurnosBody");
  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");
  const turnos = JSON.parse(localStorage.getItem("turnos") || "[]");

  window.turnos = turnos;
  window.medicos = medicos;

  if (turnos.length === 0 && medicos.length > 0) {
    generarAgendaTurnos(medicos);
  }

  function renderTabla() {
    if (window.turnos.length === 0) {
      tablaBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay turnos generados.</td></tr>`;
      return;
    }

    const agrupados = {};
    window.turnos.forEach(t => {
      const fecha = t.fechaHora.slice(0, 10);
      if (!agrupados[fecha]) agrupados[fecha] = [];
      agrupados[fecha].push(t);
    });

    tablaBody.innerHTML = Object.entries(agrupados).map(([fecha, lista]) => {
      const fechaLegible = new Date(fecha).toLocaleDateString("es-AR", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      });

      const filas = lista.map(t => {
        const medico = window.medicos.find(m => m.id === t.medico);
        return `
          <tr>
            <td>${t.id}</td>
            <td>${medico ? medico.nombre + " " + medico.apellido : "Desconocido"}</td>
            <td>${new Date(t.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td class="${t.disponible ? 'text-success fw-semibold' : 'text-danger fw-semibold'}">
              ${t.disponible ? "SI" : "Reservado"}
            </td>
            <td>
              <button class="btn btn-sm btn-danger" onclick="eliminarTurno(${t.id})">Eliminar</button>
            </td>
          </tr>
        `;
      }).join("");

      return `<tr><td colspan="5" class="table-secondary fw-bold">${fechaLegible}</td></tr>${filas}`;
    }).join("");
  }

 window.eliminarTurno = function(id) {
  const index = window.turnos.findIndex(t => t.id === id);
  if (index !== -1) {
    const turnoEliminado = window.turnos[index];
    window.turnos.splice(index, 1);
    localStorage.setItem("turnos", JSON.stringify(window.turnos));

    // Eliminar reservas asociadas al turno
    let reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const fechaTurno = turnoEliminado.fechaHora;
    const medicoId = turnoEliminado.medico;

    reservas = reservas.filter(r => !(r.fechaHora === fechaTurno && r.medicoId === medicoId));
    localStorage.setItem("reservas", JSON.stringify(reservas));

    renderTabla();
    mostrarReservas(); 
  }
};
  window.renderTabla = renderTabla;
  renderTabla();
});

window.borrarTodosLosTurnos = function() {
  if (confirm("¿Estás segura de que querés borrar todos los turnos?")) {
    localStorage.removeItem("turnos");
    window.turnos = [];
    renderTabla();
    const mensaje = document.getElementById("mensajeTurnos");
    if (mensaje) {
      mensaje.innerHTML = `<div class="alert alert-warning">Se borraron todos los turnos.</div>`;
    }
  }
};