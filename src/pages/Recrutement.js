import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";
import RecrutementForm from "../components/RecrutementForm";
import CandidatTable from "../components/CandidatTable";

export default function Recrutement() {
  const [candidats, setCandidats] = useState([]);

  useEffect(() => {
    fetchCandidats();
  }, []);

  const fetchCandidats = async () => {
    try {
      const data = await ApiService.getCandidats();
      setCandidats(data);
    } catch (err) {
      console.error("Erreur récupération des candidats", err);
      toast.error("Erreur lors de la récupération des candidats");
    }
  };

  const handleCreate = async (candidat) => {
    try {
      await ApiService.createCandidat(candidat);
      fetchCandidats();
      toast.success("Candidat ajouté avec succès !");
    } catch (err) {
      console.error("Erreur ajout candidat", err);
      toast.error("Erreur lors de l'ajout du candidat");
    }
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-gray-50 space-y-8">
      <h1 className="text-3xl font-semibold text-green-600">
        Gestion des Candidats
      </h1>

      {/* Formulaire d'ajout de candidat */}
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <RecrutementForm onCreate={handleCreate} />
      </div>

      {/* Tableau des candidats */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <CandidatTable candidats={candidats} />
      </div>
    </div>
  );
}
