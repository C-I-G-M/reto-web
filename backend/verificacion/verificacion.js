const getTokenFromHeader = require("../lib/getTokenFromHeader");
const { jsonResponse } = require("../lib/jsonresponse");
const { verifyAccessToken } = require("../lib/verifyTokens");

function authenticate(req, res, next){
const token = getTokenFromHeader(req.headers);

if (token) {
const decoced = verifyAccessToken(token);
if (decoced) {

    req.user = {...decoced.User};
    next();
}
else {
    res.status(401).json(jsonResponse(401, {message: "Sin autorizacion"}));}

}
else{
res.status(401).json(jsonResponse(401,{message: "Sin autorizacion"}));

}

}
module.exports = authenticate;