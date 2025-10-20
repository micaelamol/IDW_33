document.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("staf") === null) {
    localStorage.setItem("staf", JSON.stringify(staff));
  }
  let datos = localStorage.getItem("staf");

  let j = JSON.parse(datos);

  j["0"].medicos.forEach((element) => {
    let cards = document.getElementById("cards");
    cards.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 text-center">
          <img
            src="${element.tipo}${element.imagen}"
            class="card-img-top img-fluid"
            alt="Foto de la Dra. Ana Maria Ruiz - Pediatría"
          />
          <div class="card-body">
            <h5 class="card-title">Dra. ${element.nombre} ${element.apellido}</h5>
            <p class="card-text">Especialidad: ${element.especialidad}</p>
          </div>
        </div>
      </div>`;
  });
});

if (sessionStorage.getItem("adminLogueado") === null) {
  sessionStorage.setItem("adminLogueado", false);
}
