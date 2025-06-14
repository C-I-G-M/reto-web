import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
export default function ProtectedRoute(){
const auth = useAuth()
return auth.IsAuthenticated ? <Outlet/> : <Navigate to="/" />
}