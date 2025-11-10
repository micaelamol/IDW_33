document.addEventListener("DOMContentLoaded", () => {
  renderReservas();
});

function renderReservas() {
  const tablaBody = document.getElementById("tablaReservasBody");
  if (!tablaBody) return;

  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");

  if (reservas.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No hay reservas confirmadas.</td></tr>`;
    return;
  }

  tablaBody.innerHTML = reservas.map(r => {
    const medico = medicos.find(m => m.id === r.medicoId);
    const nombreMedico = medico ? `${medico.nombre} ${medico.apellido}` : "Desconocido";
    const fechaLegible = new Date(r.fechaHora).toLocaleString("es-AR", {
      weekday: "short", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
    });

    return `
      <tr>
        <td>${r.nombre}</td>
        <td>${r.documento}</td>
        <td>${nombreMedico}</td>
        <td>${r.especialidad}</td>
        <td>${r.obraSocial}</td>
        <td>${fechaLegible}</td>
        <td>$${r.monto.toFixed(2)}</td>
      </tr>
    `;
  }).join("");
}

function exportarReservasExcel() {
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");

  if (reservas.length === 0) {
    alert("No hay reservas para exportar.");
    return;
  }

  const hoja = reservas.map(r => {
    const medico = medicos.find(m => m.id === r.medicoId);
    return {
      "Paciente": r.nombre,
      "Documento": r.documento,
      "Médico": medico ? `${medico.nombre} ${medico.apellido}` : "Desconocido",
      "Especialidad": r.especialidad,
      "Obra Social": r.obraSocial,
      "Fecha y Hora": new Date(r.fechaHora).toLocaleString("es-AR"),
      "Monto": `$${r.monto.toFixed(2)}`
    };
  });

  const encabezado = [{
    "Paciente": "Vital Consultorios - Reservas Confirmadas",
    "Documento": "",
    "Médico": "",
    "Especialidad": "",
    "Obra Social": "",
    "Fecha y Hora": "",
    "Monto": ""
  }];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([...encabezado, ...hoja]);
  XLSX.utils.book_append_sheet(wb, ws, "Reservas");
  XLSX.writeFile(wb, "reservas_vital_consultorios.xlsx");
}

async function exportarReservasPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  const medicos = JSON.parse(localStorage.getItem("medicos") || "[]");

  if (reservas.length === 0) {
    alert("No hay reservas para exportar.");
    return;
  }

  
  

  // Encabezado institucional
  doc.addImage(logoBase64, "PNG", 14, 10, 20, 20);
  doc.setFontSize(14);
  doc.text("Vital Consultorios", 40, 18);
  doc.setFontSize(12);
  doc.text("Reservas Confirmadas", 40, 26);

  let y = 40;
  reservas.forEach((r, i) => {
    const medico = medicos.find(m => m.id === r.medicoId);
    doc.text(`Paciente: ${r.nombre}`, 14, y);
    doc.text(`Documento: ${r.documento}`, 14, y + 6);
    doc.text(`Médico: ${medico ? medico.nombre + " " + medico.apellido : "Desconocido"}`, 14, y + 12);
    doc.text(`Especialidad: ${r.especialidad}`, 14, y + 18);
    doc.text(`Obra Social: ${r.obraSocial}`, 14, y + 24);
    doc.text(`Fecha y Hora: ${new Date(r.fechaHora).toLocaleString("es-AR")}`, 14, y + 30);
    doc.text(`Monto: $${r.monto.toFixed(2)}`, 14, y + 36);
    y += 48;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("reservas_vital_consultorios.pdf");
}