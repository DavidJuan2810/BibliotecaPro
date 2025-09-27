import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Libro {
  id: number;
  titulo: string;
  publicacion: string; // ✅ antes era anio_publicacion
  autores?: { id: number; nombre: string }[];
  sede?: { id: number; nombre: string }[];
}

export const useListarLibros = () => {
  return useQuery<Libro[], Error>({
    queryKey: ["libros"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const apiUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.get(`${apiUrl}/libros`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data;
    },
  });
};
