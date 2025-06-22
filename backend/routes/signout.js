const router = require("express").Router();
const { poolPromise, sql } = require("../db");
const getTokenFromHeader = require("../lib/getTokenFromHeader");
const { jsonResponse } = require("../lib/jsonresponse");

router.delete("/", async (req, res) => {
    const refreshToken = getTokenFromHeader(req.headers);

    if (!refreshToken) {
        return res.status(401).json(jsonResponse(401, { error: "Token de sesión no proporcionado" }));
    }

    try {
        const pool = await poolPromise;

        // Elimina el refresh token de la tabla Tokens
        const result = await pool.request()
            .input("Token", sql.VarChar, refreshToken)
            .query("DELETE FROM RefreshTokens WHERE Token = @Token");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json(jsonResponse(404, { message: "Token no encontrado o ya fue eliminado" }));
        }

        return res.status(200).json(jsonResponse(200, { message: "Sesión cerrada correctamente" }));
    } catch (error) {
        console.error("Error en logout:", error);
        return res.status(500).json(jsonResponse(500, { error: "Error del servidor" }));
    }
});

module.exports = router;
