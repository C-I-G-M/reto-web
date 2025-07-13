import { useNavigate } from 'react-router-dom'    // 👈 importar hook
import { useAuth } from '../Auth/AuthProvider'
import PortalLayout from '../layout/portalLayout'

export default function Dashboard() {
  const auth = useAuth()
  const user = auth.getUser()
  const navigate = useNavigate()                   // 👈 inicializar

  return (
    <PortalLayout>
      <h1 className="mb-6 text-2xl font-bold">
        Dashboard de {user?.username ?? ''}
      </h1>

      {/* 👇 este botón te lleva a /reg-solicitud */}
      <button
        onClick={() => navigate('/Regsolicitud')}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Enviar Solicitud
      </button>

       <button
        onClick={() => navigate('/RegPropietario')}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Eres Propietario?
      </button>

      <button
        onClick={() => navigate('/RegEstablecimiento')}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Agregar Establecimiento
      </button>
    </PortalLayout>
  )
}
