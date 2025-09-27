import { useState } from "react";
import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../globales/toast";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!correo.trim()) return showToast("El correo es obligatorio", "error");
    if (!contraseña.trim()) return showToast("La contraseña es obligatoria", "error");

    try {
      const { data } = await axios.post(`${apiUrl}/login`, {
        email: correo,
        password: contraseña,
      });

      localStorage.setItem("token", data.token);
      showToast("Inicio de sesión exitoso", "success");
      navigate("/api/autores"); // ruta después del login
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        showToast(err.response?.data?.error || "Error en el login", "error");
      } else {
        showToast("Error desconocido en el login", "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 p-6 bg-gray-200 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <Input label="Correo" type="email" value={correo} onChange={e => setCorreo(e.target.value)} required />
        <Input label="Contraseña" type="password" value={contraseña} onChange={e => setContraseña(e.target.value)} required />
        <Button type="submit" color="default" fullWidth className="bg-black text-white hover:bg-gray-900">Entrar</Button>
        <p className="text-center text-sm">
          <Link to="/register" className="text-white-300 hover:underline">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}
