// server/server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware express pour gérer les requêtes HTTP si nécessaire
app.use(express.static("public")); // Si tu as des fichiers statiques (par ex. images, HTML)

io.on("connection", (socket) => {
  console.log("A user connected");

  // Gestion des messages entrants
  socket.on("sendMessage", (message) => {
    console.log("Message reçu:", message);
    io.emit("newMessage", message); // Envoie ce message à tous les clients connectés
  });

  // Détection de la déconnexion
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Démarre le serveur WebSocket
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
