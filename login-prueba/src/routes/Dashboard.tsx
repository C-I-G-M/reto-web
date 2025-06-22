import { useAuth } from "../Auth/AuthProvider";
import PortalLayout from "../layout/portalLayout";


export default function Dashboard(){

    const auth = useAuth();
    return(
        <PortalLayout>
         <h1>Dashboard de {auth.getUser()?.name || ""}</h1>
         </PortalLayout>
        );
}