import { NextResponse } from "next/server"

const mockEstablecimientos = [
  {
    idEstablecimiento: 1,
    nombreEstablecimiento: "Farmacia Central",
    direccionCalleNumero: "Calle Principal #123",
    barrioSector: "Centro",
    idMunicipio: 1,
    ciudad: "Santo Domingo",
    tipoEstablecimiento: "Farmacia",
    rncEstablecimiento: "101-12345-6",
    telefonoEstablecimiento: "809-555-0001",
    correoElectronicoEstablecimiento: "info@farmaciacentral.com",
  },
  {
    idEstablecimiento: 2,
    nombreEstablecimiento: "Droguería San Miguel",
    direccionCalleNumero: "Av. Independencia #456",
    barrioSector: "San Miguel",
    idMunicipio: 2,
    ciudad: "Santiago",
    tipoEstablecimiento: "Droguería",
    rncEstablecimiento: "101-54321-9",
    telefonoEstablecimiento: "809-555-0002",
    correoElectronicoEstablecimiento: "contacto@drogueriasmiguel.com",
  },
]

export async function GET() {
  return NextResponse.json(mockEstablecimientos)
}
