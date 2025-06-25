import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

export default function RoleProtectedRoute({ allowedRoles }: RoleProtectedRouteProps) {
  const { authLoading, IsAuthenticated, getUser } = useAuth();

  if (authLoading) return <div>Cargando sesión...</div>;
  if (!IsAuthenticated) return <Navigate to="/" />;

  const user = getUser();
  if (!user || !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
