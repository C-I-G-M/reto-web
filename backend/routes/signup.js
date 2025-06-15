
const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonresponse");
const bcrypt = require("bcrypt");
const { poolPromise, sql } = require("../db");

router.post("/", async (req, res) => {
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

    try {
        const pool = await poolPromise;

        // Verifica si el username o email ya existen
        const checkUser = await pool.request()
            .input("Username", sql.NVarChar, Username)
            .input("Email", sql.NVarChar, email)
            .query("SELECT * FROM Usuarios WHERE Username = @Username OR Email = @Email");

        if (checkUser.recordset.length > 0) {
            return res.status(400).json(jsonResponse(400, { error: "El usuario o correo ya está registrado" }));
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        await pool.request()
            .input("Name", sql.NVarChar, name)
            .input("Lastname", sql.NVarChar, Lastname)
            .input("Username", sql.NVarChar, Username)
            .input("Password", sql.NVarChar, hashedPassword)
            .input("FechaNac", sql.Date, FechaNac)
            .input("Email", sql.NVarChar, email)
            .input("Sexo", sql.Char, sexo)
            .query(`
                INSERT INTO Usuarios (Name, Lastname, Username, Password, FechaNac, Email, Sexo)
                VALUES (@Name, @Lastname, @Username, @Password, @FechaNac, @Email, @Sexo)
            `);

        return res.status(200).json(jsonResponse(200, { message: "Usuario registrado correctamente" }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(jsonResponse(500, { error: "Error del servidor" }));
    }
});

module.exports = router;