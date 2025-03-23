import express from "express";
import bcrypt from "bcrypt"; // Pour hacher les mots de passe
import { Client } from "../models/index.js"; // Le modèle Client
import jwt from "jsonwebtoken"; // Si tu veux gérer des tokens JWT
import { setupAdmins } from "../auth.js"; // Si tu veux appeler une fonction définie dans `auth.js`
import User from "../models/User.js";

const router = express.Router();

// Route pour configurer les admins
router.post("/setup-admins", async (req, res) => {
  const users = [
    {
      email: "admin@luma.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
    {
      email: "rh@luma.com",
      password: await bcrypt.hash("rh123", 10),
      role: "rh",
    },
    {
      email: "com@luma.com",
      password: await bcrypt.hash("com123", 10),
      role: "commercial",
    },
  ];

  try {
    // Vérifie si des utilisateurs existent déjà, sinon crée les utilisateurs par défaut
    for (const user of users) {
      const existingUser = await Client.findOne({
        where: { email: user.email },
      });
      if (!existingUser) {
        await Client.create({
          email: user.email,
          password: user.password,
          role: user.role,
        });
      }
    }

    res
      .status(201)
      .json({ message: "Utilisateurs administrateurs créés avec succès." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création des utilisateurs" });
  }
});

// Route pour la connexion (login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Récupération des données de la requête

  try {
    // Chercher l'utilisateur par email
    const client = await Client.findOne({ where: { email } });

    if (!client) {
      return res.status(404).json({ message: "Utilisateur non trouvé" }); // Si l'utilisateur n'existe pas
    }

    // Comparaison des mots de passe (en supposant que le mot de passe est haché)
    const isPasswordValid = await bcrypt.compare(password, client.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" }); // Si le mot de passe est incorrect
    }

    // Créer un token JWT (si tu veux en utiliser un)
    const token = jwt.sign({ id: client.id, role: client.role }, "secret_key", {
      expiresIn: "1h",
    });

    // Si tout est valide, tu peux retourner un message de succès et le token
    res.status(200).json({ message: "Connexion réussie", token, client });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
