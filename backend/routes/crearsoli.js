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
      reciboPagoTasasNumero = null,
      // Datos completos del propietario recibidos en el body:
      propietario: {
        tipoPropietario,
        cedulaPropietario,
        apellidoPropietario,
        nombreRazonSocial,
        rncPropietario = null,
        direccionPropietario = null,
        idMunicipioPropietario = null,
        telefonoPropietario = null,
        celularPropietario = null,
        correoElectronicoPropietario = null,
      } = {},
      idDirectorTecnico = null,
    } = req.body;

    if (
      !tipoDeSolicitud ||
      !idEstablecimiento ||
      !tipoPropietario ||
      !cedulaPropietario ||
      !apellidoPropietario ||
      !nombreRazonSocial
    ) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const idUsuario = req.user.id;
    const fechaActual = new Date();

    // Buscar propietario existente por Cédula o RNC
    let propietarioQuery = await pool
      .request()
      .input("CedulaPropietario", sql.VarChar(20), cedulaPropietario)
      .input("RNC_Propietario", sql.VarChar(20), rncPropietario)
      .query(
        `SELECT ID_Propietario FROM Propietarios
         WHERE CedulaPropietario = @CedulaPropietario
         OR (@RNC_Propietario IS NOT NULL AND RNC_Propietario = @RNC_Propietario)`
      );

    let idPropietario;

    if (propietarioQuery.recordset.length > 0) {
      // Existe propietario
      idPropietario = propietarioQuery.recordset[0].ID_Propietario;
    } else {
      // Insertar nuevo propietario
      const insertPropietario = await pool
        .request()
        .input("TipoPropietario", sql.VarChar(100), tipoPropietario)
        .input("CedulaPropietario", sql.VarChar(20), cedulaPropietario)
        .input("ApellidoPropietario", sql.VarChar(255), apellidoPropietario)
        .input("NombreRazonSocial", sql.VarChar(255), nombreRazonSocial)
        .input("RNC_Propietario", sql.VarChar(20), rncPropietario)
        .input("DireccionPropietario", sql.VarChar(255), direccionPropietario)
        .input("ID_MunicipioPropietario", sql.Int, idMunicipioPropietario)
        .input("TelefonoPropietario", sql.VarChar(50), telefonoPropietario)
        .input("CelularPropietario", sql.VarChar(50), celularPropietario)
        .input("CorreoElectronicoPropietario", sql.VarChar(255), correoElectronicoPropietario)
        .query(
          `INSERT INTO Propietarios (
            TipoPropietario,
            CedulaPropietario,
            ApellidoPropietario,
            NombreRazonSocial,
            RNC_Propietario,
            DireccionPropietario,
            ID_MunicipioPropietario,
            TelefonoPropietario,
            CelularPropietario,
            CorreoElectronicoPropietario
          ) OUTPUT INSERTED.ID_Propietario VALUES (
            @TipoPropietario,
            @CedulaPropietario,
            @ApellidoPropietario,
            @NombreRazonSocial,
            @RNC_Propietario,
            @DireccionPropietario,
            @ID_MunicipioPropietario,
            @TelefonoPropietario,
            @CelularPropietario,
            @CorreoElectronicoPropietario
          )`
        );

      idPropietario = insertPropietario.recordset[0].ID_Propietario;
    }

    // Insertar la solicitud usando idPropietario
    const insertSolicitud = await pool
      .request()
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
      .query(
        `INSERT INTO Solicitudes (
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
        )`
      );

    const idSolicitud = insertSolicitud.recordset[0].ID_Solicitud_MSP;
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
