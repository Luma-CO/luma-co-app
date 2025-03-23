import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Client, Facture, Employee, Nomina } = initModels(sequelize, DataTypes);

const router = express.Router();

// Obtenir les statistiques globales du tableau de bord
router.get("/", async (req, res) => {
  try {
    const totalClients = await Client.count();
    const totalFactures = await Facture.count();
    const totalEmployees = await Employee.count();
    const totalSalaire = await Nomina.sum("salaireNet");

    res.json({
      totalClients,
      totalFactures,
      totalEmployees,
      totalSalaire,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des statistiques du dashboard",
      });
  }
});

export default router;
