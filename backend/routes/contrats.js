import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Contrat } = initModels(sequelize, DataTypes);

const router = express.Router();

// Récupérer tous les contrats
router.get("/", async (req, res) => {
  try {
    const contrats = await Contrat.findAll();
    res.json(contrats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des contrats" });
  }
});

// Créer un nouveau contrat
router.post("/", async (req, res) => {
  const { employeeId, type, dateDebut, dateFin, salaire } = req.body;
  try {
    const contrat = await Contrat.create({
      employeeId,
      type,
      dateDebut,
      dateFin,
      salaire,
    });
    res.status(201).json(contrat);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du contrat" });
  }
});

export default router;
