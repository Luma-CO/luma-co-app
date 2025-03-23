import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2"; // Assure que mysql2 est bien importé

dotenv.config(); // Charge les variables d'environnement

const sequelize = new Sequelize(
  process.env.DB_NAME || "luma_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "ML1603",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    dialectModule: mysql2, // Ajoute cette ligne
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    logging: false,
  }
);

// Test de connexion
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base réussie");
  } catch (error) {
    console.error("❌ Impossible de se connecter à la base :", error.message);
    process.exit(1); // Quitte le process en cas d'erreur
  }
};

connectDB();

export default sequelize;
