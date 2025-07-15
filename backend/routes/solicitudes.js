const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");
const authenticateAccessToken = require("../lib/authMiddleware");

// Obtener todas las solicitudes del usuario autenticado
router.get("/", authenticateAccessToken, async (req, res) => {
  const userId = req.user.id; // <- Cambia aquí si tu campo tiene otro nombre (ej: req.user.userId)

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("ID_usuario", userId)
      .query(`
        SELECT 
  s.ID_Solicitud_MSP AS idSolicitudMSP,
  s.FechaSolicitud AS fechaSolicitud,
  s.ID_Establecimiento AS idEstablecimiento,
  s.ID_DirectorTecnico AS idDirectorTecnico,
  s.ID_Propietario AS idPropietario,
  s.TipoDeSolicitud AS tipoDeSolicitud,
  s.ReciboPagoTasasNumero AS reciboPagoTasasNumero,
  s.EstadoSolicitud AS estadoSolicitud,
  s.FirmadoPorInspector AS firmadoPorInspector,
  s.FirmaDirectorTecnico AS firmaDirectorTecnico,
  s.FormularioImpresoOnlineConsultado AS formularioImpresoOnlineConsultado,
  s.Formulario004_FO_056_Presentado AS formulario004FO056Presentado,
  s.LicenciaOriginalDepositadaTramitado AS licenciaOriginalDepositadaTramitado,
  s.ID_Usuario AS idUsuario,

  --  Datos adicionales desde las relaciones
  e.NombreEstablecimiento AS nombreEstablecimiento,
  dt.NombresDirector AS nombresDirector,
  dt.ApellidosDirector AS apellidosDirector,
  p.NombreRazonSocial AS nombrePropietario -- o p.RazonSocial si usas eso
FROM Solicitudes s
LEFT JOIN Establecimientos e ON s.ID_Establecimiento = e.ID_Establecimiento
LEFT JOIN DirectoresTecnicos dt ON s.ID_DirectorTecnico = dt.ID_Director
LEFT JOIN Propietarios p ON s.ID_Propietario = p.ID_Propietario
WHERE s.ID_Usuario = @ID_usuario
ORDER BY s.FechaSolicitud DESC

      `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener solicitudes:", err);
    res.status(500).json({ error: "Error al obtener las solicitudes" });
  }
});

// Obtener una solicitud por ID
router.get("/:id", authenticateAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT * FROM Solicitudes WHERE ID_Solicitud_MSP = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error al obtener solicitud por ID:", err);
    res.status(500).json({ error: "Error interno" });
  }
});

module.exports = router;
