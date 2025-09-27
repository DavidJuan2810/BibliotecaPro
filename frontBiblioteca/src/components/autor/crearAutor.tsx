import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useCrearAutor } from "../../hook/useCrearAutor";
import { useToast } from "../globales/toast";

interface Props {
  onSuccess: () => void; // Para cerrar modal tras éxito
}

export default function CrearAutor({ onSuccess }: Props) {
  const [nombre, setNombre] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");

  const { showToast } = useToast();
  const crearAutorMutation = useCrearAutor();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 Validación antes de enviar
    if (!nombre.trim() || !nacionalidad.trim()) {
      showToast("Nombre y nacionalidad son obligatorios", "error");
      return;
    }

    crearAutorMutation.mutate(
      { nombre, nacionalidad },
      {
        onSuccess: () => {
          showToast("Autor creado correctamente", "success");
          onSuccess(); // Cierra modal
        },
        onError: (err) => {
          showToast(`Error: ${err.message}`, "error");
        },
      }
    );
  };

  return (
    <Form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        label="Nombre" className="text-gray-200 !important"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        classNames={{
          label: "text-gray-200 !important", // Color gris claro para el título del input
        }}
      />
      <Input
        isRequired
        label="Nacionalidad"
        labelPlacement="outside"
        name="nacionalidad"
        placeholder="Ingrese la nacionalidad"
        type="text"
        value={nacionalidad}
        onChange={(e) => setNacionalidad(e.target.value)}
        classNames={{
          label: "text-gray-200 !important", 
        }}
      />
      <Button
        className="text-sm bg-gray-300 text-gray-700"
        type="submit"
        isLoading={crearAutorMutation.isPending}
      >
        Crear Autor
      </Button>
    </Form>
  );
}