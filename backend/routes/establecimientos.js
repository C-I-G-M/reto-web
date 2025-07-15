const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");
const authenticateAccessToken = require("../lib/authMiddleware"); // middleware auth

// POST: Crear establecimiento
router.post("/", authenticateAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id; // ID desde el token
    const pool = await poolPromise;

    const {
      nombreEstablecimiento,
      direccionCalleNumero,
      barrioSector,
      idMunicipio,
      ciudad,
      tipoEstablecimiento,
      rncEstablecimiento,
      telefonoEstablecimiento,
      correoElectronicoEstablecimiento,
      fechaApertura,
      representanteTipo,
      tipoActividad,
      nombreResponsable,
      notaAdicional,
    } = req.body;

    // Verificar si ya existe uno para este usuario
    const existing = await pool.request()
      .input("ID_Usuario", sql.Int, userId)
      .query("SELECT * FROM Establecimientos WHERE ID_Usuario = @ID_Usuario");

    if (existing.recordset.length > 0) {
      return res.status(200).json({ StatusCode: true, body: existing.recordset[0], message: "Ya existe un establecimiento registrado para este usuario" });
    }

    await pool.request()
      .input("NombreEstablecimiento", sql.VarChar(255), nombreEstablecimiento)
      .input("DireccionCalleNumero", sql.VarChar(255), direccionCalleNumero)
      .input("BarrioSector", sql.VarChar(255), barrioSector)
      .input("ID_Municipio", sql.Int, idMunicipio)
      .input("Ciudad", sql.VarChar(255), ciudad)
      .input("TipoEstablecimiento", sql.VarChar(255), tipoEstablecimiento)
      .input("RNC_Establecimiento", sql.VarChar(255), rncEstablecimiento)
      .input("TelefonoEstablecimiento", sql.VarChar(50), telefonoEstablecimiento)
      .input("CorreoElectronicoEstablecimiento", sql.VarChar(255), correoElectronicoEstablecimiento)
      .input("FechaApertura", sql.Date, fechaApertura || null)
      .input("RepresentanteTipo", sql.VarChar(255), representanteTipo || null)
      .input("TipoActividad", sql.VarChar(255), tipoActividad || null)
      .input("NombreResponsable", sql.VarChar(255), nombreResponsable || null)
      .input("NotaAdicional", sql.Text, notaAdicional || null)
      .input("ID_Usuario", sql.Int, userId)
      .query(`
        INSERT INTO Establecimientos (
          NombreEstablecimiento,
          DireccionCalleNumero,
          BarrioSector,
          ID_Municipio,
          Ciudad,
          TipoEstablecimiento,
          RNC_Establecimiento,
          TelefonoEstablecimiento,
          CorreoElectronicoEstablecimiento,
          FechaApertura,
          RepresentanteTipo,
          TipoActividad,
          NombreResponsable,
          NotaAdicional,
          ID_Usuario
        )
        VALUES (
          @NombreEstablecimiento,
          @DireccionCalleNumero,
          @BarrioSector,
          @ID_Municipio,
          @Ciudad,
          @TipoEstablecimiento,
          @RNC_Establecimiento,
          @TelefonoEstablecimiento,
          @CorreoElectronicoEstablecimiento,
          @FechaApertura,
          @RepresentanteTipo,
          @TipoActividad,
          @NombreResponsable,
          @NotaAdicional,
          @ID_Usuario
        );
      `);

    res.status(201).json({ StatusCode: true, message: " Establecimiento registrado correctamente" });
  } catch (err) {
    console.error(" Error al insertar establecimiento:", err);
    res.status(500).json({ StatusCode: false, error: "Error al agregar establecimiento" });
  }
});

// GET: Obtener establecimiento por usuario
router.get("/by-user", authenticateAccessToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const pool = await poolPromise;

    const result = await pool.request()
      .input("ID_Usuario", sql.Int, userId)
      .query("SELECT * FROM Establecimientos WHERE ID_Usuario = @ID_Usuario");

    if (result.recordset.length > 0) {
      res.json({ StatusCode: true, body: result.recordset[0] });
    } else {
      res.json({ StatusCode: false, body: null, message: "No se encontró establecimiento para este usuario" });
    }
  } catch (err) {
    console.error("Error al obtener establecimiento por usuario:", err);
    res.status(500).json({ StatusCode: false, error: "Error interno del servidor" });
  }
});

module.exports = router;
