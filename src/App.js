import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"; // Pages
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Contrats from "./pages/Contrats";
import Clients from "./pages/Clients";
import PasswordRecovery from "./pages/PasswordRecovery";
import Chat from "./components/Chat";
import Conges from "./pages/Conges"; // Nouvelle route Conges
import Devis from "./pages/Devis"; // Nouvelle route Devis
import Factures from "./pages/Factures"; // Nouvelle route Factures
import Employees from "./pages/Employees"; // Nouvelle route Employees
import Nominas from "./pages/Nominas"; // Nouvelle route Nominas
import Recrutement from "./pages/Recrutement"; // Nouvelle route Recrutement
import Reglements from "./pages/Reglages"; // Nouvelle route Réglages

// Styles
import "./App.css";

// Protection des routes privées
const PrivateRoute = ({ element, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Si pas de token ou rôle incorrect, redirige vers la page de login
  if (!token || (role && userRole !== role && userRole !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const login = (token, role) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {isAuthenticated && <Sidebar logout={logout} />}
        <div className={isAuthenticated ? "main-content" : "full-width"}>
          <Routes>
            {/* Routes publiques */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login login={login} />
                )
              }
            />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />

            {/* Routes privées */}
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/contrats"
              element={<PrivateRoute element={<Contrats />} role="rh" />}
            />
            <Route
              path="/clients"
              element={<PrivateRoute element={<Clients />} role="commercial" />}
            />
            <Route
              path="/conges"
              element={<PrivateRoute element={<Conges />} />}
            />
            <Route
              path="/devis"
              element={<PrivateRoute element={<Devis />} />}
            />
            <Route
              path="/factures"
              element={<PrivateRoute element={<Factures />} />}
            />
            <Route
              path="/employees"
              element={<PrivateRoute element={<Employees />} />}
            />
            <Route
              path="/nominas"
              element={<PrivateRoute element={<Nominas />} />}
            />
            <Route
              path="/recrutement"
              element={<PrivateRoute element={<Recrutement />} />}
            />
            <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
            <Route
              path="/reglements"
              element={<PrivateRoute element={<Reglements />} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
