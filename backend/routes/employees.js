import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Employee } = initModels(sequelize, DataTypes);

const router = express.Router();

// Récupérer tous les employés
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des employés" });
  }
});

// Créer un nouvel employé
router.post("/", async (req, res) => {
  const { name, email, phone, position, department } = req.body;
  try {
    const employee = await Employee.create({
      name,
      email,
      phone,
      position,
      department,
    });
    res.status(201).json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'employé" });
  }
});

export default router;
