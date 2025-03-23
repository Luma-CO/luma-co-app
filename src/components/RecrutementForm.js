import { useState } from "react";

const RecrutementForm = ({ onCreate }) => {
  const [candidat, setCandidat] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidat({ ...candidat, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCandidat({ ...candidat, cv: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (candidat.cv) {
      // Si un CV est sélectionné, on le passe aussi
      const formData = new FormData();
      formData.append("name", candidat.name);
      formData.append("email", candidat.email);
      formData.append("phone", candidat.phone);
      formData.append("experience", candidat.experience);
      formData.append("cv", candidat.cv);

      // Appel à l'API ou fonction pour envoyer le candidat et son CV
      onCreate(formData);
    } else {
      onCreate(candidat);
    }
    setCandidat({ name: "", email: "", phone: "", experience: "", cv: null });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={candidat.name}
          onChange={handleChange}
          placeholder="Nom du Candidat"
          className="input"
          required
        />
        <input
          type="email"
          name="email"
          value={candidat.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="phone"
          value={candidat.phone}
          onChange={handleChange}
          placeholder="Téléphone"
          className="input"
          required
        />
        <input
          type="text"
          name="experience"
          value={candidat.experience}
          onChange={handleChange}
          placeholder="Expérience"
          className="input"
        />
      </div>

      {/* Champ pour télécharger le CV */}
      <div className="mt-4">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Télécharger le CV (PDF)
        </label>
        <input
          type="file"
          name="cv"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        {candidat.cv && (
          <p className="mt-2 text-green-600">{candidat.cv.name} sélectionné</p>
        )}
      </div>

      {/* Bouton pour soumettre le formulaire */}
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
      >
        Ajouter Candidat
      </button>
    </form>
  );
};

export default RecrutementForm;
