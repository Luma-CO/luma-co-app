import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Devis } = initModels(sequelize, DataTypes);

const router = express.Router();

// Récupérer tous les devis
router.get("/", async (req, res) => {
  try {
    const devis = await Devis.findAll();
    res.json(devis);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des devis" });
  }
});

// Créer un nouveau devis
router.post("/", async (req, res) => {
  const { clientId, description, montant, statut, dateCreation } = req.body;
  try {
    const devis = await Devis.create({
      clientId,
      description,
      montant,
      statut,
      dateCreation,
    });
    res.status(201).json(devis);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du devis" });
  }
});

export default router;
