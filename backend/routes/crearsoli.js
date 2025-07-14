const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");
const authenticateAccessToken = require("../lib/authMiddleware");

router.post("/", authenticateAccessToken, async (req, res) => {
  try {
    const pool = await poolPromise;

    const {
      tipoDeSolicitud,
      idEstablecimiento,
      idPropietario,
      idDirectorTecnico = null,
      reciboPagoTasasNumero = null,
    } = req.body;

    const idUsuario = req.user.id;
    const fechaActual = new Date();

    const insertResult = await pool.request()
      .input("FechaSolicitud", sql.Date, fechaActual)
      .input("ID_Establecimiento", sql.Int, idEstablecimiento)
      .input("ID_DirectorTecnico", sql.Int, idDirectorTecnico)
      .input("ID_Propietario", sql.Int, idPropietario)
      .input("TipoDeSolicitud", sql.VarChar(255), tipoDeSolicitud)
      .input("ReciboPagoTasasNumero", sql.VarChar(100), reciboPagoTasasNumero)
      .input("EstadoSolicitud", sql.VarChar(100), "En revisión")
      .input("FirmadoPorInspector", sql.Bit, false)
      .input("FirmaDirectorTecnico", sql.Bit, false)
      .input("FormularioImpresoOnlineConsultado", sql.Bit, false)
      .input("Formulario004_FO_056_Presentado", sql.Bit, false)
      .input("LicenciaOriginalDepositadaTramitado", sql.Bit, false)
      .input("ID_Usuario", sql.Int, idUsuario)
      .query(`
        INSERT INTO Solicitudes (
          FechaSolicitud,
          ID_Establecimiento,
          ID_DirectorTecnico,
          ID_Propietario,
          TipoDeSolicitud,
          ReciboPagoTasasNumero,
          EstadoSolicitud,
          FirmadoPorInspector,
          FirmaDirectorTecnico,
          FormularioImpresoOnlineConsultado,
          Formulario004_FO_056_Presentado,
          LicenciaOriginalDepositadaTramitado,
          ID_Usuario
        )
        OUTPUT INSERTED.ID_Solicitud_MSP
        VALUES (
          @FechaSolicitud,
          @ID_Establecimiento,
          @ID_DirectorTecnico,
          @ID_Propietario,
          @TipoDeSolicitud,
          @ReciboPagoTasasNumero,
          @EstadoSolicitud,
          @FirmadoPorInspector,
          @FirmaDirectorTecnico,
          @FormularioImpresoOnlineConsultado,
          @Formulario004_FO_056_Presentado,
          @LicenciaOriginalDepositadaTramitado,
          @ID_Usuario
        );
      `);

    const idSolicitud = insertResult.recordset[0].ID_Solicitud_MSP;
    const año = fechaActual.getFullYear();
    const codigoSolicitud = `SOL-${año}-${String(idSolicitud).padStart(4, "0")}`;

    res.status(201).json({
      message: "Solicitud registrada correctamente",
      codigo: codigoSolicitud,
      id: idSolicitud,
    });
  } catch (error) {
    console.error("Error al registrar solicitud:", error);
    res.status(500).json({ error: "Error al registrar solicitud" });
  }
});

module.exports = router;
