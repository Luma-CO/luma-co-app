import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DevisForm({ clients, onCreate }) {
  const [form, setForm] = useState({
    clientId: "",
    cifNif: "", // Identifiant fiscal du client (CIF ou NIF)
    amount: "",
    date: "",
    status: "En attente",
    vatRate: 21, // TVA par défaut en Espagne
    paymentTerms: "",
    paymentMethod: "Transferencia bancaria",
  });

  // Met à jour le CIF/NIF automatiquement lorsqu'on sélectionne un client
  useEffect(() => {
    const selectedClient = clients.find((c) => c._id === form.clientId);
    if (selectedClient) {
      setForm((prevForm) => ({
        ...prevForm,
        cifNif: selectedClient.cifNif || "",
      }));
    }
  }, [form.clientId, clients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({
      clientId: "",
      cifNif: "",
      amount: "",
      date: "",
      status: "En attente",
      vatRate: 21,
      paymentTerms: "",
      paymentMethod: "Transferencia bancaria",
    });
  };

  // Calcul du montant TTC (TVA incluse)
  const calculateTotalAmount = () => {
    if (!form.amount) return "0.00";
    return (parseFloat(form.amount) * (1 + form.vatRate / 100)).toFixed(2);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-green-600 mb-4">
        Création d'un devis
      </h2>

      {/* Sélection du Client */}
      <select
        name="clientId"
        value={form.clientId}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
        required
      >
        <option value="">Sélectionner un client</option>
        {clients.map((client) => (
          <option key={client._id} value={client._id}>
            {client.name}
          </option>
        ))}
      </select>

      {/* CIF/NIF (Automatique) */}
      <input
        type="text"
        name="cifNif"
        value={form.cifNif}
        readOnly
        placeholder="CIF/NIF du client"
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
      />

      {/* Montant HT */}
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Montant HT (€)"
        className="w-full p-3 border border-gray-300 rounded-lg"
        required
      />

      {/* Date */}
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
        required
      />

      {/* Taux de TVA */}
      <div className="flex items-center justify-between">
        <label htmlFor="vatRate" className="text-sm">
          TVA (%)
        </label>
        <select
          name="vatRate"
          value={form.vatRate}
          onChange={handleChange}
          className="w-20 p-3 border border-gray-300 rounded-lg"
        >
          <option value="21">21%</option>
          <option value="10">10%</option>
          <option value="4">4%</option>
          <option value="0">0% (Exonéré)</option>
        </select>
      </div>

      {/* Montant TTC */}
      <div className="flex items-center justify-between">
        <label htmlFor="totalAmount" className="text-sm">
          Montant TTC (€)
        </label>
        <input
          type="text"
          value={calculateTotalAmount()}
          readOnly
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Conditions de paiement */}
      <textarea
        name="paymentTerms"
        value={form.paymentTerms}
        onChange={handleChange}
        placeholder="Conditions de paiement (ex : 30 jours fin de mois)"
        className="w-full p-3 border border-gray-300 rounded-lg"
        rows="3"
      />

      {/* Mode de paiement */}
      <select
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="Transferencia bancaria">Virement bancaire</option>
        <option value="Domiciliación">Prélèvement SEPA</option>
        <option value="Cheque">Chèque</option>
        <option value="Efectivo">Espèces</option>
      </select>

      {/* Statut */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="En attente">En attente</option>
        <option value="Approuvé">Approuvé</option>
        <option value="Refusé">Refusé</option>
      </select>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Créer le devis
      </button>
    </motion.form>
  );
}
