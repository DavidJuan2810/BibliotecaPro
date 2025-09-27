import  { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  getKeyValue,
} from "@heroui/react";
import { HiDotsHorizontal } from "react-icons/hi"; // Changed to react-icons for three-dot icon
import { useListarLibros, Libro } from "../../hook/libro/useLibro";

interface Props {
  onEditarLibro: (id: number) => void;
  onVerLibro: (id: number) => void;
  onAbrirCrearModal: () => void;
}

export default function ListaLibros({ onEditarLibro, onVerLibro, onAbrirCrearModal }: Props) {
  const { data: libros, isLoading, error } = useListarLibros();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return libros ? Math.ceil(libros.length / rowsPerPage) : 0;
  }, [libros]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return libros?.slice(start, start + rowsPerPage) ?? [];
  }, [libros, page]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      {/* Botón arriba a la izquierda */}
      <div className="flex justify-start items-center mb-2">
        <Button
          className="text-sm bg-gray-300 text-gray-700"
          onPress={() => onAbrirCrearModal()}
        >
          Crear Libro
        </Button>
      </div>

      <Table
        aria-label="Lista de libros con paginación"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="default"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="titulo">Título</TableColumn>
          <TableColumn key="publicacion">Publicación</TableColumn>
          <TableColumn key="autores">Autores</TableColumn>
          <TableColumn key="acciones">Acciones</TableColumn>
        </TableHeader>

        <TableBody
          items={items}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(libro: Libro) => (
            <TableRow key={libro.id}>
              {(columnKey) => {
                if (columnKey === "acciones") {
                  return (
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light" isIconOnly>
                            <HiDotsHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Acciones">
                          <DropdownItem key="ver" onPress={() => onVerLibro(libro.id)}>
                            Consultar
                          </DropdownItem>
                          <DropdownItem key="editar" onPress={() => onEditarLibro(libro.id)}>
                            Editar
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  );
                }
                if (columnKey === "autores") {
                  return <TableCell>{libro.autores?.map((a) => a.nombre).join(", ") || "—"}</TableCell>;
                }
                if (columnKey === "sede") {
                  return <TableCell>{libro.sede?.map((s) => s.nombre).join(", ") || "—"}</TableCell>;
                }
                if (columnKey === "publicacion") {
                  return <TableCell>{new Date(libro.publicacion).toLocaleDateString()}</TableCell>;
                }
                return <TableCell>{getKeyValue(libro, columnKey as string)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}