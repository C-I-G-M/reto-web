"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { SolicitudForm } from "./solicitud-form"
import { SolicitudesTable } from "./solicitudes-table"
import type { Solicitud, Establecimiento, DirectorTecnico, Propietario } from "@/types/solicitudes"

export function SolicitudesManager() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([])
  const [directoresTecnicos, setDirectoresTecnicos] = useState<DirectorTecnico[]>([])
  const [propietarios, setPropietarios] = useState<Propietario[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingSolicitud, setEditingSolicitud] = useState<Solicitud | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [solicitudesRes, establecimientosRes, directoresRes, propietariosRes] = await Promise.all([
        fetch("/api/solicitudes"),
        fetch("/api/establecimientos"),
        fetch("/api/directores-tecnicos"),
        fetch("/api/propietarios"),
      ])

      const [solicitudesData, establecimientosData, directoresData, propietariosData] = await Promise.all([
        solicitudesRes.json(),
        establecimientosRes.json(),
        directoresRes.json(),
        propietariosRes.json(),
      ])

      setSolicitudes(solicitudesData)
      setEstablecimientos(establecimientosData)
      setDirectoresTecnicos(directoresData)
      setPropietarios(propietariosData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSolicitud = () => {
    setEditingSolicitud(null)
    setShowForm(true)
  }

  const handleEditSolicitud = (solicitud: Solicitud) => {
    setEditingSolicitud(solicitud)
    setShowForm(true)
  }

  const handleDeleteSolicitud = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar esta solicitud?")) {
      try {
        const response = await fetch(`/api/solicitudes/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          await loadData()
        }
      } catch (error) {
        console.error("Error deleting solicitud:", error)
      }
    }
  }

  const handleFormSubmit = async () => {
    setShowForm(false)
    setEditingSolicitud(null)
    await loadData()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingSolicitud(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingSolicitud ? "Editar Solicitud" : "Nueva Solicitud"}</CardTitle>
          </CardHeader>
          <CardContent>
            <SolicitudForm
              solicitud={editingSolicitud}
              establecimientos={establecimientos}
              directoresTecnicos={directoresTecnicos}
              propietarios={propietarios}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Solicitudes Registradas</h2>
            <Button onClick={handleCreateSolicitud}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Solicitud
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <SolicitudesTable
                solicitudes={solicitudes}
                onEdit={handleEditSolicitud}
                onDelete={handleDeleteSolicitud}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
