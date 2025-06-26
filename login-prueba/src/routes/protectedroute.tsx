import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
export default function ProtectedRoute(){
const auth = useAuth()

  if (auth.authLoading) {
    return <div>Cargando sesión...</div>; // mensaje de carga
  }

  return auth.IsAuthenticated ? <Outlet /> : <Navigate to="/" />;
}