import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import ClientTable from "../components/ClientTable";
import ClientForm from "../components/ClientForm";
import { toast } from "react-toastify";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getClients();
      setClients(data);
    } catch (err) {
      console.error("Erreur récupération clients", err);
      toast.error("Erreur lors de la récupération des clients");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (client) => {
    try {
      if (selectedClient) {
        await ApiService.updateClient(selectedClient._id, client);
        toast.success("Client modifié !");
        setSelectedClient(null);
      } else {
        await ApiService.createClient(client);
        toast.success("Client ajouté avec succès !");
      }
      fetchClients();
    } catch (err) {
      console.error("Erreur création client", err);
      toast.error("Erreur lors de l'ajout du client");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ApiService.deleteClient(id);
      toast.success("Client supprimé !");
      fetchClients();
    } catch (err) {
      console.error("Erreur suppression client", err);
      toast.error("Erreur lors de la suppression du client");
    }
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Gestion des Clients
      </h1>
      <div className="space-y-8">
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            {selectedClient ? "Modifier un Client" : "Ajouter un Client"}
          </h2>
          <ClientForm
            onCreate={handleCreate}
            selectedClient={selectedClient}
            clearSelected={() => setSelectedClient(null)}
          />
        </div>
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Liste des Clients</h2>
          {loading ? (
            <div className="text-center py-10">
              <span className="text-green-600 text-lg animate-pulse">
                Chargement...
              </span>
            </div>
          ) : (
            <ClientTable
              clients={clients}
              onDelete={handleDelete}
              onEdit={(client) => setSelectedClient(client)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
