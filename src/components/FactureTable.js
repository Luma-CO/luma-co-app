import React from "react";

export default function FactureTable({ factures, onDelete, onEdit }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Client</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {factures.map((facture) => (
          <tr key={facture._id}>
            <td>{facture.clientId}</td>
            <td>{facture.amount}</td>
            <td>{facture.date}</td>
            <td>{facture.status}</td>
            <td>
              <button
                onClick={() => onEdit(facture)}
                className="mr-2 bg-blue-500 text-white rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(facture._id)}
                className="bg-red-500 text-white rounded"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
