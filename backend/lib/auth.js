const jwt = require("jsonwebtoken");

function sign(payload, isAccessToken){
  return jwt.sign(
    payload,
    isAccessToken ? process.env.access_token_secret : process.env.refresh_token_secret,
    {
      algorithm: "HS256",
      expiresIn: isAccessToken ? "15m" : "7d", // acceso 15 min, refresh 7 días
    }
  );
}

function generateAccessToken(user) {
  return sign({ user }, true);
}

function generateRefreshToken(user) {
  return sign({ user }, false);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};

