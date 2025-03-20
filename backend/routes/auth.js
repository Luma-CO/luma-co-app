// backend/routes/auth.js
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// 🔐 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Tentative de connexion avec l'email:", email); // Ajout d'un log

    // Vérification de l'email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Utilisateur non trouvé pour l'email:", email); // Log si l'utilisateur n'est pas trouvé
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Comparaison du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Mot de passe incorrect pour l'email:", email); // Log si le mot de passe est incorrect
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "yourSecretKey",
      {
        expiresIn: "1h", // Expiration du token après 1h
      }
    );

    console.log("Connexion réussie pour l'email:", email); // Log pour la réussite de la connexion

    // Réponse avec le token et le rôle de l'utilisateur
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Erreur lors de la connexion:", err.message); // Log de l'erreur générale
    res
      .status(500)
      .json({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
});

export default router;
