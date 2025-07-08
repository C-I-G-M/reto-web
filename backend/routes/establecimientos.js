const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");


router.post("/establecimientos", async (req, res) => {
  try {
    const pool = await poolPromise;

    const {
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
    } = req.body;

    const result = await pool
      .request()
      .input("NombreEstablecimiento", sql.VarChar(255), NombreEstablecimiento)
      .input("DireccionCalleNumero", sql.VarChar(255), DireccionCalleNumero)
      .input("BarrioSector", sql.VarChar(255), BarrioSector)
      .input("ID_Municipio", sql.Int, ID_Municipio)
      .input("Ciudad", sql.VarChar(255), Ciudad)
      .input("TipoEstablecimiento", sql.VarChar(255), TipoEstablecimiento)
      .input("RNC_Establecimiento", sql.VarChar(255), RNC_Establecimiento)
      .input("TelefonoEstablecimiento", sql.VarChar(50), TelefonoEstablecimiento)
      .input("CorreoElectronicoEstablecimiento", sql.VarChar(255), CorreoElectronicoEstablecimiento)
      .input("FechaApertura", sql.Date, FechaApertura)
      .input("RepresentanteTipo", sql.VarChar(255), RepresentanteTipo)
      .input("TipoActividad", sql.VarChar(255), TipoActividad)
      .input("NombreResponsable", sql.VarChar(255), NombreResponsable)
      .input("NotaAdicional", sql.Text, NotaAdicional)
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
          NotaAdicional
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
          @NotaAdicional
        );
      `);

    res.status(201).json({ message: "Establecimiento agregado exitosamente" });
  } catch (err) {
    console.error(" Error al insertar establecimiento:", err);
    res.status(500).json({ error: "Error al agregar establecimiento" });
  }
});

module.exports = router;
