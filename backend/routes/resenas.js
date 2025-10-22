import express from "express";
import db from "../db.js";
import { verificarToken } from "../middleware/auth.js";

const router = express.Router();

// Agregar reseña (solo con token)
router.post("/", verificarToken, async (req, res) => {
  const { contenido, calificacion, idPelicula } = req.body;
  const idUsuario = req.user.id; // tomado del token JWT

  if (!contenido || !calificacion || !idPelicula) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    await db
      .promise()
      .query(
        "INSERT INTO resena (contenido, calificacion, idUsuario, idPelicula) VALUES (?, ?, ?, ?)",
        [contenido, calificacion, idUsuario, idPelicula]
      );

    res.status(201).json({ mensaje: "Reseña guardada correctamente" });
  } catch (error) {
    console.error("Error al guardar reseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//  Listar reseñas por película (pública)
router.get("/:idPelicula", async (req, res) => {
  const { idPelicula } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT r.idResena, r.contenido, r.calificacion, r.fecha, u.nombre AS usuario
         FROM resena r
         INNER JOIN usuario u ON r.idUsuario = u.idUsuario
         WHERE r.idPelicula = ?
         ORDER BY r.fecha DESC`,
        [idPelicula]
      );

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
