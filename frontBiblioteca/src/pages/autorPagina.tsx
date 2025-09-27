import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import ModalGlobal from "../components/globales/modal";
import ListaAutores from "../components/autor/listarAutor";
import CrearAutor from "../components/autor/crearAutor";
import ActualizarAutor from "../components/autor/actualizarAutor";
import { useListarAutores } from "../hook/useAutor";
import { Spinner } from "@heroui/react";

export default function AutoresPage() {
  const {
    isOpen: isCrearOpen,
    onOpen: onCrearOpen,
    onOpenChange: onCrearOpenChange,
    onClose: onCrearClose,
  } = useDisclosure();

  const {
    isOpen: isEditarOpen,
    onOpen: onEditarOpen,
    onOpenChange: onEditarOpenChange,
    onClose: onEditarClose,
  } = useDisclosure();

  const {
    isOpen: isVerOpen,
    onOpen: onVerOpen,
    onOpenChange: onVerOpenChange,
  } = useDisclosure();

  const [autorSeleccionadoId, setAutorSeleccionadoId] = useState<number | null>(null);
  const [autorViewId, setAutorViewId] = useState<number | null>(null);
  const { data: autores, isLoading, error } = useListarAutores();

  const handleEditarAutor = (id: number) => {
    setAutorSeleccionadoId(id);
    onEditarOpen();
  };

  const handleVerAutor = (id: number) => {
    setAutorViewId(id);
    onVerOpen();
  };

  const handleAbrirCrearModal = () => {
    onCrearOpen();
  };

  // Find the selected author from the autores data
  const autorSeleccionado = autores?.find((autor) => autor.id === autorViewId);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Autores</h1>

      <ListaAutores
        onEditarAutor={handleEditarAutor}
        onVerAutor={handleVerAutor}
        onAbrirCrearModal={handleAbrirCrearModal}
      />

      {/* Modal para Crear */}
      <ModalGlobal
        isOpen={isCrearOpen}
        onOpenChange={onCrearOpenChange}
        title="Crear Nuevo Autor"
        children={<CrearAutor onSuccess={onCrearClose} />}
      />

      {/* Modal para Editar */}
      <ModalGlobal
        isOpen={isEditarOpen}
        onOpenChange={onEditarOpenChange}
        title="Editar Autor"
        children={
          autorSeleccionadoId && (
            <ActualizarAutor
              autorId={autorSeleccionadoId}
              onSuccess={onEditarClose}
            />
          )
        }
      />

      {/* Modal para Consultar Detalles */}
      <ModalGlobal
        isOpen={isVerOpen}
        onOpenChange={onVerOpenChange}
        title="Detalles del Autor"
        children={
          isLoading ? (
            <Spinner />
          ) : error ? (
            <div>Error al cargar los datos: {error.message}</div>
          ) : autorSeleccionado ? (
            <div className="flex flex-col gap-4 text-gray-200">
              <div>
                <strong className="font-semibold">Nombre:</strong> {autorSeleccionado.nombre}
              </div>
              <div>
                <strong className="font-semibold">Nacionalidad:</strong> {autorSeleccionado.nacionalidad}
              </div>
              <div>
                <strong className="font-semibold">Libros:</strong>{" "}
                {autorSeleccionado.libros && autorSeleccionado.libros.length > 0
                  ? autorSeleccionado.libros.map((l) => `${l.id} - ${l.titulo}`).join(", ")
                  : "Ninguno"}
              </div>
            </div>
          ) : (
            <div>No se encontró el autor</div>
          )
        }
      />
    </div>
  );
}