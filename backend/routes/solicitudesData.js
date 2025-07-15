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
      .query(`
        SELECT ID_Establecimiento AS id, NombreEstablecimiento AS nombre
        FROM Establecimientos
        WHERE ID_Usuario = @ID_Usuario
      `);

    // Propietarios del usuario
    const propietarios = await pool.request()
      .input("ID_Usuario", sql.Int, userId)
      .query(`
        SELECT ID_Propietario AS id, NombreRazonSocial AS nombre
        FROM Propietarios
        WHERE ID_Usuario = @ID_Usuario
      `);

    // Todos los directores técnicos
    const directores = await pool.request().query(`
      SELECT ID_Director AS id, NombresDirector AS nombre
      FROM DirectoresTecnicos
    `);

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
