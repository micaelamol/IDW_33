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

      if (usuario === "1234" && contrasena === "1234") {
        localStorage.setItem("adminLogueado", "true");
        window.location.href = "admin.html";
      } else {
        if (mensajeError) {
          mensajeError.textContent = "Usuario o contraseña incorrectos.";
        } else {
          alert("Usuario o contraseña incorrectos.");
        }
      }
    });
  }
});