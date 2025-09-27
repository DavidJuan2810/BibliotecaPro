import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import ModalGlobal from "../components/globales/modal";
import ListaBibliotecas from "../components/biblioteca/listarBiblioteca";
import CrearBiblioteca from "../components/biblioteca/crearBiblioteca";
import ActualizarBiblioteca from "../components/biblioteca/actualizarBiblioteca";
import { useListarBibliotecas } from "../hook/biblioteca/useBiblioteca";
import { Spinner } from "@heroui/react";

export default function BibliotecasPage() {
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

  const [bibliotecaSeleccionadaId, setBibliotecaSeleccionadaId] = useState<number | null>(null);
  const [bibliotecaViewId, setBibliotecaViewId] = useState<number | null>(null);
  const { data: bibliotecas, isLoading, error } = useListarBibliotecas();

  const handleEditarBiblioteca = (id: number) => {
    setBibliotecaSeleccionadaId(id);
    onEditarOpen();
  };

  const handleVerBiblioteca = (id: number) => {
    setBibliotecaViewId(id);
    onVerOpen();
  };

  const handleAbrirCrearModal = () => {
    onCrearOpen();
  };

  // Find the selected library from the bibliotecas data
  const bibliotecaSeleccionada = bibliotecas?.find((biblioteca) => biblioteca.id === bibliotecaViewId);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Bibliotecas</h1>

      <ListaBibliotecas
        onEditarBiblioteca={handleEditarBiblioteca}
        onVerBiblioteca={handleVerBiblioteca}
        onAbrirCrearModal={handleAbrirCrearModal}
      />

      {/* Modal para Crear */}
      <ModalGlobal
        isOpen={isCrearOpen}
        onOpenChange={onCrearOpenChange}
        title="Crear Nueva Biblioteca"
        children={<CrearBiblioteca onSuccess={onCrearClose} />}
      />

      
      <ModalGlobal
        isOpen={isEditarOpen}
        onOpenChange={onEditarOpenChange}
        title="Editar Biblioteca"
        children={
          bibliotecaSeleccionadaId && (
            <ActualizarBiblioteca
              bibliotecaId={bibliotecaSeleccionadaId}
              onSuccess={onEditarClose}
            />
          )
        }
      />

      
      <ModalGlobal
        isOpen={isVerOpen}
        onOpenChange={onVerOpenChange}
        title="Detalles de la Biblioteca"
        children={
          isLoading ? (
            <Spinner />
          ) : error ? (
            <div>Error al cargar los datos: {error.message}</div>
          ) : bibliotecaSeleccionada ? (
            <div className="flex flex-col gap-4 text-gray-200">
              <div>
                <strong className="font-semibold">Nombre:</strong> {bibliotecaSeleccionada.nombre}
              </div>
              <div>
                <strong className="font-semibold">Ubicación:</strong> {bibliotecaSeleccionada.ubicacion}
              </div>
              <div>
                <strong className="font-semibold">Libros:</strong>{" "}
                {bibliotecaSeleccionada.libros && bibliotecaSeleccionada.libros.length > 0
                  ? bibliotecaSeleccionada.libros.map((l) => `${l.id} - ${l.titulo}`).join(", ")
                  : "Ninguno"}
              </div>
            </div>
          ) : (
            <div>No se encontró la biblioteca</div>
          )
        }
      />
    </div>
  );
}