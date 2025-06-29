import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const id = Number.parseInt(params.id)

    // Simular llamada al stored procedure ActualizarSolicitud
    return NextResponse.json({
      message: `Solicitud ${id} updated successfully`,
      data,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error updating solicitud" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Simular llamada al stored procedure EliminarSolicitud
    return NextResponse.json({
      message: `Solicitud ${id} deleted successfully`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting solicitud" }, { status: 500 })
  }
}
