const jwt = require('jsonwebtoken');

function verifyAccessToken(token){
return jwt.verify(token, process.env.access_token_secret);
}

function verifyRefreshToken(token,){
return jwt.verify(token, process.env.refresh_token_secret);

}

module.exports = {
    verifyAccessToken,
    verifyRefreshToken
};