import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState(null); // Gérer le rôle de l'utilisateur

  const handleLogin = async () => {
    try {
      // Mise à jour de l'URL pour correspondre à ton backend
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: username, // Assure-toi que "username" est un email valide dans ton backend
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token); // Stocker le token dans le localStorage

      // Décoder le JWT pour obtenir le rôle de l'utilisateur
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setRole(decoded.role); // Récupérer le rôle de l'utilisateur

      setMessage(`Connexion réussie. Bienvenue, ${username} !`);
    } catch (error) {
      setMessage("Identifiants invalides. Essayez à nouveau.");
    }
  };

  return (
    <div className="App">
      <h1>Authentification</h1>
      <input
        type="email" // Utiliser un champ email au lieu de texte
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>

      {message && <p>{message}</p>}

      {role && (
        <div>
          {role === "admin" ? (
            <h2>Bienvenue, Administrateur !</h2>
          ) : (
            <h2>Bienvenue, Employé !</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
