import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Facture } = initModels(sequelize, DataTypes);

const router = express.Router();

// Récupérer toutes les factures
router.get("/", async (req, res) => {
  try {
    const factures = await Facture.findAll();
    res.json(factures);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des factures" });
  }
});

// Créer une nouvelle facture
router.post("/", async (req, res) => {
  const { clientId, montant, statut, dateEmission, dateEcheance } = req.body;
  try {
    const facture = await Facture.create({
      clientId,
      montant,
      statut,
      dateEmission,
      dateEcheance,
    });
    res.status(201).json(facture);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la facture" });
  }
});

export default router;
