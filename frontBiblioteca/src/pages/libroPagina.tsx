import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import ModalGlobal from "../components/globales/modal";
import ListaLibros from "../components/libro/listarLibro";
import CrearLibro from "../components/libro/crearLibro";
import ActualizarLibro from "../components/libro/actualizarLibro";
import { useListarLibros } from "../hook/libro/useLibro";
import { Spinner } from "@heroui/react";

export default function LibrosPage() {
  // Modal para crear libro
  const {
    isOpen: isCrearOpen,
    onOpen: onCrearOpen,
    onOpenChange: onCrearOpenChange,
    onClose: onCrearClose,
  } = useDisclosure();

  // Modal para editar libro
  const {
    isOpen: isEditarOpen,
    onOpen: onEditarOpen,
    onOpenChange: onEditarOpenChange,
    onClose: onEditarClose,
  } = useDisclosure();

  // Modal para ver detalles
  const {
    isOpen: isVerOpen,
    onOpen: onVerOpen,
    onOpenChange: onVerOpenChange,
  } = useDisclosure();

  const [libroSeleccionadoId, setLibroSeleccionadoId] = useState<number | null>(null);
  const [libroViewId, setLibroViewId] = useState<number | null>(null);

  // Hook que trae todos los libros
  const { data: libros, isLoading, error } = useListarLibros();

  // Función al hacer clic en "Editar"
  const handleEditarLibro = (id: number) => {
    setLibroSeleccionadoId(id);
    onEditarOpen(); // abre el modal de edición
  };

  // Función al hacer clic en "Ver"
  const handleVerLibro = (id: number) => {
    setLibroViewId(id);
    onVerOpen(); // abre el modal de ver detalles
  };

  // Abrir modal para crear
  const handleAbrirCrearModal = () => {
    onCrearOpen();
  };

  // Buscar libro que se va a mostrar en el modal de "ver"
  const libroSeleccionado = libros?.find((libro) => libro.id === libroViewId);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Libros</h1>

      {/* Lista de libros */}
      <ListaLibros
        onEditarLibro={handleEditarLibro}
        onVerLibro={handleVerLibro}
        onAbrirCrearModal={handleAbrirCrearModal}
      />

      {/* Modal para Crear */}
      <ModalGlobal
        isOpen={isCrearOpen}
        onOpenChange={onCrearOpenChange}
        title="Crear Nuevo Libro"
      >
        <CrearLibro onSuccess={onCrearClose} />
      </ModalGlobal>

      {/* Modal para Editar */}
      <ModalGlobal
        isOpen={isEditarOpen}
        onOpenChange={onEditarOpenChange}
        title="Editar Libro"
      >
        {libroSeleccionadoId ? (
          <ActualizarLibro
            libroId={libroSeleccionadoId}
            onSuccess={onEditarClose}
          />
        ) : (
          <Spinner /> // Muestra spinner mientras carga el libro
        )}
      </ModalGlobal>

      {/* Modal para Consultar Detalles */}
      <ModalGlobal
        isOpen={isVerOpen}
        onOpenChange={onVerOpenChange}
        title="Detalles del Libro"
      >
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div>Error al cargar los datos: {error.message}</div>
        ) : libroSeleccionado ? (
          <div className="flex flex-col gap-4 text-gray-200">
            <div>
              <strong className="font-semibold">Título:</strong>{" "}
              {libroSeleccionado.titulo}
            </div>
            <div>
              <strong className="font-semibold">Publicación:</strong>{" "}
              {new Date(libroSeleccionado.publicacion).toLocaleDateString()}
            </div>
            <div>
              <strong className="font-semibold">Autores:</strong>{" "}
              {libroSeleccionado.autores?.map((a) => a.nombre).join(", ") ||
                "Ninguno"}
            </div>
          </div>
        ) : (
          <div>No se encontró el libro</div>
        )}
      </ModalGlobal>
    </div>
  );
}
