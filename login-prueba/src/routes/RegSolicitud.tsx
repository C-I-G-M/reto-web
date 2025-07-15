import React, { useState, type ChangeEvent, type FormEvent } from "react";

interface Option {
  id: number;
  nombre: string;
}

interface SolicitudFormProps {
  userId: string;
  establecimientos: Option[];
  directoresTecnicos: Option[];
  propietarios: Option[];
}

const SolicitudForm: React.FC<SolicitudFormProps> = ({
  userId,
  establecimientos,
  directoresTecnicos,
  propietarios,
}) => {
  const [establecimientoId, setEstablecimientoId] = useState<number | "">("");
  const [directorTecnicoId, setDirectorTecnicoId] = useState<number | "">("");
  const [propietarioId, setPropietarioId] = useState<number | "">("");
  const [tipoDeSolicitud, setTipoDeSolicitud] = useState<string>("");
  const [reciboPagoTasasNumero, setReciboPagoTasasNumero] = useState<string>("");
  const [estadoSolicitud, setEstadoSolicitud] = useState<string>("");

  // Archivos de documentos firmados
  const [archivoInspector, setArchivoInspector] = useState<File | null>(null);
  const [archivoDirector, setArchivoDirector] = useState<File | null>(null);
  const [archivoFormulario, setArchivoFormulario] = useState<File | null>(null);
  const [archivoF056, setArchivoF056] = useState<File | null>(null);
  const [archivoLicencia, setArchivoLicencia] = useState<File | null>(null);

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Construir FormData para envío de archivos
    const formData = new FormData();
    formData.append('ID_Establecimiento', String(establecimientoId));
    formData.append('ID_DirectorTecnico', directorTecnicoId ? String(directorTecnicoId) : '');
    formData.append('ID_Propietario', propietarioId ? String(propietarioId) : '');
    formData.append('TipoDeSolicitud', tipoDeSolicitud);
    formData.append('ReciboPagoTasasNumero', reciboPagoTasasNumero);
    formData.append('EstadoSolicitud', estadoSolicitud);
    formData.append('ID_Usuario', userId);

    if (archivoInspector) formData.append('ArchivoInspector', archivoInspector);
    if (archivoDirector) formData.append('ArchivoDirector', archivoDirector);
    if (archivoFormulario) formData.append('ArchivoFormulario', archivoFormulario);
    if (archivoF056) formData.append('ArchivoF056', archivoF056);
    if (archivoLicencia) formData.append('ArchivoLicencia', archivoLicencia);

    // TODO: POST formData a tu endpoint: fetch('/api/solicitudes', { method: 'POST', body: formData })
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-white text-2xl font-semibold">Registro de Solicitudes</h1>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Establecimiento</label>
              <select
                value={establecimientoId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setEstablecimientoId(Number(e.target.value))}
                className={inputClass}
                required
              >
                <option value="">Selecciona...</option>
                {establecimientos.map((e) => (
                  <option key={e.id} value={e.id}>{e.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Director Técnico</label>
              <select
                value={directorTecnicoId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setDirectorTecnicoId(Number(e.target.value))}
                className={inputClass}
              >
                <option value="">Ninguno</option>
                {directoresTecnicos.map((d) => (
                  <option key={d.id} value={d.id}>{d.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Propietario</label>
              <select
                value={propietarioId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setPropietarioId(Number(e.target.value))}
                className={inputClass}
              >
                <option value="">Ninguno</option>
                {propietarios.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Solicitud</label>
              <input
                type="text"
                value={tipoDeSolicitud}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTipoDeSolicitud(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recibo Pago Tasas #</label>
              <input
                type="text"
                value={reciboPagoTasasNumero}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setReciboPagoTasasNumero(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado de Solicitud</label>
              <input
                type="text"
                value={estadoSolicitud}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEstadoSolicitud(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Documentos firmados */}
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
