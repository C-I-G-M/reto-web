
import {Table, TableHeader, TableBody,TableHead, TableRow, TableCell,} from '../components/table.tsx'
import type { Solicitud } from "../types/types.ts"
import { Button } from "../components/button"
import { Badge } from "../components/badge"
import { Edit, Trash2, Check, X } from "lucide-react"



interface SolicitudesTableProps {
  solicitudes: Solicitud[]
  onEdit: (solicitud: Solicitud) => void
  onDelete: (id: number) => void
}

export default function TablaSolicitudUsuario({ solicitudes, onEdit, onDelete }: SolicitudesTableProps) {
  const getEstadoBadge = (estado: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Pendiente: "outline",
      "En Proceso": "secondary",
      Aprobada: "default",
      Rechazada: "destructive",
      Completada: "default",
    }

    return <Badge variant={variants[estado] || "outline"}>{estado}</Badge>
  }

  const BooleanIcon = ({ value }: { value: boolean }) =>
    value ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />

  if (solicitudes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay solicitudes registradas</p>
      </div>
    )
  }

  



    return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Establecimiento</TableHead>
            <TableHead>Director Técnico</TableHead>
            <TableHead>Propietario</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Recibo</TableHead>
            <TableHead className="text-center">Verificaciones</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {solicitudes.map((solicitud) => (
            <TableRow key={solicitud.idSolicitudMSP}>
              <TableCell className="font-medium">{solicitud.idSolicitudMSP}</TableCell>
              <TableCell>{new Date(solicitud.fechaSolicitud).toLocaleDateString()}</TableCell>
              <TableCell className="max-w-xs truncate">{solicitud.nombreEstablecimiento}</TableCell>
              <TableCell>
                {solicitud.nombresDirector && solicitud.apellidosDirector
                  ? `${solicitud.nombresDirector} ${solicitud.apellidosDirector}`
                  : "N/A"}
              </TableCell>
              <TableCell className="max-w-xs truncate">{solicitud.nombrePropietario || "N/A"}</TableCell>
              <TableCell>
                <Badge variant="outline">{solicitud.tipoDeSolicitud}</Badge>
              </TableCell>
              <TableCell>{getEstadoBadge(solicitud.estadoSolicitud)}</TableCell>
              <TableCell>{solicitud.reciboPagoTasasNumero || "N/A"}</TableCell>
              <TableCell>
                <div className="flex space-x-2 justify-center">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-1">
                      <BooleanIcon value={solicitud.firmadoPorInspector} />
                      <span className="text-xs">Inspector</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BooleanIcon value={solicitud.firmaDirectorTecnico} />
                      <span className="text-xs">Director</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BooleanIcon value={solicitud.formularioImpresoOnlineConsultado} />
                      <span className="text-xs">Form. Online</span>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(solicitud)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(solicitud.idSolicitudMSP)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
