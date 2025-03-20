import { useState } from "react";

const RecrutementForm = ({ onCreate }) => {
  const [candidat, setCandidat] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidat({ ...candidat, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(candidat);
    setCandidat({ name: "", email: "", phone: "", experience: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
