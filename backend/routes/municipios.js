const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../db");
const { jsonResponse } = require("../lib/jsonresponse");

// GET - Obtener lista de municipios
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT ID_Municipio AS id, NombreMunicipio AS nombre, ID_Provincia AS provinciaId
      FROM Municipios
      ORDER BY nombre
    `);

    res.json(jsonResponse(true, result.recordset));
  } catch (error) {
    console.error("❌ Error al obtener municipios:", error);
    res.status(500).json(jsonResponse(false, null, "Error al obtener municipios"));
  }
});

// POST - Registrar un nuevo municipio
router.post("/", async (req, res) => {
  const { nombreMunicipio, idProvincia } = req.body;

  if (!nombreMunicipio || !idProvincia) {
    return res.status(400).json(jsonResponse(false, null, "Nombre del municipio y provincia son obligatorios."));
  }

  try {
    const pool = await poolPromise;

    await pool.request()
      .input("NombreMunicipio", sql.VarChar(255), nombreMunicipio)
      .input("ID_Provincia", sql.Int, idProvincia)
      .query(`
        INSERT INTO Municipios (NombreMunicipio, ID_Provincia)
        VALUES (@NombreMunicipio, @ID_Provincia)
      `);

    res.status(201).json(jsonResponse(true, null, "✅ Municipio registrado correctamente"));
  } catch (error) {
    console.error("❌ Error al registrar municipio:", error);
    res.status(500).json(jsonResponse(false, null, "Error al registrar municipio"));
  }
});

module.exports = router;
