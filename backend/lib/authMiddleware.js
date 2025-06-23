const { verifyAccessToken } = require("./verifyTokens");
const getTokenFromHeader = require("./getTokenFromHeader");

function authenticateAccessToken(req, res, next) {
    const token = getTokenFromHeader(req.headers);

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = payload.user; // Aquí agregamos los datos decodificados al request
        console.log("Payload user en middleware:", req.user);
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
}

module.exports = authenticateAccessToken;
