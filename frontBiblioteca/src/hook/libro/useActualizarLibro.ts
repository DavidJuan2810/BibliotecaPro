import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

export interface ActualizarLibroPayload {
  titulo: string;
  publicacion: string; 
  autores?: number[];   // ✅ ahora plural, igual al backend
  sede?: number[];
}

export interface Libro {
  id: number;
  titulo: string;
  publicacion: string;
  autores?: { id: number; nombre: string }[];
  sede?: { id: number; nombre: string }[];
}

export const useActualizarLibro = (
  id: number
): UseMutationResult<Libro, Error, ActualizarLibroPayload> => {
  const queryClient = useQueryClient();

  return useMutation<Libro, Error, ActualizarLibroPayload>({
    mutationFn: async (libroActualizado) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const apiUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.put(`${apiUrl}/libros/${id}`, libroActualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libros"] });
      queryClient.invalidateQueries({ queryKey: ["libro", id] });
    },
  });
};
