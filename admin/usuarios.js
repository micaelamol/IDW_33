document.addEventListener("DOMContentLoaded", async () => {
  try {
    const usuarios = await fetch("https://dummyjson.com/users");
    console.log(usuarios.ok);
    if (usuarios.ok) {
      const datos = await usuarios.json();
      console.log(datos.users);

      const tabla = document.querySelector("#usuarios tbody");
      console.log(tabla);
      datos.users.forEach((element) => {
        const trId = document.createElement("tr");
        

        trId.appendChild(celda(element.id));
        trId.appendChild(celda(element.firstName));
        trId.appendChild(celda(element.lastName));
        trId.appendChild(celda(element.email, "medio"));
        trId.appendChild(celda(element.phone));
        tabla.appendChild(trId);
      })
    }else{
      console.log('error en la operacion ',usuarios.status);
    }
    
  } catch (error) {
    console.log("fallo la operacion: ", error);
  }
});

function celda(valor,estilo="") {
  
  const td = document.createElement("td");
  td.textContent = valor;
  if (estilo === "medio") {
    
    td.className = "medio";
    
  }
  return td;
};
