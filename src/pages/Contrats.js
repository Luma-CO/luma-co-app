import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

ChartJS.register(Tooltip, ArcElement, Legend);

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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

  const generatePDF = (contract) => {
    const doc = new jsPDF();
    doc.text("Contrat de Travail", 20, 20);
    doc.autoTable({
      startY: 30,
      head: [["Employé", "Type", "Salaire Brut", "Salaire Net"]],
      body: [
        [
          contract.employee_name,
          contract.contract_type,
          `${contract.salary} €`,
          `${contract.net_salary} €`,
        ],
      ],
    });
    doc.save(`Contrat_${contract.employee_name}.pdf`);
  };

  const filteredContracts = contracts.filter((contract) =>
    contract.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 ml-64 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Contrats</h1>

      <input
        type="text"
        placeholder="Rechercher un contrat..."
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Répartition des Contrats
          </h2>
          <Pie
            data={{
              labels: ["CDI", "CDD", "Freelance", "Stage"],
              datasets: [
                {
                  data: [
                    contracts.filter((c) => c.contract_type === "CDI").length,
                    contracts.filter((c) => c.contract_type === "CDD").length,
                    contracts.filter((c) => c.contract_type === "Freelance")
                      .length,
                    contracts.filter((c) => c.contract_type === "Stage").length,
                  ],
                  backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Liste des Contrats
          </h2>
          {loading ? (
            <p className="text-gray-500">Chargement...</p>
          ) : (
            <table className="table-auto w-full text-left text-gray-700">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-4 py-2">Employé</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Salaire Brut</th>
                  <th className="px-4 py-2">Salaire Net</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract) => (
                  <tr key={contract._id} className="hover:bg-gray-200">
                    <td className="px-4 py-2">{contract.employee_name}</td>
                    <td className="px-4 py-2">{contract.contract_type}</td>
                    <td className="px-4 py-2">{contract.salary} €</td>
                    <td className="px-4 py-2">{contract.net_salary} €</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => generatePDF(contract)}
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        📄 PDF
                      </button>
                      <button
                        onClick={() =>
                          alert(
                            "Signature électronique en cours de développement"
                          )
                        }
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        ✍️ Signature
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="mt-6 text-right">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          + Créer un Contrat
        </button>
      </div>
    </div>
  );
}
