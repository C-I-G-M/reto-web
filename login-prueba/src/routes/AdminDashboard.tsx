import { useAuth } from "../Auth/AuthProvider";
import PortalLayout from "../layout/portalLayout";


export default function AdminDashboard(){

    const auth = useAuth();
    return(
        <PortalLayout>
            <h1>Admin Dashboard de {auth.getUser()?.username || ""}</h1>
            <p>Bienvenido al panel de administración.</p>
        </PortalLayout>
    );
}