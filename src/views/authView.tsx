// AuthView.tsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAuthView } from "../store/authSlice";
import type { RootState } from "../store/store";
import { login, register } from "../api/auth"; // Importamos las funciones de autenticación
import type { User } from "../types/user"; // Asumiendo que User está definido en un archivo de tipos
import { toast } from "react-toastify"; // Importamos toast para mostrar notificaciones
import { useNavigate } from "react-router-dom";

export default function AuthView() {
  const isRegisterView = useSelector(
    (state: RootState) => state.auth.isRegisterView
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<1 | 2 | 3 | "">("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleView = () => {
    dispatch(toggleAuthView());
    // Limpiar formulario y errores al cambiar de vista
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      if (isRegisterView) {
        // Validar datos de registro
        if (!email || !password || !confirmPassword || !role) {
          setError("Todos los campos son obligatorios");
          setIsLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError("Las contraseñas no coinciden");
          setIsLoading(false);
          return;
        }

        // Preparar datos de usuario y llamar a register
        const userData: User = {
          email,
          password,
          role,
        };

        const response = await register(userData);
        toast.success("Usuario registrado con éxito por favor inicia sesión");
        // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
        console.log("Data:", userData);
        console.log("Usuario registrado:", response);
        // Aquí podrías manejar la respuesta, guardar el token, etc.
      } else {
        // Validar datos de login
        if (!email || !password) {
          setError("Email y contraseña son obligatorios");
          toast.error("Email y contraseña son obligatorios");
          setIsLoading(false);
          return;
        }

        // Llamar a login
        const response = await login(email, password);
        toast.success("Usuario autenticado con éxito");
        navigate("/dashboard");
        console.log("Usuario autenticado:", response);
        // Aquí podrías manejar la respuesta, guardar el token, etc.
      }

      // Limpiar formulario después de éxito
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
    } catch (err) {
      console.error("Error de autenticación:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Error en el proceso de autenticación"
      );
      setError(
        err instanceof Error
          ? err.message
          : "Error en el proceso de autenticación"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center rounded-xl items-center p-6 bg-gray-50">
      <div
        className={`flex flex-col ${
          isRegisterView ? "md:flex-row" : "md:flex-row-reverse"
        } w-full max-w-6xl gap-8`}
      >
        {/* Image Section */}
        <div className="hidden md:block w-full md:w-1/2 h-[500px] md:h-auto overflow-hidden rounded-xl shadow-lg">
          <img
            src={
              isRegisterView
                ? "https://nft-sandy-five.vercel.app/ac.svg"
                : "https://nft-sandy-five.vercel.app/ac.svg"
            }
            className="h-full w-full object-cover"
            alt="Magiclog"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {isRegisterView ? "Create Account" : "Welcome Back"}
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
            {isRegisterView
              ? "Welcome! Enter your details and start creating, collecting and selling NFTs."
              : "Log in to access your account and continue your NFT journey."}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {isRegisterView && (
              <select
                className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={role}
                onChange={(e) => setRole(e.target.value as 1 | 2 | 3 | "")}
              >
                <option value="">Select role</option>
                <option value={1}>1. Customer</option>
                <option value={2}>2. Seller</option>
                <option value={3}>3. Admin</option>
              </select>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {isRegisterView && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading
                ? "Procesando..."
                : isRegisterView
                ? "Create Account"
                : "Log In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={toggleView}
              className="bg-white border-none text-blue-600 hover:text-blue-800 font-medium"
            >
              {isRegisterView
                ? "Already have an account? Log In"
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
