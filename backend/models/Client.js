import { DataTypes } from "sequelize";

export default function ClientModel(sequelize) {
  return sequelize.define(
    "Client",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Le nom est obligatoire
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // L'email est obligatoire
        unique: true, // L'email doit être unique
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true, // Le téléphone est optionnel
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true, // L'adresse est optionnelle
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true, // L'entreprise est optionnelle
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Valeur par défaut : l'heure actuelle
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Valeur par défaut : l'heure actuelle
      },
    },
    {
      // Option de configuration pour gérer automatiquement createdAt et updatedAt
      timestamps: true, // Sequelize gérera automatiquement les timestamps
      createdAt: "createdAt", // Le champ créé sera "createdAt"
      updatedAt: "updatedAt", // Le champ modifié sera "updatedAt"
    }
  );
}
