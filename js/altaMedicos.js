
const formAltaMedico = document.getElementById ("altaMedicoForm");
const inputNombre = document.getElementById ("nombre");
const inputEspecialidad = document.getElementById ("especialidad");
const inputMatricula = document.getElementById ("matricula");
const inputEmail = document.getElementById ("email");
const inputTelefono = document.getElementById ("telefono");
const inputObraSocial = document.getElementById ("obraSocial");

//funcion altaMedicos
function altaMedicos(event){
    event.preventDefault();
    let nombre = inputNombre.value.trim();
    let especialidad = inputEspecialidad.value.trim();
    let matricula = inputMatricula.value.trim();
    let email = inputEmail.value.trim();
    let telefono = inputTelefono.value.trim();
    let obraSocial = inputObraSocial.value.trim();

    //validacion de campos
    if (!nombre || !especialidad || !matricula || !email || !telefono || !obraSocial){
        alert("por favor completar los campos requeridos");
        return;
    }
    // nuevo medico
    const nuevoMedico = {
    id: crypto.randomUUID(), 
    nombre,
    especialidad,
    matricula,
    email,
    telefono,
    obraSocial
  };
    // lee medicos actuales
    let medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    // verifica si existe por matricula
    const index = medicos.findIndex(medico => medico.matricula === matricula);
  if (index !== -1) {
    medicos[index] = { ...medicos[index], ...nuevoMedico };
  } else {
    medicos.push(nuevoMedico);
  }

    //guarda 
    localStorage.setItem("medicos", JSON.stringify(medicos));

    // alert con los datos
    alert(
        `Medico registrado:\n\n` +
        `Nombre: ${nombre}\n` +
        `especialidad: ${especialidad}\n` +
        `matricula: ${matricula}\n` +
        `email: ${email}\n` +
        `telefono: ${telefono}\n` +
        `obraSocial: ${obraSocial}\n`
    );
    //limpia el formulario
    formAltaMedico.reset();
    //actualiza la vista de medicos
    renderizarCards();
}
    //asocia la funcion altaMedicos al evento submit
formAltaMedico.addEventListener("submit", altaMedicos)
