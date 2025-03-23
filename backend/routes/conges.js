import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Conge } = initModels(sequelize, DataTypes);

const router = express.Router();

// Récupérer toutes les demandes de congé
router.get("/", async (req, res) => {
  try {
    const conges = await Conge.findAll();
    res.json(conges);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des congés" });
  }
});

// Créer une nouvelle demande de congé
router.post("/", async (req, res) => {
  const { employeeId, dateDebut, dateFin, statut } = req.body;
  try {
    const conge = await Conge.create({
      employeeId,
      dateDebut,
      dateFin,
      statut,
    });
    res.status(201).json(conge);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la demande de congé" });
  }
});

export default router;
