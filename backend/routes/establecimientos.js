const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");


router.post("/", async (req, res) => {
  try {
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

await pool
  .request()
  .input("NombreEstablecimiento", sql.VarChar(255), nombreEstablecimiento)
  .input("DireccionCalleNumero", sql.VarChar(255), direccionCalleNumero)
  .input("BarrioSector", sql.VarChar(255), barrioSector)
  .input("ID_Municipio", sql.Int, idMunicipio)
  .input("Ciudad", sql.VarChar(255), ciudad)
  .input("TipoEstablecimiento", sql.VarChar(255), tipoEstablecimiento)
  .input("RNC_Establecimiento", sql.VarChar(255), rncEstablecimiento)
  .input("TelefonoEstablecimiento", sql.VarChar(50), telefonoEstablecimiento)
  .input("CorreoElectronicoEstablecimiento", sql.VarChar(255), correoElectronicoEstablecimiento)
  .input("FechaApertura", sql.Date, fechaApertura)
  .input("RepresentanteTipo", sql.VarChar(255), representanteTipo)
  .input("TipoActividad", sql.VarChar(255), tipoActividad)
  .input("NombreResponsable", sql.VarChar(255), nombreResponsable)
  .input("NotaAdicional", sql.Text, notaAdicional)

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
