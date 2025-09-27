import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

export interface ActualizarAutorPayload {
  nombre: string;
  nacionalidad: string;
  libroIds?: number[];
}

export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
  libro?: { id: number }[];
}

export const useActualizarAutor = (
  id: number
): UseMutationResult<Autor, Error, ActualizarAutorPayload> => {
  const queryClient = useQueryClient();

  return useMutation<Autor, Error, ActualizarAutorPayload>({
    mutationFn: async (autorActualizado) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const apiUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.put(`${apiUrl}/autores/${id}`, autorActualizado, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["autor"] });
      queryClient.invalidateQueries({ queryKey: ["autor", id] });
    },
  });
};
