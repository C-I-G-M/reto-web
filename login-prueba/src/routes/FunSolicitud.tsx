import { useAuth } from '../Auth/AuthProvider';
import RegSolicitud from '../routes/RegSolicitud';

const FunSolicitud: React.FC = () => {
  const auth = useAuth();
  const user = auth.getUser();

  if (!user?.id) {
    return <p className="p-4 text-red-600">Debes iniciar sesión para enviar una solicitud.</p>;
  }

  return <RegSolicitud userId={user.id} />;
};

export default FunSolicitud;
