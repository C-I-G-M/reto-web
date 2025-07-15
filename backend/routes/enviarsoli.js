const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");
const authenticateAccessToken = require("../lib/authMiddleware");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  authenticateAccessToken,
  upload.fields([
    { name: "ArchivoInspector" },
    { name: "ArchivoDirector" },
    { name: "ArchivoFormulario" },
    { name: "ArchivoF056" },
    { name: "ArchivoLicencia" },
  ]),
  async (req, res) => {
    const userId = req.user.id;

    try {
      console.log("req.body:", req.body); //  Verifica que los datos vienen bien

      const {
        ID_Establecimiento,
        ID_DirectorTecnico,
        ID_Propietario,
        TipoDeSolicitud,
        ReciboPagoTasasNumero,
        EstadoSolicitud,
        ID_Usuario,
      } = req.body;

      const pool = await poolPromise; // ✅ AQUÍ ESTÁ EL CAMBIO IMPORTANTE

      await pool.request()
        .input("ID_Establecimiento", sql.Int, ID_Establecimiento)
        .input("ID_DirectorTecnico", sql.Int, ID_DirectorTecnico || null)
        .input("ID_Propietario", sql.Int, ID_Propietario || null)
        .input("TipoDeSolicitud", sql.VarChar(100), TipoDeSolicitud)
        .input("ReciboPagoTasasNumero", sql.VarChar(100), ReciboPagoTasasNumero)
        .input("EstadoSolicitud", sql.VarChar(100), EstadoSolicitud)
        .input("FechaSolicitud", sql.DateTime, new Date())
        .input("ID_Usuario", sql.Int, ID_Usuario || userId) // usa el del token si no viene en body
        .query(`
          INSERT INTO Solicitudes (
            ID_Establecimiento,
            ID_DirectorTecnico,
            ID_Propietario,
            TipoDeSolicitud,
            ReciboPagoTasasNumero,
            EstadoSolicitud,
            FechaSolicitud,
            ID_Usuario
          )
          VALUES (
            @ID_Establecimiento,
            @ID_DirectorTecnico,
            @ID_Propietario,
            @TipoDeSolicitud,
            @ReciboPagoTasasNumero,
            @EstadoSolicitud,
            @FechaSolicitud,
            @ID_Usuario
          )
        `);

      res.status(201).json({
        StatusCode: true,
        message: "Solicitud registrada exitosamente",
      });
    } catch (error) {
      console.error("Error al registrar solicitud:", error);
      res.status(500).json({
        StatusCode: false,
        message: "Error interno del servidor",
      });
    }
  }
);

module.exports = router;
