
const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonresponse");

router.post("/", (req, res) => {
    const {Username, Password} = req.body;

    if (!!!Username || !!!Password) {
        return res.status(400).json(jsonResponse(400,{error:"todos los campos son obligatorios"}));
    }


    if (Password.length < 6) {
        return res.status(400).json(jsonResponse(400,{error:"la contraseña debe tener al menos 6 caracteres"}));
    }

    if (!/^[a-zA-Z0-9]+$/.test(Username)) {
        return res.status(400).json(jsonResponse(400,{error:"el nombre de usuario solo puede contener letras y números"}));
    }
// autenticar usuario
const accessToken = "access_token";
const refresToken = "refresh_token";
const user = {
    id: "user_id",
    Username: Username,
}


    res.status(200).json(jsonResponse(200,{user, accessToken, refresToken, message:"Usuario autenticado correctamente"}));
    res.send("Login");
});

module.exports = router;