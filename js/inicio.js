document.addEventListener("DOMContentLoaded", (event) => {

fetch('json/medicos.json')
.then(response=>{
  if(!response.ok) {
    throw new ("error al cargar el archivo");
  }
  return response.json();
        })
        .then(data=>{
          localStorage.setItem("medicos",JSON.stringify(data));
          console.log(typeof(data))

          let datos=localStorage.getItem('medicos');
        console.log(typeof(JSON.parse(datos)));
        let j=JSON.parse(datos);
        console.log(j);
            j["0"].medicos.forEach((element) => {
              console.log(element.nombre)
          let cards= document.getElementById('cards')
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
      </div>`
            
            });
        })


        sessionStorage.setItem('usuario',"paciente");
       
        

        
            });

            
      
        
    