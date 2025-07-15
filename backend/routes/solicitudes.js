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
      .execute("SP_ObtenerSolicitudesPorUsuario");


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
