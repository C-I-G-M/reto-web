const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secreto_super_seguro";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secreto_super_seguro";

// Token válido por 15 minutos
function generateAccessToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "15m" });
}

// Token válido por 7 días
function generateRefreshToken(user) {
  return jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
