import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

/**
 *  REGISTRO DE USUARIO
 */
router.post("/register", async (req, res) => {
  const { nombre, correo, pass } = req.body;

  if (!nombre || !correo || !pass) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    //  Verificar si existe la tabla 'usuario'
    await db.promise().query("DESCRIBE usuario");

    // Verificar si el usuario ya existe
    const [existing] = await db.promise().query(
      "SELECT * FROM usuario WHERE correo = ?",
      [correo]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }

    //  Encriptar contraseña
    const hashedPass = await bcrypt.hash(pass, 10);

    //  Insertar usuario
    const [result] = await db.promise().query(
      "INSERT INTO usuario (nombre, correo, pass) VALUES (?, ?, ?)",
      [nombre, correo, hashedPass]
    );

    if (result.affectedRows > 0) {
      console.log(` Usuario registrado: ${correo}`);
      res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    } else {
      res.status(500).json({ error: "No se pudo registrar el usuario" });
    }
  } catch (error) {
    console.error("⚠️ Error detallado en /register:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * LOGIN DE USUARIO
 */
router.post("/login", async (req, res) => {
  const { correo, pass } = req.body;

  if (!correo || !pass) {
    return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
  }

  try {
    //  Verificar que la tabla exista
    await db.promise().query("DESCRIBE usuario");

    //  Buscar el usuario
    const [rows] = await db.promise().query(
      "SELECT * FROM usuario WHERE correo = ?",
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(pass, user.pass);

    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.idUsuario, correo: user.correo },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log(`Login correcto para: ${user.correo}`);

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: user.idUsuario,
        nombre: user.nombre,
      },
    });
  } catch (error) {
    console.error("Error detallado en /login:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
