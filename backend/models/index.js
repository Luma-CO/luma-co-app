import ClientModel from "./Client.js";

export function initModels(sequelize, DataTypes) {
  const Client = ClientModel(sequelize, DataTypes);
  return { Client };
}
