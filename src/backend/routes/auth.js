import express from "express";
import User from "../models/User.js";
import Client from "../models/Client.js";
import Quote from "../models/Quote.js";
import Invoice from "../models/Invoice.js";
import Message from "../models/Message.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware, checkRole } from "../middleware/auth.js";

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
    const token = jwt.sign({ id: user._id, role: user.role }, "yourSecretKey", {
      expiresIn: "1h", // Expiration du token après 1h
    });

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

// 📝 Register (admin uniquement à terme)
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hachage du mot de passe avant d'enregistrer l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔐 TEMP : Setup comptes initiaux (à supprimer plus tard)
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
    for (const user of users) {
      const existing = await User.findOne({ email: user.email });
      if (!existing) {
        const newUser = new User(user);
        await newUser.save();
      }
    }
    res.json({ message: "Utilisateurs créés avec succès 💥 !" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📂 Clients - Accessibles RH + Admin
router.get(
  "/clients",
  authMiddleware,
  checkRole(["admin", "rh"]),
  async (req, res) => {
    try {
      const clients = await Client.find();
      res.json(clients);
    } catch (err) {
      res.status(500).json({
        message: "Erreur serveur lors de la récupération des clients.",
      });
    }
  }
);

router.post(
  "/clients",
  authMiddleware,
  checkRole(["admin", "rh"]),
  async (req, res) => {
    const { name, email, phone, company, address, serviceRequested } = req.body;
    try {
      const newClient = new Client({
        name,
        email,
        phone,
        company,
        address,
        serviceRequested,
      });
      await newClient.save();
      res.json(newClient);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erreur serveur lors de la création du client." });
    }
  }
);

// 📄 Quotes (Devis) - Accessibles Commercial + Admin
router.get(
  "/quotes",
  authMiddleware,
  checkRole(["admin", "commercial"]),
  async (req, res) => {
    try {
      const quotes = await Quote.find();
      res.json(quotes);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Erreur serveur lors de la récupération des devis." });
    }
  }
);

// 🧾 Factures - RH + Admin
router.post(
  "/invoices",
  authMiddleware,
  checkRole(["rh", "admin"]),
  async (req, res) => {
    const { client, amount, dueDate } = req.body;
    try {
      const invoice = new Invoice({ client, amount, dueDate });
      await invoice.save();
      res.status(201).json(invoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// 📨 Chat interne (tous les users connectés)
router.post("/messages", authMiddleware, async (req, res) => {
  const { content } = req.body;
  try {
    const message = new Message({ sender: req.user.id, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender", "email role")
      .sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
