
const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonresponse");
const bcrypt = require("bcrypt");
const { poolPromise, sql } = require("../db");

router.post("/", async (req, res) => {
    const { name,email,Lastname,Username, Password,FechaNac,PasswordConfirm,sexo, provinciaId } = req.body;

    if (!!!name || !!!email || !!!Lastname || !!!Username || !!!Password || !!!FechaNac || !!!PasswordConfirm || !!!sexo || !!!provinciaId) {
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

    try {
        const pool = await poolPromise;

        // Verifica si el username o email ya existen
        const checkUser = await pool.request()
            .input("Nombre_de_Usuario", sql.VarChar, Username)
            .input("Email", sql.VarChar, email)
            .query("SELECT * FROM Usuarios WHERE Nombre_de_Usuario = @Nombre_de_Usuario OR Email = @Email");

        if (checkUser.recordset.length > 0) {
            return res.status(400).json(jsonResponse(400, { error: "El usuario o correo ya está registrado" }));
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        await pool.request()
    .input("Nombre", sql.VarChar, name)
    .input("Apellido", sql.VarChar, Lastname)
    .input("Nombre_de_Usuario", sql.VarChar, Username)
    .input("Contrasena", sql.VarChar, hashedPassword)
    .input("FechaNac", sql.Date, FechaNac)
    .input("Email", sql.VarChar, email)
    .input("Sexo", sql.VarChar, sexo)
    .input("ID_Provincia", sql.Int, provinciaId)
    .execute("InsertarUsuario");


        return res.status(200).json(jsonResponse(200, { message: "Usuario registrado correctamente" }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(jsonResponse(500, { error: "Error del servidor" }));
    }
});

module.exports = router;