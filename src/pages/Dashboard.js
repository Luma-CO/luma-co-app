import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService.js";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [workSummary, setWorkSummary] = useState({
    pendingInvoices: [],
    ongoingQuotes: [],
    ongoingRecruitments: [],
    pendingHolidays: [],
  });

  const navigate = useNavigate();

  // Récupérer les données du tableau de bord
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.getDashboardData();
        setWorkSummary(res);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchData();

    // Déconnexion automatique après 1 heure d'inactivité
    const timeout = setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
    }, 3600000);

    return () => clearTimeout(timeout); // Nettoyer le timeout
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-black p-4 flex flex-col fixed h-full">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-green-600">Luma Co</h2>
          <nav className="space-y-6">
            <a
              href="/dashboard"
              className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer"
            >
              <span>🏠</span> <span>Dashboard</span>
            </a>
            <a
              href="/services"
              className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer"
            >
              <span>⚙️</span> <span>Services</span>
            </a>
            <a
              href="/invoices"
              className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer"
            >
              <span>💼</span> <span>Factures</span>
            </a>
            <a
              href="/quotes"
              className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer"
            >
              <span>💵</span> <span>Devis</span>
            </a>
            <a
              href="/clients"
              className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer"
            >
              <span>👥</span> <span>Clients</span>
            </a>
            <a
              href="/contracts"
              className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer"
            >
              <span>📜</span> <span>Contrats</span>
            </a>
            <a
              href="/holidays"
              className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer"
            >
              <span>🌴</span> <span>Congés</span>
            </a>
            <a
              href="/chat"
              className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer"
            >
              <span>💬</span> <span>Chats</span>
            </a>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-white hover:text-green-400 cursor-pointer mt-auto"
        >
          <span>🔓</span> <span>Déconnexion</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-green-600 mb-6">
            Tableau de Bord
          </h1>

          {/* Tableau Analytique */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl text-green-600 mb-4">
                Factures en Attente
              </h2>
              <table className="table-auto w-full text-sm text-white">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Échéance</th>
                  </tr>
                </thead>
                <tbody>
                  {workSummary.pendingInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.id}</td>
                      <td>{invoice.clientName}</td>
                      <td>{invoice.amount}€</td>
                      <td>{invoice.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl text-green-600 mb-4">Devis en Cours</h2>
              <table className="table-auto w-full text-sm text-white">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Montant</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {workSummary.ongoingQuotes.map((quote) => (
                    <tr key={quote.id}>
                      <td>{quote.id}</td>
                      <td>{quote.clientName}</td>
                      <td>{quote.amount}€</td>
                      <td>{quote.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl text-green-600 mb-4">
                Recrutements en Cours
              </h2>
              <table className="table-auto w-full text-sm text-white">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Poste</th>
                    <th>Candidat</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {workSummary.ongoingRecruitments.map((recruitment) => (
                    <tr key={recruitment.id}>
                      <td>{recruitment.id}</td>
                      <td>{recruitment.position}</td>
                      <td>{recruitment.candidate}</td>
                      <td>{recruitment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <h2 className="text-xl text-green-600 mb-4">
                Demandes de Congés en Cours
              </h2>
              <table className="table-auto w-full text-sm text-white">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Employé</th>
                    <th>Type de Congé</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {workSummary.pendingHolidays.map((holiday) => (
                    <tr key={holiday.id}>
                      <td>{holiday.id}</td>
                      <td>{holiday.employeeName}</td>
                      <td>{holiday.type}</td>
                      <td>{holiday.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
