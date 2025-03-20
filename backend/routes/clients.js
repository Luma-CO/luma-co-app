import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js"; // selon comment tu l'as déclaré
import pkg from "sequelize";
const { DataTypes } = pkg;

const { Client } = initModels(sequelize, DataTypes);

const router = express.Router();

// tes routes ici

export default router;

router.get("/", async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des clients" });
  }
});

// Route pour créer un nouveau client
router.post("/", async (req, res) => {
  const { name, email, phone, address, company } = req.body;

  try {
    const client = await Client.create({
      name,
      email,
      phone,
      address,
      company,
    });
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du client" });
  }
});

module.exports = router;
