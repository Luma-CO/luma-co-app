// src/pages/Reports.js
import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService.js";

const Reports = () => {
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    try {
      const res = await ApiService.generateReport(); // Backend call to generate the report
      alert("PDF généré avec succès !");
    } catch (err) {
      alert("Erreur lors de la génération du PDF.");
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-4 flex flex-col justify-between">
        {/* Sidebar content */}
      </aside>

      {/* Reports Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Rapports</h1>

        <div className="bg-gray-800 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Générer un Rapport PDF</h2>
          <button
            onClick={handleGenerateReport}
            className="p-2 bg-green-500 rounded"
          >
            Générer le Rapport PDF
          </button>
        </div>

        {/* Here you can also add a list of historical reports */}
      </main>
    </div>
  );
};

export default Reports;
