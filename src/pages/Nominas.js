import React, { useState, useEffect } from "react";

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

  const calculateIRPF = (amount, employeeId) => {
    const contrat = contrats.find(
      (contrat) => contrat.employeeId === employeeId
    );
    let irpfRate = 0;
    if (amount <= 12450) irpfRate = 0.19;
    else if (amount <= 20200) irpfRate = 0.24;
    else if (amount <= 35200) irpfRate = 0.3;
    else irpfRate = 0.37;
    if (contrat?.isPartTime) amount *= contrat.partTimeFactor;
    return amount * irpfRate;
  };

  const calculateSeguridadSocial = (amount, employeeId) => {
    const contrat = contrats.find(
      (contrat) => contrat.employeeId === employeeId
    );
    if (contrat?.isPartTime) amount *= contrat.partTimeFactor;
    return amount * 0.062;
  };

  const calculateDesempleo = (amount, employeeId) => {
    const contrat = contrats.find(
      (contrat) => contrat.employeeId === employeeId
    );
    if (contrat?.isPartTime) amount *= contrat.partTimeFactor;
    return amount * 0.0155;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNomina.employeeId || !newNomina.amount || !newNomina.date) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    const { employeeId, amount } = newNomina;
    const irpf = calculateIRPF(amount, employeeId);
    const seguridadSocial = calculateSeguridadSocial(amount, employeeId);
    const desempleo = calculateDesempleo(amount, employeeId);
    const netSalary = amount - irpf - seguridadSocial - desempleo;

    setCalculatedNomina({
      grossSalary: amount,
      irpf,
      seguridadSocial,
      desempleo,
      netSalary,
    });

    setNominas([
      ...nominas,
      {
        id: String(nominas.length + 1),
        ...newNomina,
        amount: netSalary,
      },
    ]);
    alert("Fiche de paie ajoutée !");
  };

  const handleEmployeeChange = (e) => {
    const selectedEmployeeId = e.target.value;
    const selectedContrat = contrats.find(
      (contrat) => contrat.employeeId === selectedEmployeeId
    );
    if (selectedContrat) {
      setNewNomina({
        ...newNomina,
        employeeId: selectedEmployeeId,
        amount: selectedContrat.baseSalary,
        isPartTime: selectedContrat.isPartTime,
      });
    } else {
      setNewNomina({
        ...newNomina,
        employeeId: selectedEmployeeId,
        amount: 0,
        isPartTime: false,
      });
    }
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-white space-y-6">
      <h1 className="text-3xl font-bold text-green-600">Gestion des Nominas</h1>
      <div className="bg-gray-100 p-6 rounded-xl shadow space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium">
              Sélectionner un employé :
            </label>
            <select
              onChange={handleEmployeeChange}
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
            value={newNomina.amount}
            onChange={(e) =>
              setNewNomina({ ...newNomina, amount: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={newNomina.date}
            onChange={(e) =>
              setNewNomina({ ...newNomina, date: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newNomina.isPartTime}
              onChange={(e) =>
                setNewNomina({ ...newNomina, isPartTime: e.target.checked })
              }
            />
            <label>Employé à temps partiel</label>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ajouter
          </button>
        </form>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Fiches de paie</h3>
          <ul className="space-y-2">
            {nominas.map((nomina) => (
              <li key={nomina.id} className="p-2 bg-white rounded shadow">
                {nomina.employeeId} - {nomina.amount} € - {nomina.date}
              </li>
            ))}
          </ul>
        </div>

        {calculatedNomina.grossSalary > 0 && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">Détails du calcul</h3>
            <p>Salaire Brut: {calculatedNomina.grossSalary} €</p>
            <p>IRPF: {calculatedNomina.irpf.toFixed(2)} €</p>
            <p>
              Seguridad Social: {calculatedNomina.seguridadSocial.toFixed(2)} €
            </p>
            <p>Desempleo: {calculatedNomina.desempleo.toFixed(2)} €</p>
            <p>Salaire Net: {calculatedNomina.netSalary.toFixed(2)} €</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nominas;
