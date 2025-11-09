// Función para exportar las reservas a PDF
function exportarReservasPDF() {
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");

  if (reservas.length === 0) {
    alert("No hay reservas para exportar.");
    return;
  }

  const doc = new window.jspdf.jsPDF();
  doc.setFontSize(16);
  doc.text("Vital Consultorios", 14, 20);
  doc.setFontSize(12);
  doc.text("Reservas Confirmadas", 14, 28);

  let y = 40;
  reservas.forEach((r) => {
    const medico = medicos.find(m => m.id === r.medicoId);
    doc.setFontSize(10);
    doc.text(`Paciente: ${r.nombre}`, 14, y);
    doc.text(`Documento: ${r.documento}`, 14, y + 6);
    doc.text(`Médico: ${medico ? medico.nombre + " " + medico.apellido : (r.medicoNombre || "Desconocido")}`, 14, y + 12);
    doc.text(`Especialidad: ${r.especialidad}`, 14, y + 18);
    doc.text(`Obra Social: ${r.obraSocial}`, 14, y + 24);
    doc.text(`Fecha y Hora: ${new Date(r.fechaHora).toLocaleString("es-AR")}`, 14, y + 30);
    doc.text(`Monto: $${r.monto.toFixed(2)}`, 14, y + 36);
    y += 48;

    // Agregar nueva página si se llena
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("reservas_vital_consultorios.pdf");
}

// Función para exportar las reservas a Excel
function exportarReservasExcel() {
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");

  if (reservas.length === 0) {
    alert("No hay reservas para exportar.");
    return;
  }

  const datos = reservas.map(r => ({
    Paciente: r.nombre,
    Documento: r.documento,
    Médico: r.medicoNombre || "Desconocido",
    Especialidad: r.especialidad,
    "Obra Social": r.obraSocial,
    "Fecha y Hora": new Date(r.fechaHora).toLocaleString("es-AR"),
    Monto: `$${r.monto.toFixed(2)}`
  }));

  const ws = XLSX.utils.json_to_sheet(datos);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reservas");
  XLSX.writeFile(wb, "reservas_vital_consultorios.xlsx");
}

// Eliminar reservas viejas (anteriores a la fecha actual)
function borrarReservasViejas() {
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  const hoy = new Date();

  const reservasActualizadas = reservas.filter(r => new Date(r.fechaHora) >= hoy);

  const eliminadas = reservas.length - reservasActualizadas.length;
  if (eliminadas > 0) {
    localStorage.setItem("reservas", JSON.stringify(reservasActualizadas));
    alert(`Se eliminaron ${eliminadas} reservas viejas.`);
    mostrarReservas(reservasActualizadas);
  } else {
    alert("No hay reservas viejas para eliminar.");
  }
}

// Filtrar reservas por rango de fecha
function filtrarReservasPorFecha(fechaInicio, fechaFin) {
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");

  if (!fechaInicio || !fechaFin) {
    alert("Por favor, seleccioná ambas fechas para filtrar.");
    return;
  }

  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const filtradas = reservas.filter(r => {
    const fechaReserva = new Date(r.fechaHora);
    return fechaReserva >= inicio && fechaReserva <= fin;
  });

  if (filtradas.length === 0) {
    alert("No hay reservas en el rango seleccionado.");
  }

  mostrarReservas(filtradas);
}

//  Mostrar reservas en tabla
function mostrarReservas(reservas = null) {
  const tabla = document.getElementById("tablaReservas");
  const lista = reservas || JSON.parse(localStorage.getItem("reservas") || "[]");
  tabla.innerHTML = "";

  lista.forEach((r) => {
    const fila = `
      <tr>
        <td>${r.nombre}</td>
        <td>${r.documento}</td>
        <td>${r.medicoNombre || "Desconocido"}</td>
        <td>${r.especialidad}</td>
        <td>${r.obraSocial}</td>
        <td>${new Date(r.fechaHora).toLocaleString("es-AR")}</td>
        <td>$${r.monto.toFixed(2)}</td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

// Asignar eventos a botones
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("exportarPDFBtn")?.addEventListener("click", exportarReservasPDF);
  document.getElementById("exportarExcelBtn")?.addEventListener("click", exportarReservasExcel);
  document.getElementById("borrarViejasBtn")?.addEventListener("click", borrarReservasViejas);
  document.getElementById("filtrarBtn")?.addEventListener("click", () => {
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    filtrarReservasPorFecha(fechaInicio, fechaFin);
  });

  mostrarReservas();
});