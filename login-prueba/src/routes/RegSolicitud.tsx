// src/SolicitudForm.tsx
import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface SolicitudFormProps {
  userId: string;
}

const SolicitudForm: React.FC<SolicitudFormProps> = ({ userId }) => {
  // Estado para el tipo de solicitud
  const [tipoDeSolicitud, setTipoDeSolicitud] = useState<string>("");
  // Aquí podrías agregar más estados:
  // const [razonSocial, setRazonSocial] = useState<string>("");
  // const [nombreComercial, setNombreComercial] = useState<string>("");
  // const [rfc, setRfc] = useState<string>("");
  // const [domicilio, setDomicilio] = useState<string>("");
  // const [telefono, setTelefono] = useState<string>("");
  // const [zonaConcesion, setZonaConcesion] = useState<string>("");
  // const [nombreRepresentante, setNombreRepresentante] = useState<string>("");
  // const [rfcRepresentante, setRfcRepresentante] = useState<string>("");
  // const [curpRepresentante, setCurpRepresentante] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const payload = {
      userId,
      tipoDeSolicitud,
      // Agrega aquí el resto de campos
    };
    // Aquí envías tu payload a la API
    console.log("Enviando solicitud:", payload);
  };

  const inputClass =
    "";

  return (
    <div className="FormContainer">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      </header>

      {/* Card */}
      <main className="max-w-5xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg overflow-hidden">
          {/* Sección 1: Información de la Solicitud */}
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Solicitud de Registro de Distribuidora
            </h2>
          </div>
          <div className="px-6 py-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Información de la Solicitud
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo de Solicitud */}
              <div>
                <label className="block text-sm text-gray-600">Tipo de Solicitud</label>
                <select
                  value={tipoDeSolicitud}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setTipoDeSolicitud(e.target.value)
                  }
                  className={inputClass}
                  required
                >
                  <option value="">Selecciona...</option>
                  <option value="Renovación">Renovación</option>
                  <option value="Nueva Inscripción">Nueva Inscripción</option>
                </select>
              </div>

              {/* ID generado (solo lectura) */}
              <div>
                <label className="block text-sm text-gray-600">
                  ID de Solicitud (generado)
                </label>
                <input
                  type="text"
                  value="SOL-2023-015"
                  readOnly
                  className={`${inputClass} bg-gray-100 cursor-not-allowed`}
                />
              </div>
            </div>
          </div>

          <div className="border-t" />

          {/* Sección 2: Datos de la Distribuidora */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Datos de la Distribuidora
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Razón Social */}
              <div>
                <label className="block text-sm text-gray-600">Razón Social</label>
                <input
                  type="text"
                  placeholder="Ej: Distribuidora Eléctrica S.A."
                  className={inputClass}
                  required
                />
              </div>
              {/* Nombre Comercial */}
              <div>
                <label className="block text-sm text-gray-600">Nombre Comercial</label>
                <input
                  type="text"
                  placeholder="Ej: Energía del Norte"
                  className={inputClass}
                  required
                />
              </div>
              {/* RFC */}
              <div>
                <label className="block text-sm text-gray-600">RFC</label>
                <input
                  type="text"
                  placeholder="Ej: DESA891122ABC"
                  className={inputClass}
                  required
                />
              </div>
              {/* Domicilio Fiscal */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm text-gray-600">Domicilio Fiscal</label>
                <input
                  type="text"
                  placeholder="Calle, Número, Colonia, Ciudad, Estado, CP"
                  className={inputClass}
                  required
                />
              </div>
              {/* Teléfono */}
              <div>
                <label className="block text-sm text-gray-600">Teléfono</label>
                <input
                  type="text"
                  placeholder="Ej: 55 1234 5678"
                  className={inputClass}
                  required
                />
              </div>
              {/* Zona de Concesión */}
              <div>
                <label className="block text-sm text-gray-600">Zona de Concesión</label>
                <input
                  type="text"
                  placeholder="Descripción de la zona geográfica"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="border-t" />

          {/* Sección 3: Representante Legal */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Información del Representante Legal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Nombre Completo */}
              <div>
                <label className="block text-sm text-gray-600">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Nombre(s) y Apellidos"
                  className={inputClass}
                  required
                />
              </div>
              {/* RFC Representante */}
              <div>
                <label className="block text-sm text-gray-600">
                  RFC del Representante
                </label>
                <input
                  type="text"
                  placeholder="13 caracteres"
                  className={inputClass}
                  required
                />
              </div>
              {/* CURP */}
              <div>
                <label className="block text-sm text-gray-600">CURP</label>
                <input
                  type="text"
                  placeholder="18 caracteres"
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t" />

          {/* Sección 4: Documentación Adjunta */}
          <div className="px-6 py-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Documentación Adjunta
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                "Acta Constitutiva",
                "Poder del Representante Legal",
                "Comprobante de Domicilio",
              ].map((label) => (
                <div key={label}>
                  <label className="block text-sm text-gray-600">{label}</label>
                  <input
                    type="file"
                    className="mt-1 block w-full text-gray-600"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t" />

          {/* Botones */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SolicitudForm;
