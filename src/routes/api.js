const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const router = express.Router();

// Simuler une base de données d'utilisateurs
const usersDB = [
  { dni: "12345678A", email: "test@luma.com" },
  // Ajoutez d'autres utilisateurs ici
];

// Middleware pour analyser les données JSON du corps de la requête
router.use(bodyParser.json());

// Route pour récupérer la prédiction depuis l'API Flask
router.get("/predict", async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/predict");
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de l’appel à l’API Flask:", error.message);
    res.status(500).json({ error: "Erreur interne" });
  }
});

// Route pour récupérer le mot de passe
router.post("/recover-password", (req, res) => {
  const { dni, email, captcha } = req.body;

  // Vérifier le captcha ici (vous devrez l'intégrer avec une bibliothèque de captcha côté serveur)
  if (captcha !== "valid-captcha") {
    // Remplacez par une vraie vérification de captcha
    return res
      .status(400)
      .json({ success: false, message: "Captcha incorrect." });
  }

  // Vérifier si le DNI et l'email correspondent à un utilisateur dans la base de données
  const user = usersDB.find((user) => user.dni === dni && user.email === email);

  if (user) {
    // L'utilisateur existe, renvoyer un succès
    res.json({ success: true });
  } else {
    // Si le DNI ou l'email est incorrect
    res
      .status(400)
      .json({ success: false, message: "DNI/NIE ou email incorrect." });
  }
});

module.exports = router;
