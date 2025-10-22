import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "cine_track",
  port: 3306 // 🔹 Puerto estándar de MySQL/MariaDB
});

// proceso de conexion  
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err.message);
  } else {
    console.log("Conectado correctamente a la base de datos:", process.env.DB_NAME);
  }
});

export default db;
