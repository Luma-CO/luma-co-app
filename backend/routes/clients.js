import express from "express";
import { initModels } from "../models/index.js"; // Importation de l'initialisation des modèles
import sequelize from "../config/sequelize.js"; // Importation de la configuration de Sequelize
import pkg from "sequelize"; // Importation de Sequelize pour accéder à DataTypes

const { DataTypes } = pkg; // Déstructuration de DataTypes de Sequelize
const { Client } = initModels(sequelize, DataTypes); // Initialisation du modèle Client

const router = express.Router();

// Route pour récupérer tous les clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.findAll(); // Récupération de tous les clients
    res.json(clients); // Retourne les clients sous forme de JSON
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des clients" }); // Gestion d'erreur
  }
});

// Route pour créer un nouveau client
router.post("/", async (req, res) => {
  const { name, email, phone, address, company } = req.body; // Récupération des données du corps de la requête

  try {
    const client = await Client.create({
      name,
      email,
      phone,
      address,
      company,
    }); // Création d'un nouveau client dans la base de données
    res.status(201).json(client); // Retourne le client créé avec un code de statut 201
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du client" }); // Gestion d'erreur
  }
});

// Export du routeur pour l'utiliser dans ton application
export default router;
