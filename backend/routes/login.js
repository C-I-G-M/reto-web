
const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonresponse");
const bcrypt = require("bcrypt");
const { poolPromise, sql } = require("../db");
const { generateAccessToken, generateRefreshToken } = require("../lib/auth");


router.post("/", async (req, res) => {
    const {Username, Password} = req.body;

    if (!Username || !Password) {
        return res.status(400).json(jsonResponse(400,{error:"todos los campos son obligatorios"}));
    }


    if (Password.length < 6) {
        return res.status(400).json(jsonResponse(400,{error:"la contraseña debe tener al menos 6 caracteres"}));
    }

    if (!/^[a-zA-Z0-9]+$/.test(Username)) {
        return res.status(400).json(jsonResponse(400,{error:"el nombre de usuario solo puede contener letras y números"}));
    }
 try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("Nombre_de_Usuario", sql.VarChar, Username)
            .execute("SP_ObtenerUsuarioPorNombre");
           
        if (result.recordset.length === 0) {
            return res.status(404).json(jsonResponse(404, { error: "Usuario no encontrado" }));
        }

        const userFromDb = result.recordset[0];

        const passwordMatch = await bcrypt.compare(Password, userFromDb.Contrasena);

        if (!passwordMatch) {
            return res.status(401).json(jsonResponse(401, { error: "Usuario o Contraseña incorrectos" }));
        }

        const payload = {
            id: userFromDb.ID_Usuario,
            username: userFromDb.Nombre_de_Usuario,
            rol: userFromDb.Rol,
        };


        // Generar tokens
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);


await pool.request()
    .input("UserId", sql.Int, userFromDb.ID_Usuario)
    .input("Token", sql.NVarChar(sql.MAX), refreshToken)
    .execute("SP_InsertarRefreshToken");
   


        return res.status(200).json(jsonResponse(200, {
            user: payload,
            accessToken,
            refreshToken,
            message: "Usuario autenticado correctamente"
        }));

        
        

    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json(jsonResponse(500, { error: "Error del servidor" }));
    }

    
    
    
});

module.exports = router;