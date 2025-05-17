export const BASE_URL = "http://localhost:3100/api/v1";
import type { User } from "../types/user";

export const login = async (email: string, password: string) => {
  try {
    console.log("Intentando iniciar sesión con:", { email, password });

    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Error respuesta:", res.status, errorData);
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    const data = await res.json();

    // Guardar access_token en cookie (ej: por 1 día)
    document.cookie = `access_token=${data.access_token}; path=/; max-age=${
      60 * 60 * 24
    }; samesite=strict`;

    return data;
  } catch (error) {
    console.error("Error completo en login:", error);
    throw error;
  }
};

export const register = async (userData: User) => {


  try {
    console.log("Intentando registrar usuario:", userData);

    // Asegurar que el role sea un número
    const apiData = {
      ...userData,
      role:
        typeof userData.role === "string"
          ? parseInt(userData.role)
          : userData.role,
    };

    console.log("Datos formateados para API:", apiData);

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Desactivamos las credenciales para evitar problemas de CORS en desarrollo
        "Access-Control-Allow-Origin": "*",
      },
      // Añadimos mode: 'cors' explícitamente
      mode: "cors",
      body: JSON.stringify(apiData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Error respuesta:", res.status, errorData);
      throw new Error(errorData.message || "Error al registrar usuario");
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en register:", error);
    throw error;
  }
};

export const Profile = async () => {
  try {
    // Extraer el access_token desde las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }

    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Error respuesta:", res.status, errorData);
      throw new Error(errorData.message || "Error al obtener perfil");
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en profile:", error);
    throw error;
  }
};
