import React from "react";

export default function DevisTable({ devis }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Client</th>
          <th>Montant</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {devis.map((devisItem) => (
          <tr key={devisItem._id}>
            <td>{devisItem.clientId}</td>
            <td>{devisItem.amount}</td>
            <td>{devisItem.date}</td>
            <td>{devisItem.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
