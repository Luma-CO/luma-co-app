import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Plot from "react-plotly.js";
import ApiService from "../services/ApiService.js";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [data, setData] = useState({ labels: [], values: [] });
  const [payslipData, setPayslipData] = useState({
    salaireBrut: 3000,
    salaireNet: 0,
    cotisationSecuriteSociale: 0,
    cotisationChomage: 0,
    cotisationFormation: 0,
    irpf: 0,
  });
  const [alerts, setAlerts] = useState([]);
  const [workSummary, setWorkSummary] = useState({
    contracts: 0,
    payslips: 0,
    employees: 0,
    clients: 0,
  });

  const navigate = useNavigate();

  // Fonction pour récupérer les données du tableau de bord et de la fiche de paie
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des données du tableau de bord
        const res = await ApiService.getDashboardData();
        setData(res); // Assumes the response has 'labels' and 'values' as keys

        // Calcul de la fiche de paie
        const payslip = await ApiService.generatePayslip({
          salaire_brut: payslipData.salaireBrut,
        });
        setPayslipData(payslip);

        // Récupération des alertes récentes
        const alertResponse = await ApiService.getRecentAlerts();
        setAlerts(alertResponse);

        // Récupération du résumé du travail en cours
        const workSummaryResponse = await ApiService.getWorkSummary();
        setWorkSummary(workSummaryResponse);
      } catch (err) {
        navigate("/login"); // Si token invalide, redirige vers la page de login
      }
    };
    fetchData();
  }, [navigate, payslipData.salaireBrut]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-green-500">Luma Co</h2>
          <nav className="space-y-6">
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
            >
              <span>🏠</span> <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
            >
              <span>⚙️</span> <span>Services</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
            >
              <span>📄</span> <span>Rapports</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
            >
              <span>🚨</span> <span>Alertes</span>
            </a>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
        >
          <span>🔓</span> <span>Déconnexion</span>
        </button>
      </aside>

      {/* Dashboard Content */}
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Tableau de bord - Charge de Travail */}
          <div className="bg-gray-800 p-6 rounded-2xl mb-6">
            <h2 className="text-xl mb-4">Charge de Travail</h2>
            <Plot
              data={[
                {
                  type: "bar",
                  x: data.labels,
                  y: data.values,
                  marker: { color: "green" },
                },
              ]}
              layout={{
                width: 600,
                height: 400,
                paper_bgcolor: "#1f2937",
                plot_bgcolor: "#1f2937",
                font: { color: "white" },
                title: "Évolution mensuelle",
              }}
            />
          </div>

          {/* Fiche de paie - Détails */}
          <div className="bg-gray-800 p-6 rounded-2xl mb-6">
            <h2 className="text-xl mb-4">Détails de la Fiche de Paie</h2>
            <div className="text-lg">
              <p>
                <strong>Salaire Brut :</strong> {payslipData.salaireBrut} €
              </p>
              <p>
                <strong>Salaire Net :</strong> {payslipData.salaireNet} €
              </p>
              <p>
                <strong>Cotisation Sécurité Sociale :</strong>{" "}
                {payslipData.cotisationSecuriteSociale} €
              </p>
              <p>
                <strong>Cotisation Chômage :</strong>{" "}
                {payslipData.cotisationChomage} €
              </p>
              <p>
                <strong>Cotisation Formation Professionnelle :</strong>{" "}
                {payslipData.cotisationFormation} €
              </p>
              <p>
                <strong>
                  IRPF (Impôt sur le revenu des personnes physiques) :
                </strong>{" "}
                {payslipData.irpf} €
              </p>
            </div>
          </div>

          {/* Alertes récentes */}
          <div className="bg-gray-800 p-6 rounded-2xl mb-6">
            <h2 className="text-xl mb-4">Alertes Récentes</h2>
            <ul className="space-y-3">
              {alerts.map((alert, index) => (
                <li key={index} className="text-white">
                  {alert.message}
                </li>
              ))}
            </ul>
          </div>

          {/* Résumé du travail en cours */}
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl mb-4">Résumé du Travail en Cours</h2>
            <div className="text-lg">
              <p>
                <strong>Contrats en cours :</strong> {workSummary.contracts}
              </p>
              <p>
                <strong>Fiches de Paie en cours :</strong>{" "}
                {workSummary.payslips}
              </p>
              <p>
                <strong>Employés :</strong> {workSummary.employees}
              </p>
              <p>
                <strong>Clients :</strong> {workSummary.clients}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
