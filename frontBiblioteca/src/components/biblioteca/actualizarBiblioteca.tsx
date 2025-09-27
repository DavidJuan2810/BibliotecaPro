import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, SelectItem } from "@heroui/react";
import { useActualizarBiblioteca } from "../../hook/biblioteca/useActualizarBiblioteca";
import { useListarBibliotecas } from "../../hook/biblioteca/useBiblioteca";
import { useListarLibros } from "../../hook/libro/useLibro";
import { useToast } from "../globales/toast";

interface Props {
  bibliotecaId: number;
  onSuccess: () => void;
}

export default function ActualizarBiblioteca({ bibliotecaId, onSuccess }: Props) {
  const { data: bibliotecas, isLoading: loadingBibliotecas, error: errorBibliotecas } =
    useListarBibliotecas();
  const { data: libros } = useListarLibros();

  const biblioteca = bibliotecas?.find((b) => b.id === bibliotecaId);

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [libroIds, setLibroIds] = useState<number[]>([]);

  const { showToast } = useToast();
  const actualizarBibliotecaMutation = useActualizarBiblioteca(bibliotecaId);

  useEffect(() => {
    if (biblioteca) {
      setNombre(biblioteca.nombre);
      setUbicacion(biblioteca.ubicacion);
      setLibroIds(biblioteca.libros?.map((l) => l.id) || []);
    }
  }, [biblioteca]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !ubicacion.trim()) {
      showToast("Nombre y ubicación son obligatorios", "error");
      return;
    }

    actualizarBibliotecaMutation.mutate(
      { nombre, ubicacion, libroIds },
      {
        onSuccess: () => {
          showToast("Biblioteca actualizada correctamente", "success");
          onSuccess();
        },
        onError: (err) => {
          showToast(`Error: ${err.message}`, "error");
        },
      }
    );
  };

  if (loadingBibliotecas) return <p>Cargando biblioteca...</p>;
  if (errorBibliotecas) return <p>Error: {errorBibliotecas.message}</p>;
  if (!biblioteca) return <p>Biblioteca no encontrada</p>;

  return (
    <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Nombre"
        labelPlacement="outside"
        placeholder="Ingrese el nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <Input
        isRequired
        label="Ubicación"
        labelPlacement="outside"
        placeholder="Ingrese la ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
      />
      <Select
        label="Libros"
        selectionMode="multiple"
        placeholder="Seleccione los libros"
        selectedKeys={libroIds.map(String)}
        onSelectionChange={(keys) => {
          const ids = Array.from(keys as Set<string>).map(Number);
          setLibroIds(ids);
        }}
      >
        {(libros ?? []).map((libro) => (
          <SelectItem key={libro.id}>{libro.titulo}</SelectItem>
        ))}
      </Select>
      <Button
        className="text-sm bg-gray-300 text-gray-700"
        type="submit"
        isLoading={actualizarBibliotecaMutation.isPending}
      >
        Actualizar Biblioteca
      </Button>
    </Form>
  );
}