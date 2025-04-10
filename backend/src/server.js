require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Permite recibir JSON en las solicitudes

// Conectar a MongoDB
connectDB();

// Importar rutas de tareas
const taskRoutes = require("./routes/tasks.routes");
app.use("/api", taskRoutes);

//importar rutas autentificacion
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
