import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Nomina } = initModels(sequelize, DataTypes);

const router = express.Router();

// Récupérer toutes les fiches de paie (nóminas)
router.get("/", async (req, res) => {
  try {
    const nominas = await Nomina.findAll();
    res.json(nominas);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des fiches de paie" });
  }
});

// Créer une nouvelle fiche de paie
router.post("/", async (req, res) => {
  const { employeeId, salaireBrut, deductions, salaireNet, mois, annee } =
    req.body;
  try {
    const nomina = await Nomina.create({
      employeeId,
      salaireBrut,
      deductions,
      salaireNet,
      mois,
      annee,
    });
    res.status(201).json(nomina);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la fiche de paie" });
  }
});

export default router;
