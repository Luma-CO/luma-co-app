import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import sequelize from "./config/sequelize.js"; // Import MySQL avec Sequelize

import authRoutes from "./routes/auth.js";
import clientsRouter from "./routes/clients.js";
import facturesRouter from "./routes/factures.js";
import contratsRouter from "./routes/contrats.js";
import congesRouter from "./routes/conges.js";
import devisRouter from "./routes/devis.js";
import nominasRouter from "./routes/nominas.js";
import recrutementRouter from "./routes/recrutement.js";
import chatRouter from "./routes/chat.js";
import reglagesRouter from "./routes/reglages.js";
import employeesRouter from "./routes/employees.js";
import dashboardRouter from "./routes/dashboard.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });
console.log("🔍 Chargement du .env terminé.");
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes API
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientsRouter);
app.use("/api/factures", facturesRouter);
app.use("/api/contrats", contratsRouter);
app.use("/api/conges", congesRouter);
app.use("/api/devis", devisRouter);
app.use("/api/nominas", nominasRouter);
app.use("/api/recrutement", recrutementRouter);
app.use("/api/chat", chatRouter);
app.use("/api/reglages", reglagesRouter);
app.use("/api/employees", employeesRouter);
app.use("/api/dashboard", dashboardRouter);

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// Connexion MySQL avec Sequelize
sequelize
  .authenticate()
  .then(() => console.log("✅ Connecté à MySQL"))
  .catch((err) => console.error("❌ Erreur MySQL :", err));

// WebSocket avec Socket.io
io.on("connection", (socket) => {
  console.log("✅ Un utilisateur s'est connecté");

  socket.on("sendMessage", (message) => {
    console.log("📩 Message reçu :", message);
    io.emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ Un utilisateur s'est déconnecté");
  });
});

// Route test
app.get("/", (req, res) => {
  res.send("🚀 API + WebSocket opérationnels !");
});

// Démarrage du serveur
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
