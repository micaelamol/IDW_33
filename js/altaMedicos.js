const formAltaMedico = document.getElementById ("altaMedicoForm");
const inputNombre = document.getElementById ("nombre");
const inputEspecialidad = document.getElementById ("especialidad");
const inputMatricula = document.getElementById ("matricula");
const inputEmail = document.getElementById ("email");
const inputTelefono = document.getElementById ("telefono");
const inputObraSocial = document.getElementById ("obraSocial");

function altaMedicos(event){
    event.preventDefault();
    let nombre = inputNombre.value.trim();
    let especialidad = inputEspecialidad.value.trim();
    let matricula = inputMatricula.value.trim();
    let email = inputEmail.value.trim();
    let telefono = inputTelefono.value.trim();
    let obraSocial = inputObraSocial.value.trim();

    if (!nombre || !especialidad || !matricula || !email || !telefono || !obraSocial){
        alert("por favor completar los campos requeridos");
        return;
    }

    alert(
        `Medico registrado:\n\n` +
        `Nombre: ${nombre}\n` +
        `especialidad: ${especialidad}\n` +
        `matricula: ${matricula}\n` +
        `email: ${email}\n` +
        `telefono: ${telefono}\n` +
        `obraSocial: ${obraSocial}\n`
    );
    formAltaMedico.reset();
}

formAltaMedico.addEventListener("submit", altaMedicos)
