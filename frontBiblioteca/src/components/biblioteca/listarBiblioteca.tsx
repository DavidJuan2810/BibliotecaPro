import React, { useMemo, useState } from "react";
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
import { HiDotsHorizontal } from "react-icons/hi";
import { useListarBibliotecas, Biblioteca } from "../../hook/biblioteca/useBiblioteca";

interface Props {
  onEditarBiblioteca: (id: number) => void;
  onVerBiblioteca: (id: number) => void;
  onAbrirCrearModal: () => void;
}

export default function ListaBibliotecas({ onEditarBiblioteca, onVerBiblioteca, onAbrirCrearModal }: Props) {
  const { data: bibliotecas, isLoading, error } = useListarBibliotecas();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return bibliotecas ? Math.ceil(bibliotecas.length / rowsPerPage) : 0;
  }, [bibliotecas]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return bibliotecas?.slice(start, start + rowsPerPage) ?? [];
  }, [bibliotecas, page]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      <div className="flex justify-start items-center mb-2">
        <Button
          className="text-sm bg-gray-300 text-gray-700"
          onPress={() => onAbrirCrearModal()}
        >
          Crear Biblioteca
        </Button>
      </div>

      <Table
        aria-label="Lista de bibliotecas con paginación"
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
          <TableColumn key="ubicacion">Ubicación</TableColumn>
          <TableColumn key="libros">Libros</TableColumn>
          <TableColumn key="acciones">Acciones</TableColumn>
        </TableHeader>

        <TableBody
          items={items}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(biblioteca: Biblioteca) => (
            <TableRow key={biblioteca.id}>
              {(columnKey: React.Key) => {
                const keyStr = String(columnKey);
                if (keyStr === "acciones") {
                  return (
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light" isIconOnly>
                            <HiDotsHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Acciones">
                          <DropdownItem key="ver" onPress={() => onVerBiblioteca(biblioteca.id)}>
                            Consultar
                          </DropdownItem>
                          <DropdownItem key="editar" onPress={() => onEditarBiblioteca(biblioteca.id)}>
                            Editar
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  );
                }
                if (keyStr === "libros") {
                  return (
                    <TableCell>
                      {biblioteca.libros && biblioteca.libros.length > 0
                        ? biblioteca.libros.map((libro) => `${libro.id} - ${libro.titulo}`).join(", ")
                        : "Sin libros"}
                    </TableCell>
                  );
                }
                return <TableCell>{getKeyValue(biblioteca, keyStr)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}