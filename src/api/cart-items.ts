import { toast } from "react-toastify"; // Importamos toast para mostrar notificaciones

export const BASE_URL = "http://localhost:3100/api/v1";
export const createCartItem = async (cartItem: {
  productId: number;
  quantity: number;
}) => {
  try {
    // Extraer el access_token desde las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }

    const res = await fetch(`${BASE_URL}/cart-item/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(cartItem),
      mode: "cors",
    });

    toast.success("CartItem creado con éxito");

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      toast.error("Error al crear el cartItem");
      console.error("Error respuesta:", res.status, errorData);
      throw new Error(errorData.message || "Error al crear el cartItem");
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en createCartItem:", error);
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    // Extraer el access_token desde las cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }

    const res = await fetch(`${BASE_URL}/cart-item`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });

    toast.success("Items del carrito obtenidos con éxito");

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      toast.error("Error al obtener los cartItems");
      console.error("Error respuesta:", res.status, errorData);
      throw new Error(errorData.message || "Error al obtener los cartItems");
    }

    return res.json();
  } catch (error) {
    console.error("Error completo en getCartItems:", error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId: number) => {
    try {
        // Extraer el access_token desde las cookies
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="))
            ?.split("=")[1];
        
        if (!token) {
            throw new Error("Token de autenticación no encontrado en cookies");
        }

        // Validar que el ID sea un número válido
        if (typeof cartItemId !== 'number' || isNaN(cartItemId)) {
            throw new Error("El ID del item del carrito debe ser un número válido");
        }

        const res = await fetch(`${BASE_URL}/cart-item/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                cartItemId: cartItemId  // Cambiado a cartItemId (camelCase)
            }),
            credentials: "include"
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            toast.error(errorData.message || "Error al eliminar el item del carrito");
            console.error("Error respuesta:", res.status, errorData);
            throw new Error(errorData.message || "Error al eliminar el item del carrito");
        }

        const data = await res.json();
        toast.success("Item eliminado del carrito con éxito");
        return data;
        
    } catch (error) {
        console.error("Error completo en deleteCartItem:", error);
        toast.error(error instanceof Error ? error.message : "Error desconocido al eliminar el item");
        throw error;
    }
}