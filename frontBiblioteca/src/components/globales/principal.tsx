import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Button,
} from "@heroui/react";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";



export default function Principal() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-100 p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold mb-4">Menú</h2>
        <Link as={RouterLink} to="/api/bibliotecas" className="text-black hover:underline">
            Bibliotecas
        </Link>
        <Link as={RouterLink} to="/api/autores" className="text-black hover:underline">
            Autores
        </Link>
        <Link as={RouterLink} to="/api/libros" className="text-black hover:underline">
           Libros
        </Link>
        <Button 
            color="default" 
            variant="flat" 
            onPress={handleLogout} 
            className="mt-auto text-sm bg-gray-300 text-gray-700">
            Cerrar Sesión
        </Button>


      </nav>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar position="static" className="bg-white shadow-md">
          <NavbarBrand>
            <p className="font-bold text-inherit ml-2 text-center w-full">Sistema para biblioteca</p>
          </NavbarBrand>
          <NavbarContent justify="end">
          </NavbarContent>
        </Navbar>

        {/* Aquí se renderizan las rutas hijas */}
        <main className="p-6 flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}