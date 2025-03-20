const express = require("express");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch"); // Si tu utilises reCAPTCHA
const router = express.Router();
const User = require("../models/User"); // Tu dois avoir un modèle User dans ton application (MongoDB, SQL, etc.)

// Créer un transporteur pour envoyer des emails (ex : avec Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Utilise ton email dans .env
    pass: process.env.EMAIL_PASS, // Utilise ton mot de passe dans .env
  },
});

// Route pour gérer la récupération de mot de passe
router.post("/recover-password", async (req, res) => {
  const { dni, email, captcha } = req.body;

  // Vérification du captcha (si nécessaire)
  const captchaValid = await verifyCaptcha(captcha);
  if (!captchaValid) {
    return res
      .status(400)
      .json({ success: false, message: "Captcha invalide." });
  }

  try {
    // Vérifier si l'utilisateur existe avec le DNI et l'email
    const user = await User.findOne({ dni, email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Utilisateur non trouvé. Vérifiez vos informations.",
      });
    }

    // Générer un token de réinitialisation
    const resetToken = generateResetToken(); // Exemple simple de token

    // Envoie d'un email avec le lien de réinitialisation
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Ton email
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe: ${resetLink}`,
    });

    return res.json({
      success: true,
      message:
        "Un email a été envoyé avec un lien pour réinitialiser votre mot de passe.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue, veuillez réessayer.",
    });
  }
});

// Fonction pour vérifier le captcha (Google reCAPTCHA)
const verifyCaptcha = async (captchaResponse) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Ta clé secrète Google reCAPTCHA
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;

  const response = await fetch(url, { method: "POST" });
  const data = await response.json();
  return data.success;
};

// Fonction pour générer un token de réinitialisation
const generateResetToken = () => {
  return Math.random().toString(36).substring(2, 15); // Exemple simple de génération de token
};

module.exports = router;
