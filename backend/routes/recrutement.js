import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Candidat } = initModels(sequelize, DataTypes);

const router = express.Router();

// Récupérer tous les candidats
router.get("/", async (req, res) => {
  try {
    const candidats = await Candidat.findAll();
    res.json(candidats);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des candidats" });
  }
});

// Ajouter un candidat
router.post("/", async (req, res) => {
  const { name, email, phone, poste, statut } = req.body;
  try {
    const candidat = await Candidat.create({
      name,
      email,
      phone,
      poste,
      statut,
    });
    res.status(201).json(candidat);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout du candidat" });
  }
});

export default router;
