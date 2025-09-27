import React, { useState } from "react";
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import { useCrearBiblioteca } from "../../hook/biblioteca/useCrearBiblioteca";
import { useListarLibros } from "../../hook/libro/useLibro";
import { useToast } from "../globales/toast";

interface Props {
  onSuccess: () => void;
}

export default function CrearBiblioteca({ onSuccess }: Props) {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [libroIds, setLibroIds] = useState<number[]>([]);

  const { data: libros } = useListarLibros();
  const crearBibliotecaMutation = useCrearBiblioteca();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !ubicacion) {
      showToast("Nombre y ubicación son obligatorios", "error");
      return;
    }
    if (libroIds.length === 0) {
      showToast("No se seleccionaron libros", "warning");
    }
    crearBibliotecaMutation.mutate(
      { nombre, ubicacion, libroIds },
      {
        onSuccess: () => {
          showToast("Biblioteca creada correctamente", "success");
          onSuccess();
        },
        onError: (err) => {
          showToast(`Error: ${err.message}`, "error");
        },
      }
    );
  };

  return (
    <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Nombre"
        labelPlacement="outside"
        placeholder="Ingrese el nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        classNames={{
          label: "text-gray-200 !important", // Color más claro con prioridad
        }}
      />
      <Input
        isRequired
        label="Ubicación"
        labelPlacement="outside"
        placeholder="Ingrese la ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        classNames={{
          label: "text-gray-200 !important", 
        }}
      />
      <Select
        label="Libros"
        selectionMode="multiple"
        placeholder="Seleccione los libros"
        onSelectionChange={(keys) => {
          const ids = Array.from(keys as Set<string>).map(Number);
          setLibroIds(ids);
        }}
        classNames={{
          label: "text-gray-200 !important", // Color más claro con prioridad
        }}
      >
        {(libros ?? []).map((libro) => (
          <SelectItem key={libro.id}>{libro.titulo}</SelectItem>
        ))}
      </Select>
      <Button
        className="text-sm bg-gray-300 text-gray-700"
        type="submit"
        isLoading={crearBibliotecaMutation.isPending}
      >
        Crear Biblioteca
      </Button>
    </Form>
  );
}