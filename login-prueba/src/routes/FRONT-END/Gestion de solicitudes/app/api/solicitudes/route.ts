import { type NextRequest, NextResponse } from "next/server"

// Mock data - En producción esto vendría de tu base de datos
const mockSolicitudes = [
  {
    idSolicitudMSP: 1,
    fechaSolicitud: "2024-01-15",
    idEstablecimiento: 1,
    idDirectorTecnico: 1,
    idPropietario: 1,
    tipoDeSolicitud: "Licencia Nueva",
    reciboPagoTasasNumero: "REC-001-2024",
    estadoSolicitud: "En Proceso",
    firmadoPorInspector: true,
    firmaDirectorTecnico: false,
    formularioImpresoOnlineConsultado: true,
    formulario004FO056Presentado: true,
    licenciaOriginalDepositadaTramitado: false,
    idUsuario: 1,
    nombreEstablecimiento: "Farmacia Central",
    nombresDirector: "Juan Carlos",
    apellidosDirector: "Pérez García",
    nombrePropietario: "Distribuidora Médica S.A.",
    nombreUsuario: "admin",
  },
  {
    idSolicitudMSP: 2,
    fechaSolicitud: "2024-01-20",
    idEstablecimiento: 2,
    idDirectorTecnico: 2,
    idPropietario: 2,
    tipoDeSolicitud: "Renovación de Licencia",
    reciboPagoTasasNumero: "REC-002-2024",
    estadoSolicitud: "Pendiente",
    firmadoPorInspector: false,
    firmaDirectorTecnico: false,
    formularioImpresoOnlineConsultado: false,
    formulario004FO056Presentado: false,
    licenciaOriginalDepositadaTramitado: false,
    idUsuario: 1,
    nombreEstablecimiento: "Droguería San Miguel",
    nombresDirector: "María Elena",
    apellidosDirector: "Rodríguez López",
    nombrePropietario: "Comercial Farmacéutica Ltda.",
    nombreUsuario: "admin",
  },
]

export async function GET() {
  // Simular llamada al stored procedure SeleccionarSolicitudes
  return NextResponse.json(mockSolicitudes)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simular llamada al stored procedure InsertarSolicitud
    const newSolicitud = {
      idSolicitudMSP: mockSolicitudes.length + 1,
      ...data,
      nombreEstablecimiento: "Establecimiento Ejemplo",
      nombresDirector: "Director",
      apellidosDirector: "Ejemplo",
      nombrePropietario: "Propietario Ejemplo",
      nombreUsuario: "admin",
    }

    mockSolicitudes.push(newSolicitud)

    return NextResponse.json(newSolicitud, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error creating solicitud" }, { status: 500 })
  }
}
