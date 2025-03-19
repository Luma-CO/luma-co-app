// src/pages/Alerts.js
import React, { useState } from "react";

const Alerts = () => {
  const [threshold, setThreshold] = useState(80);
  const [alertStatus, setAlertStatus] = useState("");

  const handleSaveThreshold = () => {
    // Ici on pourrait l'envoyer au backend plus tard pour stockage
    setAlertStatus(`Seuil d'alerte défini à ${threshold}% ✅`);
  };

  const handleTestAlert = () => {
    fetch("http://localhost:5000/send_test_alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Test alerte Luma CO 🚨" }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.msg))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Configuration des Alertes</h1>
      <div className="bg-gray-800 p-6 rounded-xl space-y-4">
        <label className="block mb-2">Seuil de charge de travail (%)</label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          min="0"
          max="100"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleSaveThreshold}
          className="w-full bg-green-600 hover:bg-green-400 p-2 rounded"
        >
          Sauvegarder Seuil 🚦
        </button>
        {alertStatus && <p className="mt-2 text-green-400">{alertStatus}</p>}

        <hr className="my-4 border-gray-600" />

        <button
          onClick={handleTestAlert}
          className="w-full bg-red-600 hover:bg-red-400 p-2 rounded"
        >
          Envoyer Alerte Test 🚨
        </button>
      </div>
    </div>
  );
};

export default Alerts;
