import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

export interface ActualizarBibliotecaPayload {
  nombre: string;
  ubicacion: string;
  libroIds?: number[];
}

export interface Biblioteca {
  id: number;
  nombre: string;
  ubicacion: string;
  libros?: { id: number; titulo: string }[];
}

export const useActualizarBiblioteca = (
  id: number
): UseMutationResult<Biblioteca, Error, ActualizarBibliotecaPayload> => {
  const queryClient = useQueryClient();

  return useMutation<Biblioteca, Error, ActualizarBibliotecaPayload>({
    mutationFn: async (bibliotecaActualizada) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const apiUrl = import.meta.env.VITE_API_URL;

      // 👇 Convertimos libroIds -> libros
      const payload = {
        nombre: bibliotecaActualizada.nombre,
        ubicacion: bibliotecaActualizada.ubicacion,
        libros: bibliotecaActualizada.libroIds,
      };

      const { data } = await axios.put(
        `${apiUrl}/bibliotecas/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bibliotecas"] });
      queryClient.invalidateQueries({ queryKey: ["biblioteca", id] });
    },
  });
};
