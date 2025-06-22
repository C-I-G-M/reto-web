const { generateAccessToken } = require("../lib/auth");
const getTokenFromHeader = require("../lib/getTokenFromHeader");
const { verifyRefreshToken } = require("../lib/verifyTokens");
const { jsonResponse } = require("../lib/jsonresponse");
const { poolPromise, sql } = require("../db");

const router = require("express").Router();

router.post("/", async (req, res) => {

    const refreshToken = getTokenFromHeader(req.headers);
if (refreshToken) {

    try {
        const pool = await poolPromise;
    const result = await pool
      .request()
      .input("token", sql.VarChar, refreshToken)
      .query("SELECT * FROM RefreshTokens WHERE Token = @token");
      if (result.recordset.length === 0) {
      return res.status(401).send(jsonResponse(401, { error: "Token no encontrado" }));
    }

    } catch (error) {
        console.log(error);
    }

}
else {
    res.status(401).send(jsonResponse(401,{error: "Sin autorizacion"}));
}

const payload = verifyRefreshToken(refreshToken);
if (payload){
const accessToken = generateAccessToken(payload.users);

return res.status(200).json(jsonResponse(200, {accessToken: accessToken}));
}

else{
    return res.status(401).json(jsonResponse(401, {error: "Sin autorizacion"}));
}
});

module.exports = router;