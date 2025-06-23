const jwt = require('jsonwebtoken');

function verifyAccessToken(token){
    if(!token || typeof token !== "string"){
        throw new Error("Token invalido: no es una cadena")
    }
return jwt.verify(token, process.env.access_token_secret);
}

function verifyRefreshToken(token,){

     if(!token ||typeof token !== "string"){
        throw new Error("Token invalido: no es una cadena")
    }
return jwt.verify(token, process.env.refresh_token_secret);

}

module.exports = {
    verifyAccessToken,
    verifyRefreshToken
};