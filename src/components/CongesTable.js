import React from "react";

export default function CongesTable({ conges }) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Employé</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {conges.map((conge) => (
          <tr key={conge._id}>
            <td>{conge.employeeId}</td>
            <td>{conge.startDate}</td>
            <td>{conge.endDate}</td>
            <td>{conge.type}</td>
            <td>{conge.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
