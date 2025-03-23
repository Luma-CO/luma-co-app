import React from "react";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";

export default function DevisTable({ devis, clients, onView, onDelete }) {
  // Fonction pour récupérer le nom du client à partir de son ID
  const getClientName = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    return client ? client.name : "Client inconnu";
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">
        Liste des devis
      </h2>

      {/* Tableau des devis */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse table-auto bg-white rounded-lg">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Montant</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devis.length > 0 ? (
              devis.map((devisItem) => (
                <motion.tr
                  key={devisItem._id}
                  className="border-t hover:bg-gray-100 transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-3">
                    {getClientName(devisItem.clientId)}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {devisItem.amount} €
                  </td>
                  <td className="px-4 py-3">{devisItem.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        devisItem.status === "En attente"
                          ? "bg-yellow-500"
                          : devisItem.status === "Approuvé"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {devisItem.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <button
                      onClick={() => onView(devisItem)}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(devisItem._id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Aucun devis disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Affichage sous forme de cartes */}
      <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {devis.map((devisItem) => (
          <motion.div
            key={devisItem._id}
            className="p-6 border rounded-lg shadow-lg bg-white space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold text-lg">
              {getClientName(devisItem.clientId)}
            </h3>
            <p className="text-gray-600">
              Montant: <span className="font-bold">{devisItem.amount} €</span>
            </p>
            <p className="text-gray-600">Date: {devisItem.date}</p>
            <p className="text-gray-600">
              Statut: <span className="font-semibold">{devisItem.status}</span>
            </p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => onView(devisItem)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center space-x-2"
              >
                <Eye size={18} />
                <span>Voir</span>
              </button>
              <button
                onClick={() => onDelete(devisItem._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center space-x-2"
              >
                <Trash2 size={18} />
                <span>Supprimer</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
