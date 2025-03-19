// src/pages/Services.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService.js";

const Services = () => {
  const [contract, setContract] = useState({
    clientName: "",
    startDate: "",
    endDate: "",
    amount: "",
  });
  const [payroll, setPayroll] = useState({
    employeeName: "",
    amount: "",
    paymentDate: "",
  });
  const navigate = useNavigate();

  const handleContractChange = (e) => {
    setContract({
      ...contract,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayrollChange = (e) => {
    setPayroll({
      ...payroll,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitContract = async (e) => {
    e.preventDefault();
    try {
      await ApiService.createContract(contract); // ApiService to handle backend request
      alert("Contrat créé avec succès !");
    } catch (err) {
      alert("Erreur lors de la création du contrat.");
    }
  };

  const handleSubmitPayroll = async (e) => {
    e.preventDefault();
    try {
      await ApiService.createPayroll(payroll); // ApiService to handle payroll request
      alert("Fiche de paie générée !");
    } catch (err) {
      alert("Erreur lors de la génération de la fiche de paie.");
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-4 flex flex-col justify-between">
        {/* Sidebar content */}
      </aside>

      {/* Services Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Services</h1>

        {/* Form for Contract */}
        <div className="bg-gray-800 p-6 rounded-2xl mb-6">
          <h2 className="text-xl mb-4">Créer un Contrat</h2>
          <form onSubmit={handleSubmitContract}>
            <input
              type="text"
              name="clientName"
              placeholder="Nom du client"
              value={contract.clientName}
              onChange={handleContractChange}
              className="mb-4 p-2 rounded"
            />
            <input
              type="date"
              name="startDate"
              value={contract.startDate}
              onChange={handleContractChange}
              className="mb-4 p-2 rounded"
            />
            <input
              type="date"
              name="endDate"
              value={contract.endDate}
              onChange={handleContractChange}
              className="mb-4 p-2 rounded"
            />
            <input
              type="number"
              name="amount"
              placeholder="Montant"
              value={contract.amount}
              onChange={handleContractChange}
              className="mb-4 p-2 rounded"
            />
            <button type="submit" className="p-2 bg-green-500 rounded">
              Créer le Contrat
            </button>
          </form>
        </div>

        {/* Form for Payroll */}
        <div className="bg-gray-800 p-6 rounded-2xl">
          <h2 className="text-xl mb-4">Générer une Fiche de Paie</h2>
          <form onSubmit={handleSubmitPayroll}>
            <input
              type="text"
              name="employeeName"
              placeholder="Nom de l'employé"
              value={payroll.employeeName}
              onChange={handlePayrollChange}
              className="mb-4 p-2 rounded"
            />
            <input
              type="number"
              name="amount"
              placeholder="Montant"
              value={payroll.amount}
              onChange={handlePayrollChange}
              className="mb-4 p-2 rounded"
            />
            <input
              type="date"
              name="paymentDate"
              value={payroll.paymentDate}
              onChange={handlePayrollChange}
              className="mb-4 p-2 rounded"
            />
            <button type="submit" className="p-2 bg-green-500 rounded">
              Générer la Fiche de Paie
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Services;
