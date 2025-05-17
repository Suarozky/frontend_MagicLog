import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { TokenPayload } from "../types/token";



function decodeTokenFromCookie(): TokenPayload | null {
  try {
    const cookie = document.cookie;
    const token = cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Token de autenticación no encontrado en cookies");
    }

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload) as TokenPayload;
  } catch (err) {
    console.error("Error al decodificar token:", err);
    return null;
  }
}

export function RedirectByRole() {
  const navigate = useNavigate();

  useEffect(() => {
    const payload = decodeTokenFromCookie();
    console.log("Payload:", payload);

    if (payload) {
      const roleId = payload.role.id;

      if (roleId === 2 || roleId === 3) {
        navigate("/dashboard");
      } else if (roleId === 1) {
        navigate("/store");
      }
    }
  }, [navigate]);

  return null;
}
