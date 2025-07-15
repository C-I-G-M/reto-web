const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../db");
const { jsonResponse } = require("../lib/jsonresponse");
const authenticateAccessToken = require("../lib/authMiddleware");

// Crear propietario (POST)
router.post("/", authenticateAccessToken, async (req, res) => {
  try {
    const {
      tipoPropietario,
      cedulaPropietario,
      apellidoPropietario,
      nombreRazonSocial,
      rncPropietario,
      direccionPropietario,
      municipioPropietario,
      telefonoPropietario,
      celularPropietario,
      correoElectronicoPropietario,
    } = req.body;

    const userId = req.user?.id;
    const pool = await poolPromise;

    await pool
      .request()
      .input("TipoPropietario", sql.VarChar(100), tipoPropietario)
      .input("CedulaPropietario", sql.VarChar(20), cedulaPropietario)
      .input("ApellidoPropietario", sql.VarChar(255), apellidoPropietario)
      .input("NombreRazonSocial", sql.VarChar(255), nombreRazonSocial)
      .input("RNC_Propietario", sql.VarChar(20), rncPropietario || null)
      .input("DireccionPropietario", sql.VarChar(255), direccionPropietario || null)
      .input("ID_MunicipioPropietario", sql.Int, municipioPropietario || null)
      .input("TelefonoPropietario", sql.VarChar(50), telefonoPropietario || null)
      .input("CelularPropietario", sql.VarChar(50), celularPropietario || null)
      .input("CorreoElectronicoPropietario", sql.VarChar(255), correoElectronicoPropietario || null)
      .input("ID_Usuario", sql.Int, userId)
      .query(`
        INSERT INTO Propietarios (
          TipoPropietario,
          CedulaPropietario,
          ApellidoPropietario,
          NombreRazonSocial,
          RNC_Propietario,
          DireccionPropietario,
          ID_MunicipioPropietario,
          TelefonoPropietario,
          CelularPropietario,
          CorreoElectronicoPropietario,
          ID_Usuario
        )
        VALUES (
          @TipoPropietario,
          @CedulaPropietario,
          @ApellidoPropietario,
          @NombreRazonSocial,
          @RNC_Propietario,
          @DireccionPropietario,
          @ID_MunicipioPropietario,
          @TelefonoPropietario,
          @CelularPropietario,
          @CorreoElectronicoPropietario,
          @ID_Usuario
        )
      `);

    res.status(201).json(jsonResponse(true, null, "✅ Propietario registrado correctamente"));
  } catch (err) {
    console.error("Error al registrar propietario:", err);
    if (err?.originalError?.info?.number === 2627) {
      return res.status(400).json(jsonResponse(false, null, "Cédula o RNC ya existe."));
    }
    res.status(500).json(jsonResponse(false, null, "Error interno del servidor."));
  }
});

// Obtener propietario por cedula (GET)
router.get("/:cedula", async (req, res) => {
  const { cedula } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Cedula", sql.VarChar, cedula)
      .query("SELECT * FROM Propietarios WHERE CedulaPropietario = @Cedula");

    if (result.recordset.length > 0) {
      res.json(jsonResponse(true, result.recordset[0]));
    } else {
      res.json(jsonResponse(false, null, "Propietario no encontrado"));
    }
  } catch (err) {
    console.error("Error al buscar propietario:", err);
    res.status(500).json(jsonResponse(false, null, "Error interno del servidor"));
  }
});

// Obtener propietario por usuario (GET /byUser)
router.get("/byUser", authenticateAccessToken, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(400).json(jsonResponse(false, null, "User ID no proporcionado"));

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("ID_Usuario", sql.Int, userId)
       .execute("SP_ObtenerPropietariosPorUsuario");

    if (result.recordset.length > 0) {
      res.json(jsonResponse(true, result.recordset[0]));
    } else {
      res.json(jsonResponse(false, null, "Propietario no encontrado"));
    }
  } catch (err) {
    console.error("Error al buscar propietario:", err);
    res.status(500).json(jsonResponse(false, null, "Error interno del servidor"));
  }
});

// Actualizar propietario (PUT /:cedula)
router.put("/", authenticateAccessToken, async (req, res) => {
  const {
    tipoPropietario,
    apellidoPropietario,
    nombreRazonSocial,
    rncPropietario,
    direccionPropietario,
    municipioPropietario,
    telefonoPropietario,
    celularPropietario,
    correoElectronicoPropietario,
  } = req.body;

  const userId = req.user?.id;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("TipoPropietario", sql.VarChar(100), tipoPropietario)
      .input("ApellidoPropietario", sql.VarChar(255), apellidoPropietario)
      .input("NombreRazonSocial", sql.VarChar(255), nombreRazonSocial)
      .input("RNC_Propietario", sql.VarChar(20), rncPropietario || null)
      .input("DireccionPropietario", sql.VarChar(255), direccionPropietario || null)
      .input("ID_MunicipioPropietario", sql.Int, municipioPropietario || null)
      .input("TelefonoPropietario", sql.VarChar(50), telefonoPropietario || null)
      .input("CelularPropietario", sql.VarChar(50), celularPropietario || null)
      .input("CorreoElectronicoPropietario", sql.VarChar(255), correoElectronicoPropietario || null)
      .input("ID_Usuario", sql.Int, userId)
      .execute("SP_ActualizarPropietarioPorUsuario");
   
    res.json(jsonResponse(true, null, "Propietario actualizado correctamente"));
  } catch (err) {
    console.error("Error al actualizar propietario:", err);
    res.status(500).json(jsonResponse(false, null, "Error interno del servidor"));
  }
});


module.exports = router;
