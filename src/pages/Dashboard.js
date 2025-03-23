import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService.js";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Title, Legend } from "chart.js";
import {
  Briefcase,
  FileText,
  Users,
  Calendar,
  FileSignature,
} from "lucide-react"; // Icônes modernes

ChartJS.register(Tooltip, ArcElement, Title, Legend);

const Dashboard = () => {
  const [workSummary, setWorkSummary] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.getDashboardData();
        setWorkSummary(res);
      } catch (err) {
        console.error("Erreur de récupération des données : ", err);
        setError("Impossible de charger les données du tableau de bord.");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const createPieChartData = (data) => {
    if (!data || data.length === 0) {
      return {
        labels: ["Aucune donnée"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#d1d5db"],
            borderColor: ["#9ca3af"],
            borderWidth: 1,
          },
        ],
      };
    }

    const total = data.length;
    const completed = data.filter((item) => item.status === "Completed").length;
    const pending = total - completed;

    return {
      labels: ["Complétés", "En attente"],
      datasets: [
        {
          data: [completed, pending],
          backgroundColor: ["#36A2EB", "#FF6384"],
          borderColor: ["#36A2EB", "#FF6384"],
          borderWidth: 1,
        },
      ],
    };
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-semibold">
        {error}
      </div>
    );
  }

  if (!workSummary) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        Chargement des données...
      </div>
    );
  }

  const categories = [
    {
      label: "Devis",
      data: workSummary.ongoingQuotes,
      icon: <FileText />,
      link: "/devis",
    },
    {
      label: "Recrutements",
      data: workSummary.ongoingRecruitments,
      icon: <Users />,
      link: "/recrutements",
    },
    {
      label: "Factures",
      data: workSummary.pendingInvoices,
      icon: <Briefcase />,
      link: "/factures",
    },
    {
      label: "Congés",
      data: workSummary.pendingHolidays,
      icon: <Calendar />,
      link: "/conges",
    },
    {
      label: "Contrats",
      data: workSummary.pendingContracts,
      icon: <FileSignature />,
      link: "/contrats",
    },
  ];

  return (
    <main className="p-8 min-h-screen bg-gray-100 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold text-green-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Tableau de Bord
      </motion.h1>

      {/* Statistiques avec icônes et clics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-6xl">
        {categories.map(({ label, data, icon, link }, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer hover:bg-green-100 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            onClick={() => setSelectedCategory(label)}
          >
            <div className="flex justify-center items-center mb-2 text-green-600 text-3xl">
              {icon}
            </div>
            <h2 className="text-lg font-semibold mb-1">{label}</h2>
            <p className="text-2xl font-bold text-gray-700">
              {data.length} {data.length > 1 ? "éléments" : "élément"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Graphiques circulaires */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
        {categories.map(({ label, data }, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">{label}</h2>
            <Pie data={createPieChartData(data)} />
          </motion.div>
        ))}
      </div>

      {/* Liste des éléments en attente */}
      {selectedCategory && (
        <motion.div
          className="mt-8 bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-green-600">
              {selectedCategory} en attente
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-red-500 font-bold"
            >
              ✖ Fermer
            </button>
          </div>
          <ul className="divide-y divide-gray-200">
            {categories
              .find((cat) => cat.label === selectedCategory)
              .data.filter((item) => item.status !== "Completed")
              .map((item, idx) => (
                <li key={idx} className="py-2 text-gray-700">
                  {item.name || `Élément ${idx + 1}`}
                </li>
              ))}
          </ul>
          {categories.find((cat) => cat.label === selectedCategory).data
            .length === 0 && (
            <p className="text-gray-500 text-center mt-2">
              Aucune donnée en attente.
            </p>
          )}
        </motion.div>
      )}
    </main>
  );
};

export default Dashboard;
