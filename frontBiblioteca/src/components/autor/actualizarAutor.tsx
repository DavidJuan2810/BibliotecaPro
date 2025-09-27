import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useActualizarAutor } from "../../hook/useActualizarAutor";
import { useListarAutores } from "../../hook/useAutor";
import { useToast } from "../globales/toast";

interface Props {
  autorId: number;
  onSuccess: () => void;
}

export default function ActualizarAutor({ autorId, onSuccess }: Props) {
  const { data: autores, isLoading: loadingAutores, error: errorAutores } = useListarAutores();
  const autor = autores?.find((a) => a.id === autorId);

  const [nombre, setNombre] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");

  const { showToast } = useToast();
  const actualizarAutorMutation = useActualizarAutor(autorId);

  useEffect(() => {
    if (autor) {
      setNombre(autor.nombre);
      setNacionalidad(autor.nacionalidad);
    }
  }, [autor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !nacionalidad) {
      showToast("Nombre y nacionalidad son obligatorios", "error");
      return;
    }
    actualizarAutorMutation.mutate(
      { nombre, nacionalidad },
      {
        onSuccess: () => {
          showToast("Autor actualizado correctamente", "success");
          onSuccess();
        },
        onError: (err) => {
          showToast(`Error: ${err.message}`, "error");
        },
      }
    );
  };

  if (loadingAutores) return <p>Cargando autor...</p>;
  if (errorAutores) return <p>Error: {errorAutores.message}</p>;
  if (!autor) return <p>Autor no encontrado</p>;

  return (
    <Form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        label="Nombre"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
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
      />
      <Button
        className="text-sm bg-gray-300 text-gray-700"
        type="submit"
        isLoading={actualizarAutorMutation.isPending}
      >
        Actualizar Autor
      </Button>
    </Form>
  );
}
