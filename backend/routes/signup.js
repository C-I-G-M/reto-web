
const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonresponse");

router.post("/", (req, res) => {
    const { name,email,Lastname,Username, Password,FechaNac,PasswordConfirm,sexo } = req.body;

    if (!!!name || !!!email || !!!Lastname || !!!Username || !!!Password || !!!FechaNac || !!!PasswordConfirm || !!!sexo) {
        return res.status(400).json(jsonResponse(400,{error:"todos los campos son obligatorios"}));
    }

    if (Password !== PasswordConfirm) {
        return res.status(400).json(jsonResponse(400,{error:"las contraseñas no coinciden"}));
    }

    if (Password.length < 6) {
        return res.status(400).json(jsonResponse(400,{error:"la contraseña debe tener al menos 6 caracteres"}));
    }

    if (!/^[a-zA-Z0-9]+$/.test(Username)) {
        return res.status(400).json(jsonResponse(400,{error:"el nombre de usuario solo puede contener letras y números"}));
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json(jsonResponse(400,{error:"el correo electrónico no es válido"}));
    }

    res.status(200).json(jsonResponse(200,{message:"Usuario registrado correctamente"}));


    res.send("Signup");
});

module.exports = router;