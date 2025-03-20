import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";
import DevisForm from "../components/DevisForm";
import DevisTable from "../components/DevisTable";

export default function Devis() {
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevis();
  }, []);

  const fetchDevis = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getDevis();
      setDevis(data);
    } catch (err) {
      console.error("Erreur récupération des devis", err);
      toast.error("Erreur lors de la récupération des devis");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newDevis) => {
    try {
      await ApiService.createDevis(newDevis);
      fetchDevis();
      toast.success("Devis créé avec succès !");
    } catch (err) {
      console.error("Erreur création devis", err);
      toast.error("Erreur lors de la création du devis");
    }
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Gestion des Devis
      </h1>

      {loading ? (
        <div className="text-center py-10">
          <span className="text-green-600 text-lg animate-pulse">
            Chargement...
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Formulaire de création */}
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Créer un devis</h2>
            <DevisForm onCreate={handleCreate} />
          </div>

          {/* Tableau des devis */}
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Liste des devis</h2>
            <DevisTable devis={devis} />
          </div>
        </div>
      )}
    </div>
  );
}
