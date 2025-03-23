// index.js
import ClientModels from "./Client.js";

export function initModels(sequelize, DataTypes) {
  // Utilisation du bon nom : ClientModels (avec le 's')
  const Client = ClientModels(sequelize, DataTypes);
  return { Client };
}
