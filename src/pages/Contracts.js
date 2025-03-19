import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService.js"; // Service pour interagir avec le backend

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [newContract, setNewContract] = useState({
    employee_name: "",
    start_date: "",
    end_date: "",
    contract_type: "",
    salary: 0,
    ipf: 0,
    social_security: 0,
    unemployment: 0,
  });

  // Charger les contrats existants depuis l'API
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await ApiService.getContracts();
        setContracts(res);
      } catch (err) {
        console.error("Error fetching contracts:", err);
      }
    };
    fetchContracts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContract({
      ...newContract,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ApiService.addContract(newContract);
      setContracts([...contracts, res]);
      setNewContract({
        employee_name: "",
        start_date: "",
        end_date: "",
        contract_type: "",
        salary: 0,
        ipf: 0,
        social_security: 0,
        unemployment: 0,
      });
    } catch (err) {
      console.error("Error adding contract:", err);
    }
  };

  return (
    <div className="container">
      <h2 className="text-3xl mb-6">Contrats de Travail</h2>
      <div className="contract-list">
        <h3 className="text-xl mb-4">Liste des contrats</h3>
        <table className="table-auto w-full text-sm text-white">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type de Contrat</th>
              <th>Salaire Brut</th>
              <th>Salaire Net</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.employee_name}>
                <td>{contract.employee_name}</td>
                <td>{contract.contract_type}</td>
                <td>{contract.salary}€</td>
                <td>{contract.net_salary}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulaire d'ajout de contrat */}
      <div className="add-contract-form mt-8">
        <h3 className="text-xl mb-4">Ajouter un Nouveau Contrat</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="employee_name"
            placeholder="Nom de l'employé"
            value={newContract.employee_name}
            onChange={handleChange}
            className="p-2 w-full"
          />
          <input
            type="date"
            name="start_date"
            value={newContract.start_date}
            onChange={handleChange}
            className="p-2 w-full"
          />
          <input
            type="date"
            name="end_date"
            value={newContract.end_date}
            onChange={handleChange}
            className="p-2 w-full"
          />
          <input
            type="text"
            name="contract_type"
            placeholder="Type de contrat"
            value={newContract.contract_type}
            onChange={handleChange}
            className="p-2 w-full"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salaire brut"
            value={newContract.salary}
            onChange={handleChange}
            className="p-2 w-full"
          />
          <input
            type="number"
            name="ipf"
            placeholder="IPF"
            value={newContract.ipf}
            onChange={handleChange}
            className="p-2 w-full"
          />
          <input
            type="number"
            name="social_security"
            placeholder="Sécurité Sociale"
            value={newContract.social_security}
            onChange={handleChange}
            className="p-2 w-full"
          />
          <input
            type="number"
            name="unemployment"
            placeholder="Chômage"
            value={newContract.unemployment}
            onChange={handleChange}
            className="p-2 w-full"
          />
          <button type="submit" className="bg-green-500 p-2 text-white w-full">
            Ajouter le contrat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contracts;
