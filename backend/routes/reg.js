// registrarUsuario.js
const { poolPromise } = require('../db'); // Tu conexión con SQL Server
const bcrypt = require('bcrypt');

async function registrarUsuario(usuario) {
  try {
    const pool = await poolPromise;

    // Encriptar contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);

    // Ejecutar INSERT
    const result = await pool.request()
      .input('Name', usuario.name)
      .input('LastName', usuario.lastName)
      .input('Username', usuario.username)
      .input('Password', hashedPassword)
      .input('FechaNac', usuario.fechaNac)
      .input('Email', usuario.email)
      .input('Sexo', usuario.sexo)
      .query(`
        INSERT INTO Usuarios (Name, LastName, Username, Password, FechaNac, Email, Sexo)
        VALUES (@Name, @LastName, @Username, @Password, @FechaNac, @Email, @Sexo)
      `);

    console.log(' Usuario registrado correctamente');
  } catch (err) {
    console.error(' Error al registrar usuario:', err);
  }
}

module.exports = registrarUsuario;
