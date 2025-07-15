import React, { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { API_URL } from "../Auth/constants";
import { useAuth } from "../Auth/AuthProvider";

interface Option {
  id: number;
  nombre: string;
}

const SolicitudForm: React.FC = () => {
  const { getAccessToken, getUser, authLoading } = useAuth();

  const [establecimientos, setEstablecimientos] = useState<Option[]>([]);
  const [directoresTecnicos, setDirectoresTecnicos] = useState<Option[]>([]);
  const [propietarios, setPropietarios] = useState<Option[]>([]);

  const [establecimientoId, setEstablecimientoId] = useState<number | "">("");
  const [directorTecnicoId, setDirectorTecnicoId] = useState<number | "">("");
  const [propietarioId, setPropietarioId] = useState<number | "">("");
  const [tipoDeSolicitud, setTipoDeSolicitud] = useState("");
  const [reciboPagoTasasNumero, setReciboPagoTasasNumero] = useState("");
  const [estadoSolicitud, setEstadoSolicitud] = useState("");

  const [archivoInspector, setArchivoInspector] = useState<File | null>(null);
  const [archivoDirector, setArchivoDirector] = useState<File | null>(null);
  const [archivoFormulario, setArchivoFormulario] = useState<File | null>(null);
  const [archivoF056, setArchivoF056] = useState<File | null>(null);
  const [archivoLicencia, setArchivoLicencia] = useState<File | null>(null);

  const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200";

  useEffect(() => {
    const fetchData = async () => {
      const token = getAccessToken();
      const user = getUser();
      if (!token || !user) return;

      try {
        const res = await fetch(`${API_URL}/solicitudesData`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (data.StatusCode) {
          setEstablecimientos(data.body.establecimientos);
          setPropietarios(data.body.propietarios);
          setDirectoresTecnicos(data.body.directoresTecnicos);
        } else {
          console.error("Error al cargar datos:", data.message || "Desconocido");
        }
      } catch (error) {
        console.error("Error en la carga de datos:", error);
      }
    };

    if (!authLoading) fetchData();
  }, [authLoading, getAccessToken, getUser]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = getAccessToken();
    const user = getUser();
    if (!token || !user) return alert("Sesión no válida");

    const formData = new FormData();
    formData.append("ID_Establecimiento", String(establecimientoId));
    formData.append("ID_DirectorTecnico", directorTecnicoId ? String(directorTecnicoId) : "");
    formData.append("ID_Propietario", propietarioId ? String(propietarioId) : "");
    formData.append("TipoDeSolicitud", tipoDeSolicitud);
    formData.append("ReciboPagoTasasNumero", reciboPagoTasasNumero);
    formData.append("EstadoSolicitud", estadoSolicitud);
    formData.append("ID_Usuario", String(user.id));

    if (archivoInspector) formData.append("ArchivoInspector", archivoInspector);
    if (archivoDirector) formData.append("ArchivoDirector", archivoDirector);
    if (archivoFormulario) formData.append("ArchivoFormulario", archivoFormulario);
    if (archivoF056) formData.append("ArchivoF056", archivoF056);
    if (archivoLicencia) formData.append("ArchivoLicencia", archivoLicencia);

    fetch(`${API_URL}/enviarsoli`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.StatusCode) {
          alert("Solicitud registrada exitosamente");
        } else {
          alert("Error al registrar solicitud: " + (data.message || "Desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al enviar solicitud:", err);
        alert("Error de red al enviar solicitud");
      });
  };

  if (authLoading) return <p className="text-center py-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-white text-2xl font-semibold">Registro de Solicitudes</h1>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Establecimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Establecimiento</label>
              <select value={establecimientoId} onChange={(e) => setEstablecimientoId(Number(e.target.value))} className={inputClass} required>
                <option value="">Selecciona...</option>
                {establecimientos.map((e) => (
                  <option key={e.id} value={e.id}>{e.nombre}</option>
                ))}
              </select>
            </div>

            {/* Director Técnico */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Director Técnico</label>
              <select value={directorTecnicoId} onChange={(e) => setDirectorTecnicoId(Number(e.target.value))} className={inputClass}>
                <option value="">Ninguno</option>
                {directoresTecnicos.map((d) => (
                  <option key={d.id} value={d.id}>{d.nombre}</option>
                ))}
              </select>
            </div>

            {/* Propietario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Propietario</label>
              <select value={propietarioId} onChange={(e) => setPropietarioId(Number(e.target.value))} className={inputClass}>
                <option value="">Ninguno</option>
                {propietarios.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>

            {/* Tipo de Solicitud */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Solicitud</label>
              <input type="text" value={tipoDeSolicitud} onChange={(e) => setTipoDeSolicitud(e.target.value)} className={inputClass} required />
            </div>

            {/* Recibo pago tasas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recibo Pago Tasas #</label>
              <input type="text" value={reciboPagoTasasNumero} onChange={(e) => setReciboPagoTasasNumero(e.target.value)} className={inputClass} />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado de Solicitud</label>
              <input type="text" value={estadoSolicitud} onChange={(e) => setEstadoSolicitud(e.target.value)} className={inputClass} required />
            </div>
          </div>

          {/* Archivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Archivo Inspector</label>
              <input type="file" onChange={(e) => setArchivoInspector(e.target.files?.[0] ?? null)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Archivo Director Técnico</label>
              <input type="file" onChange={(e) => setArchivoDirector(e.target.files?.[0] ?? null)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Archivo Formulario</label>
              <input type="file" onChange={(e) => setArchivoFormulario(e.target.files?.[0] ?? null)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Archivo 00F0_56</label>
              <input type="file" onChange={(e) => setArchivoF056(e.target.files?.[0] ?? null)} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Archivo Licencia</label>
              <input type="file" onChange={(e) => setArchivoLicencia(e.target.files?.[0] ?? null)} className={inputClass} />
            </div>
          </div>

          <div className="pt-6 text-right">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
              Registrar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolicitudForm;
