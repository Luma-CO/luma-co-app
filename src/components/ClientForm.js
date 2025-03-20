// src/components/ClientForm.js
import React, { useState, useEffect } from "react";

export default function ClientForm({
  onCreate,
  selectedClient,
  clearSelected,
}) {
  // L'état du formulaire qui sera réinitialisé pour l'ajout ou la modification
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });

  // Lorsque un client est sélectionné pour la modification
  useEffect(() => {
    if (selectedClient) {
      setForm(selectedClient);
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
      });
    }
  }, [selectedClient]);

  // Gestion de la modification de l'état du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Envoi des données du formulaire au parent
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form); // Appel à la fonction passée en props pour la création ou la mise à jour du client
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">
        {selectedClient ? "Modifier le client" : "Ajouter un client"}
      </h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nom"
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Téléphone"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Adresse"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Entreprise"
        className="w-full p-2 border rounded"
      />

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {selectedClient ? "Modifier" : "Ajouter"}
        </button>
        {selectedClient && (
          <button
            type="button"
            onClick={clearSelected}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
