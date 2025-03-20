import { useState, useEffect } from "react";

export default function FactureForm({ onCreate, selectedFacture }) {
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
      setForm({
        clientId: "",
        amount: "",
        date: "",
        status: "En attente",
      });
    }
  }, [selectedFacture]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({
      clientId: "",
      amount: "",
      date: "",
      status: "En attente",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="clientId"
        value={form.clientId}
        onChange={handleChange}
        placeholder="Client ID"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Montant"
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="En attente">En attente</option>
        <option value="Payée">Payée</option>
        <option value="Annulée">Annulée</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {selectedFacture ? "Modifier la Facture" : "Ajouter la Facture"}
      </button>
    </form>
  );
}
