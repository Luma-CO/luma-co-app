// backend/controllers/authController.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // On importe le modèle User pour interagir avec la base de données

// Contrôleur pour la connexion de l'utilisateur
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Trouver l'utilisateur par son nom d'utilisateur
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Identifiants incorrects." });
    }

    // Comparer le mot de passe avec celui stocké dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Identifiants incorrects." });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload avec l'ID de l'utilisateur et son rôle
      process.env.JWT_SECRET, // Clé secrète pour signer le token
      { expiresIn: "1h" } // Durée de validité du token
    );

    // Retourner le token et le rôle de l'utilisateur
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Erreur lors de la connexion: ", err);
    res
      .status(500)
      .json({ error: "Une erreur est survenue. Veuillez réessayer." });
  }
};
