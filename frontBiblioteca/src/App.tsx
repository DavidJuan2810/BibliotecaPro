import { Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./components/globales/toast";
import Principal from "./components/globales/principal";
import AutoresPage from "./pages/autorPagina";
import BibliotecasPage from "./pages/bibliotecaPagina";
import LibrosPage from "./pages/libroPagina";
import Login from "./components/globales/login";
import Register from "./components/globales/register";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/api"
          element={
            <ProtectedRoute>
              <Principal />
            </ProtectedRoute>
          }
        >
          <Route path="autores" element={<AutoresPage />} />
          <Route path="bibliotecas" element={<BibliotecasPage />} />
          <Route path="libros" element={<LibrosPage />} />
        </Route>
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </ToastProvider>
  );
}