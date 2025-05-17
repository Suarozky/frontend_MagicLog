import { config } from "../config/config";
import type { ProductData } from "../types/products";

export const getProducts = async () => {
  try {
    // Extraer el access_token desde las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }

    const res = await fetch(`${config.BASE_URL}/products`, {
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
      throw new Error(errorData.message || "Error al obtener productos");
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en getProducts:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    // Extraer el access_token desde las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }

    const res = await fetch(`${config.BASE_URL}/products/get?id=${id}`, {
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
      throw new Error(errorData.message || "Error al obtener producto");
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en getProductById:", error);
    throw error;
  }
};

export const getProductsByUserId = async (userId: string) => {
  try {
    // Extraer el access_token desde las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }
    const url = new URL(`${config.BASE_URL}/products/get-by-user`);
    url.searchParams.append("userId", userId);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      // Enviamos el userId en el cuerpo de la solicitud
      mode: "cors",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Error respuesta:", res.status, errorData);
      throw new Error(
        errorData.message || "Error al obtener productos por usuario"
      );
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en getProductsByUserId:", error);
    throw error;
  }
};

export const createProduct = async (productData: ProductData) => {
  try {
    // Extraer el access_token desde las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }

    const res = await fetch(`${config.BASE_URL}/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(productData),
      mode: "cors",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Error respuesta:", res.status, errorData);
      throw new Error(errorData.message || "Error al crear producto");
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en createProduct:", error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  console.log("ID a eliminar:", id);
  try {
    // Extraer el access_token desde las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }

    const res = await fetch(`${config.BASE_URL}/products/delete?id=${id}`, {
      method: "DELETE",
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
      throw new Error(errorData.message || "Error al eliminar producto");
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en deleteProduct:", error);
    throw error;
  }
};
