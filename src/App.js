import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.js"; // Page de connexion
import Dashboard from "./pages/Dashboard.js"; // Tableau de bord
import Services from "./pages/Services.js"; // Services
import Reports from "./pages/Reports.js"; // Rapports
import Alerts from "./pages/Alerts.js"; // Alertes
import Sidebar from "./components/Sidebar.js"; // Sidebar
import Contracts from "./pages/Contracts.js"; // Contrats
import Clients from "./pages/Clients.js"; // Clients
import PasswordRecovery from "./pages/PasswordRecovery.js"; // Page récupération mot de passe
import Chat from "./components/Chat.js"; // Chat interne
import "./App.css";

// Fonction pour vérifier si l'utilisateur est authentifié et a le bon rôle
const PrivateRoute = ({ element, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Si pas authentifié ou rôle incorrect, redirection vers login
  if (!token || (role && userRole !== role && userRole !== "admin")) {
    return <Navigate to="/login" />;
  }

  return element; // Si authentifié et rôle autorisé, afficher la page
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  // Vérification de l'état d'authentification et récupération du rôle
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  // Fonction de connexion, stockage du token et rôle
  const login = (token, role) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role); // Stocker le rôle de l'utilisateur
  };

  // Fonction de déconnexion, suppression du token et rôle
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <BrowserRouter>
      <div className="flex">
        {/* Affichage de la sidebar uniquement si l'utilisateur est authentifié */}
        {isAuthenticated && <Sidebar logout={logout} />}
        <div className="ml-20 flex-1">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Login login={login} />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />

            {/* Routes privées */}
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/services"
              element={<PrivateRoute element={<Services />} role="rh" />}
            />
            <Route
              path="/contracts"
              element={<PrivateRoute element={<Contracts />} role="rh" />}
            />
            <Route
              path="/clients"
              element={<PrivateRoute element={<Clients />} role="commercial" />}
            />
            <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
            {/* Vous pouvez ajouter d'autres pages ou redirections ici */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
