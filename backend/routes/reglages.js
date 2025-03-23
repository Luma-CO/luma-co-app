import express from "express";
import { initModels } from "../models/index.js";
import sequelize from "../config/sequelize.js";
import pkg from "sequelize";

const { DataTypes } = pkg;
const { Reglage } = initModels(sequelize, DataTypes);

const router = express.Router();

// ✅ Récupérer les paramètres
router.get("/", async (req, res) => {
  try {
    const reglage = await Reglage.findOne();
    if (!reglage) {
      return res.status(404).json({ message: "Aucun paramètre trouvé" });
    }
    res.json(reglage);
  } catch (err) {
    console.error("Erreur lors de la récupération des paramètres :", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// ✅ Mettre à jour les paramètres
router.put("/", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const reglage = await Reglage.findOne({ transaction: t });

    if (!reglage) {
      await t.rollback();
      return res.status(404).json({ message: "Paramètres non trouvés" });
    }

    if (Object.keys(req.body).length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "Aucune donnée fournie" });
    }

    await reglage.update(req.body, { transaction: t });
    await t.commit();

    res.json({ message: "Paramètres mis à jour avec succès" });
  } catch (err) {
    await t.rollback();
    console.error("Erreur lors de la mise à jour des paramètres :", err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

export default router;
