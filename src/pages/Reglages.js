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

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePreferencesChange = (e) => {
    const { name, checked, value } = e.target;
    setPreferences({ ...preferences, [name]: checked ?? value });
  };

  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
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
      <h2 className="text-3xl font-bold text-green-600">Paramètres</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-gray-50 p-6 rounded-xl shadow-lg"
      >
        {/* Informations Utilisateur */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Informations Utilisateur
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleUserInfoChange}
              placeholder="Nom"
              className="input"
            />
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              placeholder="Email"
              className="input"
            />
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleUserInfoChange}
              placeholder="Téléphone"
              className="input"
            />
          </div>
        </div>

        {/* Préférences d'affichage */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Préférences d'affichage
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="darkMode"
                checked={preferences.darkMode}
                onChange={handlePreferencesChange}
              />
              Mode Sombre
            </label>
            <select
              name="language"
              value={preferences.language}
              onChange={handlePreferencesChange}
              className="input"
            >
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
              <option value="es">Espagnol</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationsChange}
              />
              Notifications par Email
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notifications.smsNotifications}
                onChange={handleNotificationsChange}
              />
              Notifications par SMS
            </label>
          </div>
        </div>

        {/* Sécurité */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Sécurité</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="password"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Mot de passe actuel"
              className="input"
            />
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              placeholder="Nouveau mot de passe"
              className="input"
            />
            <input
              type="password"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirmer le mot de passe"
              className="input"
            />
          </div>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default Reglages;
