const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");

// Obtener todas las solicitudes
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
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
    s.ID_Usuario AS idUsuario
  FROM Solicitudes s
  LEFT JOIN Establecimientos e ON s.ID_Establecimiento = e.ID_Establecimiento
  LEFT JOIN DirectoresTecnicos dt ON s.ID_DirectorTecnico = dt.ID_Director
  LEFT JOIN Propietarios p ON s.ID_Propietario = p.ID_Propietario
  LEFT JOIN Usuarios u ON s.ID_Usuario = u.ID_Usuario
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error(" Error al obtener solicitudes:", err);
    res.status(500).json({ error: "Error al obtener las solicitudes" });
  }
});

// (Opcional) Obtener solicitud por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", req.params.id)
      .query("SELECT * FROM Solicitudes WHERE ID_Solicitud_MSP = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Solicitud no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(" Error al obtener solicitud por ID:", err);
    res.status(500).json({ error: "Error interno" });
  }
});

module.exports = router;
