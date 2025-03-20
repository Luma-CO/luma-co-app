import { Sequelize } from "sequelize";

// Paramètres de connexion à adapter selon ton environnement
const sequelize = new Sequelize("luma-co-app", "admin@luma.com", "admin123@", {
  host: "localhost",
  dialect: "mysql", // ou 'postgres', 'sqlite', etc.
  logging: false, // passe à true si tu veux voir les requêtes SQL dans la console
});

// Test de connexion
try {
  await sequelize.authenticate();
  console.log("✅ Connexion à la base réussie");
} catch (error) {
  console.error("❌ Impossible de se connecter à la base :", error);
}

export default sequelize;
