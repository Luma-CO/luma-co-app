import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Message } = initModels(sequelize, DataTypes);

const router = express.Router();

// Récupérer tous les messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des messages" });
  }
});

// Envoyer un nouveau message
router.post("/", async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message" });
  }
});

export default router;
