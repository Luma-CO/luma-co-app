import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";
import CongesForm from "../components/CongesForm";
import CongesTable from "../components/CongesTable";

export default function Conges() {
  const [conges, setConges] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-8 ml-64 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Gestion des Congés
      </h1>
      <div className="space-y-8">
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Nouvelle Demande</h2>
          <CongesForm onCreate={handleCreate} />
        </div>
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Historique des Congés</h2>
          {loading ? (
            <div className="text-center py-10">
              <span className="text-green-600 text-lg animate-pulse">
                Chargement...
              </span>
            </div>
          ) : (
            <CongesTable conges={conges} />
          )}
        </div>
      </div>
    </div>
  );
}
