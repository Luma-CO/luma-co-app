import React, { useState } from "react";

const Reglages = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "fr",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e, state, setState) => {
    const { name, value, type, checked } = e.target;
    setState({ ...state, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Informations de l'utilisateur", userInfo);
    console.log("Préférences", preferences);
    console.log("Notifications", notifications);
    console.log("Mot de passe", password);
    alert("Paramètres sauvegardés !");
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-white space-y-8">
      <h2 className="text-3xl font-bold text-[#006400]">Paramètres</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-gray-50 p-6 rounded-xl shadow-lg"
      >
        {/* Informations Utilisateur */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#006400]">
            Informations Utilisateur
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(userInfo).map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={userInfo[field]}
                onChange={(e) => handleChange(e, userInfo, setUserInfo)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="input border border-gray-300 rounded-lg p-2 w-full"
              />
            ))}
          </div>
        </div>

        {/* Préférences */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#006400]">
            Préférences
          </h3>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="darkMode"
              checked={preferences.darkMode}
              onChange={(e) => handleChange(e, preferences, setPreferences)}
              className="h-5 w-5"
            />
            Mode Sombre
          </label>
          <select
            name="language"
            value={preferences.language}
            onChange={(e) => handleChange(e, preferences, setPreferences)}
            className="border border-gray-300 rounded-lg p-2 w-full mt-2"
          >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="es">Espagnol</option>
          </select>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#006400]">
            Notifications
          </h3>
          {Object.keys(notifications).map((field) => (
            <label key={field} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={field}
                checked={notifications[field]}
                onChange={(e) =>
                  handleChange(e, notifications, setNotifications)
                }
                className="h-5 w-5"
              />
              {field === "emailNotifications"
                ? "Notifications par Email"
                : "Notifications par SMS"}
            </label>
          ))}
        </div>

        {/* Sécurité */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#006400]">
            Sécurité
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(password).map((field) => (
              <input
                key={field}
                type="password"
                name={field}
                value={password[field]}
                onChange={(e) => handleChange(e, password, setPassword)}
                placeholder={
                  field === "currentPassword"
                    ? "Mot de passe actuel"
                    : field === "newPassword"
                    ? "Nouveau mot de passe"
                    : "Confirmer le mot de passe"
                }
                className="input border border-gray-300 rounded-lg p-2 w-full"
              />
            ))}
          </div>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="bg-[#006400] text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default Reglages;
