import React, { useState, type ChangeEvent, type FormEvent } from 'react';

interface Municipio {
  id: number;
  nombre: string;
}

interface EstablecimientoFormProps {
  municipios: Municipio[];
}

const EstablecimientoForm: React.FC<EstablecimientoFormProps> = ({ municipios }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [barrio, setBarrio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [municipioId, setMunicipioId] = useState<number | ''>('');
  const [tipo, setTipo] = useState('');
  const [rnc, setRnc] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaApertura, setFechaApertura] = useState('');
  const [repTipo, setRepTipo] = useState('');
  const [actividad, setActividad] = useState('');
  const [responsable, setResponsable] = useState('');
  const [nota, setNota] = useState('');

  const inputClass =
    'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      nombreEstablecimiento: nombre,
      direccionCalleNumero: direccion,
      barrioSector: barrio,
      ciudad,
      idMunicipio: municipioId,
      tipoEstablecimiento: tipo,
      rncEstablecimiento: rnc,
      telefonoEstablecimiento: telefono,
      correoElectronicoEstablecimiento: correo,
      fechaApertura: fechaApertura || null,
      representanteTipo: repTipo || null,
      tipoActividad: actividad || null,
      nombreResponsable: responsable || null,
      notaAdicional: nota || null,
    };
    console.log('Registrar establecimiento:', payload);
    // TODO: conectar con API
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-white text-2xl font-semibold">Registro de Establecimientos</h1>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Establecimiento</label>
              <input type="text" value={nombre} onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección Calle y Número</label>
              <input type="text" value={direccion} onChange={(e: ChangeEvent<HTMLInputElement>) => setDireccion(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Barrio / Sector</label>
              <input type="text" value={barrio} onChange={(e: ChangeEvent<HTMLInputElement>) => setBarrio(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <input type="text" value={ciudad} onChange={(e: ChangeEvent<HTMLInputElement>) => setCiudad(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Municipio</label>
              <select value={municipioId} onChange={(e: ChangeEvent<HTMLSelectElement>) => setMunicipioId(Number(e.target.value))} className={inputClass} required>
                <option value="">Selecciona...</option>
                {municipios.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Establecimiento</label>
              <input type="text" value={tipo} onChange={(e: ChangeEvent<HTMLInputElement>) => setTipo(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RNC Establecimiento</label>
              <input type="text" value={rnc} onChange={(e: ChangeEvent<HTMLInputElement>) => setRnc(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input type="tel" value={telefono} onChange={(e: ChangeEvent<HTMLInputElement>) => setTelefono(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input type="email" value={correo} onChange={(e: ChangeEvent<HTMLInputElement>) => setCorreo(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Apertura</label>
              <input type="date" value={fechaApertura} onChange={(e: ChangeEvent<HTMLInputElement>) => setFechaApertura(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Representante</label>
              <input type="text" value={repTipo} onChange={(e: ChangeEvent<HTMLInputElement>) => setRepTipo(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Actividad</label>
              <input type="text" value={actividad} onChange={(e: ChangeEvent<HTMLInputElement>) => setActividad(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Responsable</label>
              <input type="text" value={responsable} onChange={(e: ChangeEvent<HTMLInputElement>) => setResponsable(e.target.value)} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nota Adicional</label>
              <textarea value={nota} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNota(e.target.value)} rows={3} className={inputClass}></textarea>
            </div>
          </div>
          <div className="pt-6 text-right">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstablecimientoForm;
