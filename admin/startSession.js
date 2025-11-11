export function startSession(token, username) {
  try {
   return fetch("https://dummyjson.com/auth/me", {
      method: "GET" /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data.username === username;
      });
  } catch (e) {
    throw new Error(`Error al iniciar sesión: ${e.message}`);
  }
}
