import express from "express";
const router = express.Router();

// Ruta de prueba
router.get("/", (req, res) => {
  res.json({ mensaje: "Ruta de películas funcionando 🎬" });
});

export default router;
