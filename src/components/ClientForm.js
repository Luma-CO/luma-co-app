import React, { useState, useEffect } from "react";

export default function ClientForm({
  onCreate,
  selectedClient,
  clearSelected,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    logo: null,
    logoPreview: null, // Ajout pour la prévisualisation
    tvaNumber: "",
    industry: "",
    paymentMethod: "",
  });

  // Mise à jour du formulaire lorsqu'un client est sélectionné
  useEffect(() => {
    if (selectedClient) {
      setForm({
        ...selectedClient,
        logo: null, // Réinitialisation du fichier logo (évite d’envoyer l’ancien fichier)
        logoPreview: selectedClient.logo || null, // Prévisualisation si un logo existe
      });
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
        logo: null,
        logoPreview: null,
        tvaNumber: "",
        industry: "",
        paymentMethod: "",
      });
    }
  }, [selectedClient]);

  // Gestion des changements dans les champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Gestion de l'upload du logo avec prévisualisation
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        logo: file,
        logoPreview: URL.createObjectURL(file), // Affichage instantané du logo
      });
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "logoPreview" && form[key]) {
        formData.append(key, form[key]);
      }
    });

    onCreate(formData);
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
      logo: null,
      logoPreview: null,
      tvaNumber: "",
      industry: "",
      paymentMethod: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 border rounded-xl shadow-md bg-white"
    >
      <h2 className="text-2xl font-bold text-green-700">
        {selectedClient ? "Modifier le client" : "Ajouter un client"}
      </h2>

      {/* Champs du formulaire */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nom"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Téléphone"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Adresse"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Entreprise"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
      />

      {/* Logo Upload avec prévisualisation */}
      <div className="mt-4">
        <label className="block text-lg font-semibold text-gray-700">
          Logo de l'entreprise
        </label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
        />
        {form.logoPreview && (
          <div className="mt-3 flex justify-center">
            <img
              src={form.logoPreview}
              alt="Logo prévisualisé"
              className="w-20 h-20 object-cover rounded-full shadow-md"
            />
          </div>
        )}
      </div>

      {/* Informations de facturation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="tvaNumber"
          value={form.tvaNumber}
          onChange={handleChange}
          placeholder="Numéro de TVA"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
        />
        <input
          type="text"
          name="industry"
          value={form.industry}
          onChange={handleChange}
          placeholder="Secteur d'activité"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
        />
      </div>

      {/* Méthode de paiement */}
      <div>
        <label className="block text-lg font-semibold text-gray-700">
          Méthode de Paiement
        </label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="bank">Virement bancaire</option>
          <option value="creditCard">Carte de crédit</option>
          <option value="paypal">PayPal</option>
          <option value="check">Chèque</option>
        </select>
      </div>

      {/* Boutons */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          {selectedClient ? "Modifier" : "Ajouter"}
        </button>
        {selectedClient && (
          <button
            type="button"
            onClick={clearSelected}
            className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
