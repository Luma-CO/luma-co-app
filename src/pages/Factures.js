import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import FactureForm from "../components/FactureForm";
import FactureTable from "../components/FactureTable";
import { FaEdit, FaTrash, FaFileInvoice } from "react-icons/fa";

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

  const handleEdit = (facture) => {
    setSelectedFacture(facture);
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-white space-y-6">
      <motion.h1
        className="text-3xl font-bold text-green-600 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaFileInvoice className="mr-2" /> Gestion des Factures
      </motion.h1>

      <div className="bg-gray-100 p-6 rounded-xl shadow-lg space-y-6">
        <FactureForm
          onCreate={handleCreate}
          selectedFacture={selectedFacture}
          onCancel={() => setSelectedFacture(null)}
        />
      </div>

      <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Liste des factures</h2>
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table className="min-w-full bg-white table-auto rounded-lg shadow">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">N° Facture</th>
                <th className="px-4 py-2 text-left">Client</th>
                <th className="px-4 py-2 text-left">Montant</th>
                <th className="px-4 py-2 text-left">Statut</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((facture) => (
                <tr key={facture.id} className="border-b">
                  <td className="px-4 py-2">{facture.numero}</td>
                  <td className="px-4 py-2">{facture.client}</td>
                  <td className="px-4 py-2">{facture.montant} €</td>
                  <td className="px-4 py-2">
                    <span
                      className={`${
                        facture.statut === "Payée"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-semibold`}
                    >
                      {facture.statut}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(facture)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(facture.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
