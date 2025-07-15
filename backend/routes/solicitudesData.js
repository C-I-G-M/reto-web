// routes/solicitudesData.js
const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");
const  authenticateAccessToken  = require("../lib/authMiddleware");

router.get("/", authenticateAccessToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const pool = await poolPromise;

    // Establecimientos del usuario
    const establecimientos = await pool.request()
      .input("ID_Usuario", sql.Int, userId)
      .execute("SP_ObtenerEstablecimientosPorUsuario");
  
    // Propietarios del usuario
    const propietarios = await pool.request()
      .input("ID_Usuario", sql.Int, userId)
      .execute("SP_ObtenerPropietariosPorUsuario_Select");
  
    // Todos los directores técnicos
    const directores = await pool.request()
    .execute("SP_ObtenerDirectoresTecnicos");

    res.json({
      StatusCode: true,
      body: {
        establecimientos: establecimientos.recordset,
        propietarios: propietarios.recordset,
        directoresTecnicos: directores.recordset,
      }
    });
  } catch (err) {
    console.error("Error al obtener datos para solicitud:", err);
    res.status(500).json({
      StatusCode: false,
      message: "Error interno del servidor"
    });
  }
});

module.exports = router;
