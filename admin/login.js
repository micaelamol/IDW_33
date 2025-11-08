
import { login } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const mensajeError = document.getElementById("mensajeError");

  // Función para mostrar errores en pantalla
  function mostrarError(texto) {
    if (mensajeError) {
      mensajeError.textContent = texto;
    } else {
      alert(texto);
    }
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const usuarioInput = document.getElementById("usuario").value.trim();
      const claveInput = document.getElementById("contrasena").value.trim();

      if (!usuarioInput || !claveInput) {
        mostrarError("Por favor, complete todos los campos.");
        return;
      }

      try {
        const userRemoto = await login(usuarioInput, claveInput);

        console.log("userRemoto completo:", userRemoto);
        console.log("Token:", userRemoto.accessToken);
        console.log("Username:", userRemoto.username);

        // Guardar token y usuario si login fue exitoso
        if (userRemoto && userRemoto.accessToken) {
          sessionStorage.setItem("adminLogueado", userRemoto.username);
          sessionStorage.setItem("token", userRemoto.accessToken);
          // Redirigir a admin.html
          window.location.href = "admin.html";
        } else {
          mostrarError("Usuario o contraseña incorrectos.");
        }
      } catch (error) {
        mostrarError(error.message || "Error de conexión. Intente más tarde.");
      }
    });
  }
});
