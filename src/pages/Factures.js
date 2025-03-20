import { useEffect, useState } from "react";
import ApiService from "../service/ApiService"; // ApiService pour interagir avec l'API
import { toast } from "react-toastify";
import FactureForm from "../components/FactureForm";
import FactureTable from "../components/FactureTable";

export default function Factures() {
  const [factures, setFactures] = useState([]);
  const [selectedFacture, setSelectedFacture] = useState(null);

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = async () => {
    try {
      const data = await ApiService.getFactures();
      setFactures(data);
    } catch (err) {
      console.error("Erreur récupération des factures", err);
      toast.error("Erreur lors de la récupération des factures");
    }
  };

  const handleCreate = async (facture) => {
    try {
      await ApiService.createFacture(facture);
      fetchFactures();
      toast.success("Facture ajoutée avec succès !");
    } catch (err) {
      console.error("Erreur création facture", err);
      toast.error("Erreur lors de la création de la facture");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ApiService.deleteFacture(id);
      fetchFactures();
      toast.success("Facture supprimée avec succès !");
    } catch (err) {
      console.error("Erreur suppression facture", err);
      toast.error("Erreur lors de la suppression de la facture");
    }
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-white space-y-6">
      <h1 className="text-3xl font-bold text-green-600">
        Gestion des Factures
      </h1>
      <div className="bg-gray-100 p-6 rounded-xl shadow space-y-6">
        <FactureForm
          onCreate={handleCreate}
          selectedFacture={selectedFacture}
        />
        <FactureTable
          factures={factures}
          onDelete={handleDelete}
          onEdit={setSelectedFacture}
        />
      </div>
    </div>
  );
}
