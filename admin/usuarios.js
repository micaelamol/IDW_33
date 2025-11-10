
document.addEventListener("DOMContentLoaded", async () => {
  const tablaUsuariosBody = document.querySelector('#tablaUsuarios tbody');
  try {
    const response = await fetch('https://dummyjson.com/users');
    if (response.ok) {
      const data = await response.json();
      const usuarios = data.users;

      usuarios.forEach(element => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${element.id}</td>
          <td>${element.firstName}</td>
          <td>${element.lastName}</td>
          <td>${element.username}</td>
          <td>${element.email}</td>
          <td>${element.phone}</td>
        `;
        tablaUsuariosBody.appendChild(fila);
      });
    } else {
      console.error("Estado de respuesta:", response.status);
      throw new Error("Error al cargar usuarios");
    }
  } catch (error) {
    console.error("Error en la API Dummy:", error);
    alert("Error en la API Dummy");
  }
});
