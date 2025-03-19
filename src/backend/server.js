// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; // Importation de dotenv pour charger les variables d'environnement
import authRoutes from "./routes/auth.js"; // Assure-toi de mettre l'extension .js

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const app = express();

// Utilisation de PORT défini dans le fichier .env (ou 8000 par défaut)
const PORT = process.env.PORT || 8001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3002", // Assure-toi que c'est l'URL correcte de ton frontend
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());

// Connexion à la base de données MongoDB avec la variable d'environnement MONGO_URI
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté à la base de données MongoDB"))
  .catch((err) => console.log("Erreur de connexion à MongoDB: ", err));

// Utilisation des routes d'authentification
app.use("/api/auth", authRoutes);

// Démarrage du serveur sur le port défini
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
