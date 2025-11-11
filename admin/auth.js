
export async function login(username, password) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ username, password })
    });

    console.log("HTTP status:", response.status);
    
    console.log("Response headers:", response.headers.get("content-type"));

    const data = await response.json();
    
    console.log("Respuesta API login:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.message || `Login falló (status ${response.status})`);
    }

    return data;
  } catch (error) {
    console.error("Error en login (auth.js):", error);

    throw error;
  }
}

