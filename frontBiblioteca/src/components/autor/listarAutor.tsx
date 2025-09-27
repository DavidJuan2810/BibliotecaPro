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
import { HiDotsHorizontal } from "react-icons/hi"; // Using react-icons for three-dot icon
import { useListarAutores, Autor } from "../../hook/useAutor";

interface Props {
  onEditarAutor: (id: number) => void;
  onVerAutor: (id: number) => void; // Added for consult functionality
  onAbrirCrearModal: () => void;
}

export default function ListaAutores({ onEditarAutor, onVerAutor, onAbrirCrearModal }: Props) {
  const { data: autores, isLoading, error } = useListarAutores();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return autores ? Math.ceil(autores.length / rowsPerPage) : 0;
  }, [autores]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return autores?.slice(start, start + rowsPerPage) ?? [];
  }, [autores, page]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      <div className="flex justify-start items-center mb-2">
        <Button
          className="text-sm bg-gray-300 text-gray-700"
          onPress={() => onAbrirCrearModal()}
        >
          Crear Autor
        </Button>
      </div>

      <Table
        aria-label="Lista de autores con paginación"
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
          <TableColumn key="nombre">Nombre</TableColumn>
          <TableColumn key="nacionalidad">Nacionalidad</TableColumn>
          <TableColumn key="acciones">Acciones</TableColumn>
        </TableHeader>

        <TableBody
          items={items}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(autor: Autor) => (
            <TableRow key={autor.id}>
              {(columnKey) =>
                columnKey === "acciones" ? (
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="light" isIconOnly>
                          <HiDotsHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Acciones">
                        <DropdownItem key="ver" onPress={() => onVerAutor(autor.id)}>
                          Consultar
                        </DropdownItem>
                        <DropdownItem key="editar" onPress={() => onEditarAutor(autor.id)}>
                          Editar
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                ) : (
                  <TableCell>{getKeyValue(autor, columnKey as string)}</TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}