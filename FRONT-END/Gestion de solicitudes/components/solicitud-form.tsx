"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Solicitud, Establecimiento, DirectorTecnico, Propietario } from "@/types/solicitudes"

interface SolicitudFormProps {
  solicitud?: Solicitud | null
  establecimientos: Establecimiento[]
  directoresTecnicos: DirectorTecnico[]
  propietarios: Propietario[]
  onSubmit: () => void
  onCancel: () => void
}

const tiposSolicitud = [
  "Licencia Nueva",
  "Renovación de Licencia",
  "Modificación de Licencia",
  "Cancelación de Licencia",
  "Inspección Rutinaria",
  "Inspección Especial",
]

const estadosSolicitud = ["Pendiente", "En Proceso", "Aprobada", "Rechazada", "Completada"]

export function SolicitudForm({
  solicitud,
  establecimientos,
  directoresTecnicos,
  propietarios,
  onSubmit,
  onCancel,
}: SolicitudFormProps) {
  const [formData, setFormData] = useState({
    fechaSolicitud: "",
    idEstablecimiento: "",
    idDirectorTecnico: "",
    idPropietario: "",
    tipoDeSolicitud: "",
    reciboPagoTasasNumero: "",
    estadoSolicitud: "Pendiente",
    firmadoPorInspector: false,
    firmaDirectorTecnico: false,
    formularioImpresoOnlineConsultado: false,
    formulario004FO056Presentado: false,
    licenciaOriginalDepositadaTramitado: false,
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (solicitud) {
      setFormData({
        fechaSolicitud: solicitud.fechaSolicitud || "",
        idEstablecimiento: solicitud.idEstablecimiento?.toString() || "",
        idDirectorTecnico: solicitud.idDirectorTecnico?.toString() || "",
        idPropietario: solicitud.idPropietario?.toString() || "",
        tipoDeSolicitud: solicitud.tipoDeSolicitud || "",
        reciboPagoTasasNumero: solicitud.reciboPagoTasasNumero || "",
        estadoSolicitud: solicitud.estadoSolicitud || "Pendiente",
        firmadoPorInspector: solicitud.firmadoPorInspector || false,
        firmaDirectorTecnico: solicitud.firmaDirectorTecnico || false,
        formularioImpresoOnlineConsultado: solicitud.formularioImpresoOnlineConsultado || false,
        formulario004FO056Presentado: solicitud.formulario004FO056Presentado || false,
        licenciaOriginalDepositadaTramitado: solicitud.licenciaOriginalDepositadaTramitado || false,
      })
    } else {
      // Set current date for new solicitud
      const today = new Date().toISOString().split("T")[0]
      setFormData((prev) => ({ ...prev, fechaSolicitud: today }))
    }
  }, [solicitud])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = solicitud ? `/api/solicitudes/${solicitud.idSolicitudMSP}` : "/api/solicitudes"

      const method = solicitud ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          idEstablecimiento: Number.parseInt(formData.idEstablecimiento),
          idDirectorTecnico: formData.idDirectorTecnico ? Number.parseInt(formData.idDirectorTecnico) : null,
          idPropietario: formData.idPropietario ? Number.parseInt(formData.idPropietario) : null,
          idUsuario: 1, // Simulated user ID
        }),
      })

      if (response.ok) {
        onSubmit()
      }
    } catch (error) {
      console.error("Error saving solicitud:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fechaSolicitud">Fecha de Solicitud *</Label>
          <Input
            id="fechaSolicitud"
            type="date"
            value={formData.fechaSolicitud}
            onChange={(e) => setFormData((prev) => ({ ...prev, fechaSolicitud: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="establecimiento">Establecimiento *</Label>
          <Select
            value={formData.idEstablecimiento}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, idEstablecimiento: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar establecimiento" />
            </SelectTrigger>
            <SelectContent>
              {establecimientos.map((est) => (
                <SelectItem key={est.idEstablecimiento} value={est.idEstablecimiento.toString()}>
                  {est.nombreEstablecimiento}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="directorTecnico">Director Técnico</Label>
          <Select
            value={formData.idDirectorTecnico}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, idDirectorTecnico: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar director técnico" />
            </SelectTrigger>
            <SelectContent>
              {directoresTecnicos.map((dir) => (
                <SelectItem key={dir.idDirector} value={dir.idDirector.toString()}>
                  {`${dir.nombresDirector} ${dir.apellidosDirector}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="propietario">Propietario</Label>
          <Select
            value={formData.idPropietario}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, idPropietario: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar propietario" />
            </SelectTrigger>
            <SelectContent>
              {propietarios.map((prop) => (
                <SelectItem key={prop.idPropietario} value={prop.idPropietario.toString()}>
                  {prop.nombreRazonSocial}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipoSolicitud">Tipo de Solicitud *</Label>
          <Select
            value={formData.tipoDeSolicitud}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, tipoDeSolicitud: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo de solicitud" />
            </SelectTrigger>
            <SelectContent>
              {tiposSolicitud.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recibo">Número de Recibo de Pago</Label>
          <Input
            id="recibo"
            value={formData.reciboPagoTasasNumero}
            onChange={(e) => setFormData((prev) => ({ ...prev, reciboPagoTasasNumero: e.target.value }))}
            placeholder="Ingrese número de recibo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estado">Estado de Solicitud *</Label>
          <Select
            value={formData.estadoSolicitud}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, estadoSolicitud: value }))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              {estadosSolicitud.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Campos de Verificación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="firmadoPorInspector"
              checked={formData.firmadoPorInspector}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, firmadoPorInspector: checked as boolean }))
              }
            />
            <Label htmlFor="firmadoPorInspector">Firmado por Inspector</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="firmaDirectorTecnico"
              checked={formData.firmaDirectorTecnico}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, firmaDirectorTecnico: checked as boolean }))
              }
            />
            <Label htmlFor="firmaDirectorTecnico">Firma Director Técnico</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="formularioImpreso"
              checked={formData.formularioImpresoOnlineConsultado}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, formularioImpresoOnlineConsultado: checked as boolean }))
              }
            />
            <Label htmlFor="formularioImpreso">Formulario Impreso Online Consultado</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="formulario004"
              checked={formData.formulario004FO056Presentado}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, formulario004FO056Presentado: checked as boolean }))
              }
            />
            <Label htmlFor="formulario004">Formulario 004-FO-056 Presentado</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="licenciaOriginal"
              checked={formData.licenciaOriginalDepositadaTramitado}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, licenciaOriginalDepositadaTramitado: checked as boolean }))
              }
            />
            <Label htmlFor="licenciaOriginal">Licencia Original Depositada/Tramitado</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : solicitud ? "Actualizar" : "Crear"} Solicitud
        </Button>
      </div>
    </form>
  )
}
