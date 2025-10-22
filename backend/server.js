import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import peliculasRouter from "./routes/peliculas.js";
import usuariosRouter from "./routes/usuarios.js";
import resenasRouter from "./routes/resenas.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // 👈 IMPORTANTE

app.use("/api/peliculas", peliculasRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/resenas", resenasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
