import { useState, useEffect } from "react";

export default function FactureForm({ onCreate, selectedFacture, clients }) {
  const [form, setForm] = useState({
    clientId: "",
    amount: "",
    date: "",
    status: "En attente",
  });

  useEffect(() => {
    if (selectedFacture) {
      setForm(selectedFacture);
    } else {
      resetForm();
    }
  }, [selectedFacture]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      clientId: "",
      amount: "",
      date: "",
      status: "En attente",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border rounded-lg shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold text-green-600 mb-6">
        {selectedFacture ? "Modifier la Facture" : "Ajouter une Facture"}
      </h2>

      <div className="space-y-4">
        {/* Sélection du client */}
        <select
          name="clientId"
          value={form.clientId}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Sélectionner un client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Montant (€)"
          className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="En attente">En attente</option>
          <option value="Payée">Payée</option>
          <option value="Annulée">Annulée</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {selectedFacture ? "Modifier" : "Ajouter"}
        </button>
        {selectedFacture && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
