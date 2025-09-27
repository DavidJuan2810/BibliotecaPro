import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, SelectItem } from "@heroui/react";
import { DateValue } from "@internationalized/date";
import { useCrearLibro } from "../../hook/libro/useCrearLibro";
import { useListarAutores } from "../../hook/useAutor";
import { useToast } from "../globales/toast";

interface Props {
  onSuccess: () => void;
}

export default function CrearLibro({ onSuccess }: Props) {
  const [titulo, setTitulo] = useState("");
  const [publicacion, setPublicacion] = useState<DateValue | null>(null);
  const [autores, setAutores] = useState<number[]>([]);

  const { showToast } = useToast();
  const { data: autoresList } = useListarAutores();
  const crearLibroMutation = useCrearLibro();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      showToast("El título es obligatorio", "error");
      return;
    }
    if (!publicacion) {
      showToast("La fecha de publicación es obligatoria", "error");
      return;
    }
    if (autores.length === 0) {
      showToast("Debe seleccionar al menos un autor", "error");
      return;
    }

    // ✅ Convertir DateValue a ISO string
    const fechaStr = publicacion.toString(); // Ej: "2025-09-07"

    crearLibroMutation.mutate(
      { titulo, publicacion: fechaStr, autores },  // ✅ cambiado
      {
        onSuccess: () => {
          showToast("Libro creado correctamente", "success");
          onSuccess();
          setTitulo("");
          setPublicacion(null);
          setAutores([]);
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
        label="Título"
        labelPlacement="outside"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <DatePicker
        isRequired
        label="Fecha de publicación"
        labelPlacement="outside"
        value={publicacion}
        onChange={(date) => setPublicacion(date)}
      />
      <Select
        label="Autores"
        selectionMode="multiple"
        selectedKeys={autores.map(String)}
        onSelectionChange={(keys) =>
          setAutores(Array.from(keys as Set<string>).map(Number))
        }
      >
        {(autoresList ?? []).map((a) => (
          <SelectItem key={a.id}>{a.nombre}</SelectItem>
        ))}
      </Select>
      <Button
        className="text-sm bg-gray-300 text-gray-700"
        type="submit"
        isLoading={crearLibroMutation.isPending}
      >
        Crear Libro
      </Button>
    </Form>
  );
}
