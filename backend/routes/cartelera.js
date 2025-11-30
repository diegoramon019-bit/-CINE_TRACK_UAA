import express from "express";
import db from "../db.js";

const router = express.Router();

// ✅ Obtener toda la cartelera (con datos de película asociados)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.idCartelera, c.cine, c.formato, c.horarios, c.estado,
             p.titulo, p.portada_url
      FROM cartelera c
      JOIN pelicula p ON c.idPelicula = p.idPelicula
      ORDER BY c.estado DESC, p.titulo ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error("⚠️ Error al obtener cartelera:", error.message);
    res.status(500).json({ error: "Error al obtener cartelera" });
  }
});

export default router;