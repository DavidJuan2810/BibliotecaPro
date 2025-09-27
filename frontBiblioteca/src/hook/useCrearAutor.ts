import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

export interface CrearAutorPayload {
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

export const useCrearAutor = (): UseMutationResult<Autor, Error, CrearAutorPayload> => {
  const queryClient = useQueryClient();

  return useMutation<Autor, Error, CrearAutorPayload>({
    mutationFn: async (nuevoAutor) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const apiUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.post(`${apiUrl}/autores`, nuevoAutor, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["autores"] });
    },
  });
};
