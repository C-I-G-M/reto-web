import { useEffect, useState } from "react";
import TablaSolicitudUsuario from "../routes/TablaSolicitudUsuario";
import type { Solicitud } from "../types/types";
import { API_URL } from "../Auth/constants.ts"; // Asegúrate de que este archivo exista y exporte la URL correcta


// Puedes definir la URL base según dónde corre tu backend


export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const response = await fetch(`${API_URL}/solicitudes`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}` ← si usas JWT
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener solicitudes");
      }

      const data = await response.json();
      setSolicitudes(data);
    } catch (error) {
      console.error(" Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (solicitud: Solicitud) => {
    console.log("Editar", solicitud);
  };

  const handleDelete = (id: number) => {
    console.log("Eliminar solicitud con ID:", id);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Solicitudes Registradas</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <TablaSolicitudUsuario
          solicitudes={solicitudes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
