import { useAuth } from '../Auth/AuthProvider';
import RegSolicitud from '../routes/RegSolicitud';

const FunSolicitud: React.FC = () => {
  const auth = useAuth();
  const user = auth.getUser();

  if (!user?.id) {
    return <p className="p-4 text-red-600">Debes iniciar sesión para enviar una solicitud.</p>;
  }

  // You need to provide the actual values for these props, replace [] with your data sources
  return (
    <RegSolicitud
      userId={user.id}
      establecimientos={[]} // Replace with actual establecimientos data
      directoresTecnicos={[]} // Replace with actual directoresTecnicos data
      propietarios={[]} // Replace with actual propietarios data
    />
  );
};

export default FunSolicitud;
