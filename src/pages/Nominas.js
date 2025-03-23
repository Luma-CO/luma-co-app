import React, { useState, useEffect } from "react";
import {
  CheckCircleIcon,
  UserIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Nominas = () => {
  const [nominas, setNominas] = useState([]);
  const [contrats, setContrats] = useState([]);
  const [newNomina, setNewNomina] = useState({
    employeeId: "",
    amount: 0,
    date: "",
    isPartTime: false,
  });

  const [calculatedNomina, setCalculatedNomina] = useState({
    grossSalary: 0,
    irpf: 0,
    seguridadSocial: 0,
    desempleo: 0,
    netSalary: 0,
  });

  const exampleContrats = [
    {
      employeeId: "1",
      employeeName: "John Doe",
      baseSalary: 3000,
      isPartTime: false,
      partTimeFactor: 0.5,
    },
    {
      employeeId: "2",
      employeeName: "Jane Smith",
      baseSalary: 1500,
      isPartTime: true,
      partTimeFactor: 0.5,
    },
  ];

  const exampleNominas = [
    {
      id: "1",
      employeeId: "1",
      amount: 3000,
      date: "2025-03-01",
    },
    {
      id: "2",
      employeeId: "2",
      amount: 1500,
      date: "2025-03-01",
    },
  ];

  useEffect(() => {
    setContrats(exampleContrats);
    setNominas(exampleNominas);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNomina.employeeId || !newNomina.amount || !newNomina.date) {
      alert("Tous les champs doivent être remplis.");
      return;
    }
    setNominas([...nominas, { id: String(nominas.length + 1), ...newNomina }]);
    alert("Fiche de paie ajoutée !");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 ml-64 min-h-screen bg-white space-y-6"
    >
      <h1 className="text-3xl font-bold text-green-600 flex items-center gap-2">
        <UserIcon className="w-8 h-8 text-green-600" /> Gestion des Nominas
      </h1>
      <div className="bg-gray-100 p-6 rounded-xl shadow space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-gray-600" /> Sélectionner un
              employé :
            </label>
            <select
              onChange={(e) =>
                setNewNomina({ ...newNomina, employeeId: e.target.value })
              }
              value={newNomina.employeeId}
              className="w-full p-2 border rounded"
            >
              <option value="">Choisir un employé</option>
              {contrats.map((contrat) => (
                <option key={contrat.employeeId} value={contrat.employeeId}>
                  {contrat.employeeName}
                </option>
              ))}
            </select>
          </div>
          <input
            type="number"
            placeholder="Montant Brut"
            className="w-full p-2 border rounded"
          />
          <input type="date" className="w-full p-2 border rounded" />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5" /> Ajouter
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Nominas;
