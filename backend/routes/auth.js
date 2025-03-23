// backend/routes/auth.js
import express from "express";
import User from "../models/User.js"; // Assurez-vous que votre modèle User est correct
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// 🔐 Route pour la connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Tentative de connexion avec l'email:", email); // Log pour la tentative de connexion

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
      { expiresIn: "1h" } // Expiration du token après 1 heure
    );

    console.log("Connexion réussie pour l'email:", email); // Log pour la réussite de la connexion

    // Réponse avec le token et le rôle de l'utilisateur
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Erreur lors de la connexion:", err.message); // Log d'erreur
    res
      .status(500)
      .json({ message: "Une erreur est survenue. Veuillez réessayer." });
  }
});

// 🔐 Route pour configurer des administrateurs par défaut
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
    console.log("Début de la configuration des administrateurs...");

    // Vérifier si les utilisateurs existent déjà, sinon les créer
    for (const user of users) {
      console.log(
        `Vérification de l'existence de l'utilisateur : ${user.email}`
      );

      const existingUser = await User.findOne({ email: user.email }); // Correction ici, pas de `where`

      console.log(`Utilisateur trouvé : ${existingUser ? "Oui" : "Non"}`);

      // Si l'utilisateur n'existe pas, on le crée
      if (!existingUser) {
        console.log(`Création de l'utilisateur : ${user.email}`);
        const newUser = new User({
          email: user.email,
          password: user.password,
          role: user.role,
        });

        await newUser.save(); // Sauvegarder l'utilisateur dans MongoDB
        console.log(`Utilisateur ${user.email} créé avec succès.`);
      } else {
        console.log(`L'utilisateur ${user.email} existe déjà.`);
      }
    }

    res
      .status(201)
      .json({ message: "Utilisateurs administrateurs créés avec succès." });
  } catch (err) {
    console.error(
      "Erreur lors de la configuration des administrateurs:",
      err.message
    );
    res.status(500).json({
      message: "Erreur lors de la configuration des administrateurs.",
    });
  }
});

export default router;
