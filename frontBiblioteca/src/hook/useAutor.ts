import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
  libros?: { id: number; titulo: string }[]; // 🔹 ahora plural
}

export const useListarAutores = () => {
  return useQuery<Autor[], Error>({
    queryKey: ["autores"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const apiUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.get(`${apiUrl}/autores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
};
