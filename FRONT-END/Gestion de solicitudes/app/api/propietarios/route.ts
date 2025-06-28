import { NextResponse } from "next/server"

const mockPropietarios = [
  {
    idPropietario: 1,
    tipoPropietario: "Empresa",
    cedulaPropietario: "001-2345678-9",
    apellidoPropietario: "Distribuidora",
    nombreRazonSocial: "Distribuidora Médica S.A.",
    rncPropietario: "101-98765-4",
    direccionPropietario: "Zona Industrial #100",
    idMunicipioPropietario: 1,
    telefonoPropietario: "809-555-2001",
    celularPropietario: "809-555-2002",
    correoElectronicoPropietario: "info@distmedica.com",
  },
  {
    idPropietario: 2,
    tipoPropietario: "Empresa",
    cedulaPropietario: "001-8765432-1",
    apellidoPropietario: "Comercial",
    nombreRazonSocial: "Comercial Farmacéutica Ltda.",
    rncPropietario: "101-13579-2",
    direccionPropietario: "Sector Comercial #200",
    idMunicipioPropietario: 2,
    telefonoPropietario: "809-555-2003",
    celularPropietario: "809-555-2004",
    correoElectronicoPropietario: "contacto@comercialfarm.com",
  },
]

export async function GET() {
  return NextResponse.json(mockPropietarios)
}
