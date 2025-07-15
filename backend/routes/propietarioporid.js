// GET /api/propietarios/usuario
const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../db");
const { jsonResponse } = require("../lib/jsonresponse");
const authenticateAccessToken = require("../lib/authMiddleware");
router.get("/", authenticateAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json(jsonResponse(false, null, "Usuario no autorizado"));
    }
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("ID_Usuario", sql.Int, userId)
      .execute("SP_ObtenerPropietariosPorUsuario");
     // .query("SELECT * FROM Propietarios WHERE ID_Usuario = @ID_Usuario");

    if (result.recordset.length > 0) {
      res.json(jsonResponse(true, result.recordset[0]));
    } else {
      res.json(jsonResponse(false, null, "Propietario no encontrado"));
    }
  } catch (err) {
    console.error("Error al buscar propietario por usuario:", err);
    res.status(500).json(jsonResponse(false, null, "Error interno del servidor"));
  }
});

module.exports = router;
