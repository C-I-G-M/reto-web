import { NextResponse } from "next/server"

const mockDirectoresTecnicos = [
  {
    idDirector: 1,
    nombresDirector: "Juan Carlos",
    apellidosDirector: "Pérez García",
    cedulaDirector: "001-1234567-8",
    direccionDirectorCalleNumero: "Calle Médica #789",
    barrioSectorDirector: "Zona Universitaria",
    idMunicipioDirector: 1,
    ciudadDirector: "Santo Domingo",
    correoDirector: "jperez@email.com",
    telefonosDirector: "809-555-1001",
    correoElectronicoDirector: "jperez@email.com",
    tituloProfesional: "Químico Farmacéutico",
    exequatur: "EXE-001",
    especialidad: "Farmacia Clínica",
    numeroExequatur: "12345",
    fechaCaducidadExequatur: "2025-12-31",
  },
  {
    idDirector: 2,
    nombresDirector: "María Elena",
    apellidosDirector: "Rodríguez López",
    cedulaDirector: "001-9876543-2",
    direccionDirectorCalleNumero: "Av. Salud #321",
    barrioSectorDirector: "Los Médicos",
    idMunicipioDirector: 2,
    ciudadDirector: "Santiago",
    correoDirector: "mrodriguez@email.com",
    telefonosDirector: "809-555-1002",
    correoElectronicoDirector: "mrodriguez@email.com",
    tituloProfesional: "Doctora en Farmacia",
    exequatur: "EXE-002",
    especialidad: "Farmacología",
    numeroExequatur: "54321",
    fechaCaducidadExequatur: "2026-06-30",
  },
]

export async function GET() {
  return NextResponse.json(mockDirectoresTecnicos)
}
