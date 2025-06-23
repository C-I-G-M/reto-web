const { generateAccessToken } = require("../lib/auth");
const getTokenFromHeader = require("../lib/getTokenFromHeader");
const { verifyRefreshToken } = require("../lib/verifyTokens");
const { jsonResponse } = require("../lib/jsonresponse");
const { poolPromise, sql } = require("../db");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const refreshToken = getTokenFromHeader(req.headers);
  console.log("REFRESH TOKEN DESDE HEADER:", refreshToken);
  console.log("Tipo:", typeof refreshToken);

  // Validar token
  if (!refreshToken || typeof refreshToken !== "string") {
    return res
      .status(401)
      .json(jsonResponse(401, { error: "Token no proporcionado o inválido" }));
  }

  try {
    // Verificar existencia del token en la base de datos
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("token", sql.VarChar, refreshToken)
      .query("SELECT * FROM RefreshTokens WHERE Token = @token");

    if (result.recordset.length === 0) {
      return res
        .status(401)
        .json(jsonResponse(401, { error: "Token no encontrado en base de datos" }));
    }

    // Verificar validez del token
    const payload = verifyRefreshToken(refreshToken);
    console.log("Payload decodificado del refreshToken:", payload);

    if (!payload || !payload.user) {
      return res.status(401).json(jsonResponse(401, { error: "Token inválido" }));
    }

    // Generar nuevo accessToken
    const accessToken = generateAccessToken(payload.user);

    return res.status(200).json(jsonResponse(200, { accessToken }));
  } catch (error) {
    console.error("Error al procesar refresh token:", error);
    return res
      .status(500)
      .json(jsonResponse(500, { error: "Error del servidor" }));
  }
});

module.exports = router;