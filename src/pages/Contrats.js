import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContract, setNewContract] = useState({
    employeeId: "",
    start_date: "",
    end_date: "",
    contract_type: "",
    salary: 0,
    ipf: 0,
    social_security: 0,
    unemployment: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contractsData, employeesData] = await Promise.all([
        ApiService.getContracts(),
        ApiService.getEmployees(),
      ]);
      setContracts(contractsData);
      setEmployees(employeesData);
    } catch (err) {
      console.error("Erreur lors du chargement des données :", err);
      toast.error("Erreur de chargement des contrats ou employés");
    } finally {
      setLoading(false);
    }
  };

  const calculateIRPF = (salary) => {
    let irpfRate = 0;
    if (salary <= 12450) irpfRate = 0.19;
    else if (salary <= 20200) irpfRate = 0.24;
    else if (salary <= 35200) irpfRate = 0.3;
    else irpfRate = 0.37;
    return salary * irpfRate;
  };

  const calculateSeguridadSocial = (salary) => salary * 0.062;
  const calculateDesempleo = (salary) => salary * 0.0155;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContract({ ...newContract, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newContract.employeeId ||
      !newContract.salary ||
      !newContract.start_date ||
      !newContract.end_date
    ) {
      toast.error("Tous les champs doivent être remplis !");
      return;
    }
    const salary = parseFloat(newContract.salary);
    const ipf = calculateIRPF(salary);
    const social_security = calculateSeguridadSocial(salary);
    const unemployment = calculateDesempleo(salary);
    const net_salary = salary - ipf - social_security - unemployment;

    const contractData = {
      ...newContract,
      salary,
      ipf,
      social_security,
      unemployment,
      net_salary,
    };

    try {
      const res = await ApiService.addContract(contractData);
      setContracts([...contracts, res]);
      toast.success("Contrat ajouté !");
      setNewContract({
        employeeId: "",
        start_date: "",
        end_date: "",
        contract_type: "",
        salary: 0,
        ipf: 0,
        social_security: 0,
        unemployment: 0,
      });
    } catch (err) {
      console.error("Erreur ajout contrat:", err);
      toast.error("Erreur lors de l'ajout du contrat");
    }
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Contrats de Travail
      </h1>
      <div className="space-y-8">
        {/* Liste des contrats */}
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Liste des contrats</h2>
          {loading ? (
            <div className="text-center py-10">
              <span className="text-green-600 text-lg animate-pulse">
                Chargement...
              </span>
            </div>
          ) : (
            <table className="table-auto w-full text-sm text-left text-gray-700">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-4 py-2">Employé</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Salaire Brut</th>
                  <th className="px-4 py-2">Salaire Net</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr key={contract._id} className="hover:bg-gray-200">
                    <td className="px-4 py-2">{contract.employee_name}</td>
                    <td className="px-4 py-2">{contract.contract_type}</td>
                    <td className="px-4 py-2">{contract.salary} €</td>
                    <td className="px-4 py-2">{contract.net_salary} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Formulaire */}
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Ajouter un contrat</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="employeeId"
              value={newContract.employeeId}
              onChange={handleChange}
              className="p-2 w-full rounded"
            >
              <option value="">Sélectionner un employé</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <div className="flex space-x-4">
              <input
                type="date"
                name="start_date"
                value={newContract.start_date}
                onChange={handleChange}
                className="p-2 w-full rounded"
              />
              <input
                type="date"
                name="end_date"
                value={newContract.end_date}
                onChange={handleChange}
                className="p-2 w-full rounded"
              />
            </div>
            <input
              type="text"
              name="contract_type"
              placeholder="Type de contrat"
              value={newContract.contract_type}
              onChange={handleChange}
              className="p-2 w-full rounded"
            />
            <input
              type="number"
              name="salary"
              placeholder="Salaire brut"
              value={newContract.salary}
              onChange={handleChange}
              className="p-2 w-full rounded"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 w-full rounded"
            >
              Ajouter le contrat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
