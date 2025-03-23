import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";
import CongesForm from "../components/CongesForm";
import CongesTable from "../components/CongesTable";
import { motion } from "framer-motion";
import { FaUmbrellaBeach } from "react-icons/fa";

export default function Conges() {
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchConges();
  }, []);

  const fetchConges = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getConges();
      setConges(data);
    } catch (err) {
      console.error("Erreur récupération des congés", err);
      toast.error("Erreur lors de la récupération des congés");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (conge) => {
    try {
      await ApiService.createConge(conge);
      fetchConges();
      toast.success("Demande de congé soumise avec succès !");
    } catch (err) {
      console.error("Erreur soumission demande de congé", err);
      toast.error("Erreur lors de la soumission de la demande");
    }
  };

  // Filtrage intelligent des congés
  const filteredConges = conges.filter((conge) =>
    conge.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 ml-64 min-h-screen bg-gray-100">
      <motion.h1
        className="text-4xl font-bold text-green-600 mb-10 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FaUmbrellaBeach /> Gestion des Congés
      </motion.h1>

      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un employé..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire de demande */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Nouvelle Demande
          </h2>
          <CongesForm onCreate={handleCreate} />
        </motion.div>

        {/* Historique des congés */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Historique des Congés
          </h2>
          {loading ? (
            <div className="text-center py-10">
              <span className="text-green-600 text-lg animate-pulse">
                Chargement...
              </span>
            </div>
          ) : (
            <CongesTable conges={filteredConges} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
