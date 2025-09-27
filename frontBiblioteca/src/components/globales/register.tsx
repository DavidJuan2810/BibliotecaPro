import { useState } from "react";
import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../globales/toast";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre.trim()) return showToast("El nombre es obligatorio", "error");
    if (!correo.trim()) return showToast("El correo es obligatorio", "error");
    if (!contraseña.trim()) return showToast("La contraseña es obligatoria", "error");

    try {
      await axios.post(`${apiUrl}/register`, {
        name: nombre,
        email: correo,
        password: contraseña,
        role: "Administrador",
      });

      showToast("Usuario registrado correctamente", "success");
      setNombre(""); setCorreo(""); setContraseña("");
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        showToast(err.response?.data?.message || "Error al registrar usuario", "error");
      } else {
        showToast("Error desconocido al registrar usuario", "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 p-6 bg-gray-200 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrar Usuario</h2>
        <Input label="Nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <Input label="Correo" type="email" value={correo} onChange={e => setCorreo(e.target.value)} required />
        <Input label="Contraseña" type="password" value={contraseña} onChange={e => setContraseña(e.target.value)} required />
        <Button type="submit" color="default" fullWidth className="bg-black text-white hover:bg-gray-900">Registrar</Button>
        <p className="text-center text-sm">
          <Link to="/login" className="text-white-300 hover:underline">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
}
