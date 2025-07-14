// src/solicitud/PropietarioForm.tsx
import React, { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import { API_URL } from "../Auth/constants";

interface Municipio {
  id: number;
  nombre: string;
}

const PropietarioForm: React.FC = () => {
const [isEditMode, setIsEditMode] = useState(false);
  const [tipoPropietario, setTipoPropietario] = useState("");
  const [cedulaPropietario, setCedulaPropietario] = useState("");
  const [apellidoPropietario, setApellidoPropietario] = useState("");
  const [nombreRazonSocial, setNombreRazonSocial] = useState("");
  const [rncPropietario, setRncPropietario] = useState("");
  const [direccionPropietario, setDireccionPropietario] = useState("");
  const [municipioPropietario, setMunicipioPropietario] = useState<number | "">("");
  const [telefonoPropietario, setTelefonoPropietario] = useState("");
  const [celularPropietario, setCelularPropietario] = useState("");
  const [correoElectronicoPropietario, setCorreoElectronicoPropietario] = useState("");

  const [municipios, setMunicipios] = useState<Municipio[]>([]);

useEffect(() => {
  const fetchMunicipios = async () => {
    try {
      const res = await fetch(`${API_URL}/municipios`);
      const data = await res.json();
      console.log(" Municipios desde API:", data);

      if (data.StatusCode) {
        setMunicipios(data.body);
      } else {
        console.error(" Error al cargar municipios:", data.message || "Respuesta no válida");
      }
    } catch (error) {
      console.error(" Error de red al cargar municipios:", error);
    }
  };

  fetchMunicipios();
}, []);


useEffect(() => {
  const fetchPropietario = async () => {
    try {
      const res = await fetch(`${API_URL}/propietarios/${cedulaPropietario}`);
      const data = await res.json();
      if (data.ok && data.data) {
  setIsEditMode(true);
}
      if (data.ok && data.data) {
        const p = data.data;
        setTipoPropietario(p.tipoPropietario);
        setApellidoPropietario(p.apellidoPropietario);
        setNombreRazonSocial(p.nombreRazonSocial);
        setRncPropietario(p.rncPropietario);
        setDireccionPropietario(p.direccionPropietario);
        setMunicipioPropietario(p.municipioPropietario);
        setTelefonoPropietario(p.telefonoPropietario);
        setCelularPropietario(p.celularPropietario);
        setCorreoElectronicoPropietario(p.correoElectronicoPropietario);
      }
    } catch (err) {
      console.error("Error al obtener datos del propietario", err);
    }
  };

  fetchPropietario();
}, []);


  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200";

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const payload = {
    tipoPropietario,
    cedulaPropietario,
    apellidoPropietario,
    nombreRazonSocial,
    rncPropietario,
    direccionPropietario,
    municipioPropietario,
    telefonoPropietario,
    celularPropietario,
    correoElectronicoPropietario,
  };

  try {
    const method = isEditMode ? "PUT" : "POST"; // ← modo edición o creación
    const endpoint = isEditMode
      ? `${API_URL}/propietarios/${cedulaPropietario}`
      : `${API_URL}/propietarios`;

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.ok) {
      alert(isEditMode ? "Propietario actualizado" : "Registro exitoso");
    } else {
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error("Error al guardar propietario", err);
    alert("Error al conectar con el servidor");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-white text-2xl font-semibold">Registro de Propietarios</h1>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Propietario</label>
              <input
                type="text"
                value={tipoPropietario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTipoPropietario(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
              <input
                type="text"
                value={cedulaPropietario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCedulaPropietario(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input
                type="text"
                value={apellidoPropietario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setApellidoPropietario(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre o Razón Social</label>
              <input
                type="text"
                value={nombreRazonSocial}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNombreRazonSocial(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RNC</label>
              <input
                type="text"
                value={rncPropietario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRncPropietario(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input
                type="text"
                value={direccionPropietario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDireccionPropietario(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Municipio</label>
              <select
                value={municipioPropietario}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setMunicipioPropietario(Number(e.target.value))}
                className={inputClass}
                required
              >
                <option value="">Selecciona...</option>
                {municipios.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={telefonoPropietario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTelefonoPropietario(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
              <input
                type="tel"
                value={celularPropietario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCelularPropietario(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input
                type="email"
                value={correoElectronicoPropietario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCorreoElectronicoPropietario(e.target.value)}
                className={inputClass}
              />
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

export default PropietarioForm;
