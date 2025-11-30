import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import peliculasRouter from "./routes/peliculas.js";
import usuariosRouter from "./routes/usuarios.js";
import resenasRouter from "./routes/resenas.js";
import carteleraRoutes from "./routes/cartelera.js";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Servir imágenes de perfil
// (esto permite acceder con http://<IP>:3000/uploads/nombrefoto.jpg)
app.use("/uploads", express.static(path.resolve("uploads")));

// ✅ Rutas principales
app.use("/api/peliculas", peliculasRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/resenas", resenasRouter);
app.use("/api/cartelera", carteleraRoutes);

// ✅ Endpoint de prueba
app.get("/", (req, res) => {
  res.send("🎬 Servidor CineTrack funcionando correctamente 🚀");
});

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en http://0.0.0.0:${PORT}`);
});