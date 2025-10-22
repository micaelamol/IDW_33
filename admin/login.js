document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const modoOscuroBtn = document.getElementById("modoOscuroBtn");

  // Activar modo oscuro
  if (modoOscuroBtn) {
    modoOscuroBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // Validación del login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();
      const mensajeError = document.getElementById("mensajeError");
      for (let user of usuarios) {
        
        if (usuario === user.usuario && contrasena === user.contrasena) {
          sessionStorage.setItem("adminLogueado", "true");
          window.location.href = "admin.html";
        }
      }
      if (mensajeError) {
        mensajeError.textContent = "USUARIO O CONTRASEÑA INCORRECTO.";
      } else {
        alert("USUARIO O CONTRASEÑA INCORRECTO.");
      }
    });
  }
});
