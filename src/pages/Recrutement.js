import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { toast } from "react-toastify";
import RecrutementForm from "../components/RecrutementForm";
import CandidatTable from "../components/CandidatTable";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Recrutement() {
  const [candidats, setCandidats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    fetchCandidats();
  }, []);

  const fetchCandidats = async () => {
    try {
      const data = await ApiService.getCandidats();
      setCandidats(data);
    } catch (err) {
      toast.error("Erreur lors de la récupération des candidats");
    }
  };

  const handleCreate = async (candidat) => {
    try {
      await ApiService.createCandidat(candidat);
      fetchCandidats();
      toast.success("✅ Candidat ajouté avec succès !");
    } catch (err) {
      toast.error("Erreur lors de l'ajout du candidat");
    }
  };

  const filteredCandidats = candidats.filter((candidat) => {
    const searchMatch =
      candidat.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidat.email.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filter === "Tous" || candidat.statut === filter;
    return searchMatch && statusMatch;
  });

  return (
    <div className="p-8 ml-64 min-h-screen bg-gray-50 space-y-8">
      <h1 className="text-3xl font-semibold text-green-600">
        Gestion des Candidats
      </h1>
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            className="w-64 p-2 border rounded-md focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex items-center space-x-2 p-2 border rounded-md bg-gray-100 hover:bg-gray-200"
            onClick={() => setFilter(filter === "Tous" ? "Entretien" : "Tous")}
          >
            <FunnelIcon className="w-5 h-5 text-gray-600" />
            <span>
              {filter === "Tous" ? "Filtrer par entretien" : "Afficher tout"}
            </span>
          </button>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          <span>Rechercher</span>
        </button>
      </div>
      <div className="bg-white shadow-lg p-6 rounded-xl">
        <RecrutementForm onCreate={handleCreate} />
      </div>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <CandidatTable candidats={filteredCandidats} />
      </div>
    </div>
  );
}
