// src/routes/FunPropietario.tsx
import React from 'react';
import { useAuth } from '../Auth/AuthProvider';
import EstablecimientoForm from '../routes/RegEstablecimiento';

const FunPropietario: React.FC = () => {
  const auth = useAuth();
  const user = auth.getUser();

  if (!user?.id) {
    return (
      <p className="p-4 text-red-600">
        Debes iniciar sesión para registrar un propietario.
      </p>
    );
  }

  // TODO: Obtener la lista de municipios de tu API o contexto
  const municipios: { id: number; nombre: string }[] = [
    // { id: 1, nombre: 'Municipio A' },
    // { id: 2, nombre: 'Municipio B' },
  ];

  return <EstablecimientoForm municipios={municipios} />;
};

export default FunPropietario;
