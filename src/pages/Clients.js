import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import ClientTable from "../components/ClientTable";
import ClientForm from "../components/ClientForm";
import { toast } from "react-toastify";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
        toast.success("Cliente modificado exitosamente");
        setSelectedClient(null);
      } else {
        await ApiService.createClient(client);
        toast.success("Cliente agregado con éxito");
      }
      fetchClients();
    } catch (err) {
      console.error("Erreur création client", err);
      toast.error("Error al agregar el cliente");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ApiService.deleteClient(id);
      toast.success("Cliente eliminado exitosamente");
      fetchClients();
    } catch (err) {
      console.error("Erreur suppression client", err);
      toast.error("Error al eliminar el cliente");
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 ml-64 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-[#006400] mb-10 animate-fadeIn">
        Gestión de Clientes
      </h1>

      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar un cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-full border rounded-xl shadow-md focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slideUp">
        {/* Formulaire */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-black mb-4">
            {selectedClient ? "Modificar Cliente" : "Añadir Cliente"}
          </h2>
          <ClientForm
            onCreate={handleCreate}
            selectedClient={selectedClient}
            clearSelected={() => setSelectedClient(null)}
          />
        </div>
        {/* Table */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-black mb-4">
            Lista de Clientes
          </h2>
          {loading ? (
            <div className="text-center py-10">
              <span className="text-[#006400] text-lg animate-pulse">
                Cargando...
              </span>
            </div>
          ) : (
            <ClientTable
              clients={filteredClients}
              onDelete={handleDelete}
              onEdit={(client) => setSelectedClient(client)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
