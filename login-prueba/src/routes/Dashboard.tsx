import { useAuth } from "../Auth/AuthProvider";
import PortalLayout from "../layout/portalLayout";
import RegSolicitud from "../routes/RegSolicitud";

export default function Dashboard() {
  const auth = useAuth();
  const user = auth.getUser();

  return (
    <PortalLayout>
      <h1 className="mb-6 text-2xl font-bold">
        Dashboard de {user?.username ?? ""}
      </h1>

      {/* Aquí renderizas el formulario */}
      {user?.id ? (
        <RegSolicitud userId={user.id} />
      ) : (
        <p className="text-red-500">No se encontró usuario.</p>
      )}
    </PortalLayout>
  );
}
