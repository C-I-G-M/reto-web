const { jsonResponse } = require("../lib/jsonresponse");
const router = require("express").Router();
const { poolPromise, sql } = require("../db");
const getUserInfo = require ("../lib/getUserinfo");
const authenticateAccessToken = require("../lib/authMiddleware");



router.get("/", authenticateAccessToken, async (req, res) => {
    console.log("req.user en ruta:", req.user);
    const userInfo = getUserInfo(req.user);
    const ID_Usuario = userInfo.id; // extraído del token
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("ID_Usuario", sql.Int, ID_Usuario)
      .query("SELECT ID_Usuario AS id, Nombre_de_Usuario AS username, Rol AS rol FROM Usuarios WHERE ID_Usuario = @ID_Usuario");

    if (result.recordset.length === 0) {
      return res.status(404).json(jsonResponse(404, { error: "Usuario no encontrado" }));
    }

    const user = result.recordset[0];

    return res.status(200).json(jsonResponse(200, user)); // ← aquí debe ir el usuario
  } catch (error) {
    console.error(error);
    return res.status(500).json(jsonResponse(500, { error: "Error del servidor" }));
  }


});

module.exports = router;