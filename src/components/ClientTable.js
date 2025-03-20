// src/components/ClientTable.js
import React from "react";

export default function ClientTable({ clients, onDelete, onEdit }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Liste des clients</h2>

      {/* Tableau des clients */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Entreprise</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
                <td>{client.company}</td>
                <td>
                  <button
                    className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => onEdit(client)}
                  >
                    Modifier
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => onDelete(client._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Aucun client disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Affichage sous forme de carte si tu préfères une autre présentation */}
      <div className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client._id}
            className="p-4 border rounded-lg shadow-lg bg-white"
          >
            <h3 className="font-semibold text-lg">{client.name}</h3>
            <p>Email: {client.email}</p>
            <p>Téléphone: {client.phone}</p>
            <p>Adresse: {client.address}</p>
            <p>Entreprise: {client.company}</p>

            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => onEdit(client)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => onDelete(client._id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
