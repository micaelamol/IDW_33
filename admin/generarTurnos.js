function generarAgendaTurnos(medicos) {
  const turnosExistentes = JSON.parse(localStorage.getItem("turnos") || "[]");

  if (turnosExistentes.length > 0) {
    console.warn("Ya existen turnos en el sistema. No se generaron nuevos.");
    const mensaje = document.getElementById("mensajeTurnos");
    if (mensaje) {
      mensaje.innerHTML = `<div class="alert alert-info">Ya existen turnos generados en el sistema.</div>`;
    }
    return;
  }

  const turnos = [];
  /* const fechaInicio = new Date("2025-11-7"); */
  const fechaInicio = new Date();
  console.log("fechainicio ", fechaInicio);

  const dias = 5;
  const feriados = ["2025-11-12", "2025-12-08"];
  let idTurno = 1;

  for (let d = 0; d < dias; d++) {
    const fechaActual = new Date(fechaInicio);
    fechaActual.setDate(fechaInicio.getDate() + d);

    const fechaISO = fechaActual.toISOString().split("T")[0];
    const diaSemana = fechaActual.getDay();

    // Evitar sábados, domingos y feriados
    if ([0, 6].includes(diaSemana) || feriados.includes(fechaISO)) continue;
    console.log("despues del if ", diaSemana);
    console.log(`🚫 Saltando: ${fechaISO} - Fin de semana o feriado`);

    medicos.forEach((medico) => {
      for (let i = 0; i < 4; i++) {
        const hora = 9 + i;
        const fechaHoraLocal = `${fechaISO}T${String(hora).padStart(2, "0")}:00:00`;

        turnos.push({
          id: idTurno++,
          medico: medico.id,
          fechaHora: fechaHoraLocal,
          disponible: true,
        });
      }
    });
  }

  localStorage.setItem("turnos", JSON.stringify(turnos));
  window.turnos = turnos;

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
  const turnosGuardados = JSON.parse(localStorage.getItem("turnos") || "[]");

  window.turnos = turnosGuardados;
  window.medicos = medicos;

  if (turnosGuardados.length === 0 && medicos.length > 0) {
    generarAgendaTurnos(medicos);
  }

  window.renderTabla = function renderTabla() {
    if (!tablaBody) return;

    if (window.turnos.length === 0) {
      tablaBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay turnos generados.</td></tr>`;
      return;
    }

    const agrupados = {};
    window.turnos.forEach((t) => {
      const fecha = t.fechaHora.slice(0, 10);
      if (!agrupados[fecha]) agrupados[fecha] = [];
      agrupados[fecha].push(t);
    });

    tablaBody.innerHTML = Object.entries(agrupados)
      .map(([fecha, lista]) => {
        const fechaLegible = new Date(fecha + "T03:00:00").toLocaleDateString("es-AR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const filas = lista
          .map((t) => {
            const medico = window.medicos.find((m) => m.id === t.medico);
            return `
              <tr>
                <td>${t.id}</td>
                <td>${medico ? medico.nombre + " " + medico.apellido : "Desconocido"}</td>
                <td>${t.fechaHora.slice(11, 16)} hs</td>
                <td class="${t.disponible ? "text-success fw-semibold" : "text-danger fw-semibold"}">
                  ${t.disponible ? "Disponible" : "Reservado"}
                </td>
                <td>
                  <button class="btn btn-sm btn-danger" onclick="eliminarTurno(${t.id})">Eliminar</button>
                </td>
              </tr>
            `;
          })
          .join("");

        return `<tr><td colspan="5" class="table-secondary fw-bold">${fechaLegible}</td></tr>${filas}`;
      })
      .join("");
  };

  window.eliminarTurno = function (id) {
    const index = window.turnos.findIndex((t) => t.id === id);
    if (index !== -1) {
      const turnoEliminado = window.turnos[index];
      window.turnos.splice(index, 1);
      localStorage.setItem("turnos", JSON.stringify(window.turnos));

      // Eliminar reservas asociadas
      let reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
      reservas = reservas.filter(
        (r) => !(r.fechaHora === turnoEliminado.fechaHora && r.medicoId === turnoEliminado.medico)
      );
      localStorage.setItem("reservas", JSON.stringify(reservas));

      renderTabla();
      if (typeof mostrarReservas === "function") {
        mostrarReservas();
      }
    }
  };

  renderTabla();
});

window.borrarTodosLosTurnos = function () {
  if (confirm("¿Estás segura de que querés borrar todos los turnos?")) {
    console.log("🔍 ANTES de borrar:", localStorage.getItem("turnos"));

    localStorage.removeItem("turnos");
    console.log("🔍 DESPUÉS de borrar:", localStorage.getItem("turnos"));
    console.log("🔍 window.turnos:", window.turnos);

    window.turnos = [];
    if (typeof renderTabla === "function") renderTabla();

    const mensaje = document.getElementById("mensajeTurnos");
    if (mensaje) {
      mensaje.innerHTML = `<div class="alert alert-warning">Se borraron todos los turnos.</div>`;
    }
  }
};
