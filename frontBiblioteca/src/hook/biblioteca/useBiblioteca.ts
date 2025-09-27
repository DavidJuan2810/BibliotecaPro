import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Biblioteca {
  id: number;
  nombre: string;
  ubicacion: string;
  libros?: { id: number; titulo: string }[];
}

export const useListarBibliotecas = () => {
  return useQuery<Biblioteca[], Error>({
    queryKey: ["bibliotecas"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const apiUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.get(`${apiUrl}/bibliotecas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
  });
};