// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import clientsRouter from "./routes/clients.js"; // Bien utiliser "clientsRouter" pour rester cohérent

dotenv.config(); // Charger les variables d'environnement

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientsRouter); // Correction ici

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connecté à la base de données MongoDB"))
  .catch((err) => console.error("❌ Erreur de connexion à MongoDB:", err));

// Démarrage serveur
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
