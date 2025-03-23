import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Contrats from "./pages/Contrats";
import Clients from "./pages/Clients";
import PasswordRecovery from "./pages/PasswordRecovery";
import Chat from "./components/Chat";
import Conges from "./pages/Conges";
import Devis from "./pages/Devis";
import Factures from "./pages/Factures";
import Employees from "./pages/Employees";
import Nominas from "./pages/Nominas";
import Recrutement from "./pages/Recrutement";
import Reglages from "./pages/Reglages";
import "./App.css";

// ✅ Composant pour gérer les routes privées
const PrivateRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(userRole) && userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return element;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  // ✅ Vérification de l'authentification au chargement
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole("");
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* ✅ Sidebar affichée seulement si l'utilisateur est connecté */}
        {isAuthenticated && <Sidebar logout={logout} role={role} />}

        {/* ✅ Contenu principal ajusté avec la sidebar */}
        <div className={`main-content ${isAuthenticated ? "" : "full-width"}`}>
          <Routes>
            {/* ✅ Routes publiques */}
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

            {/* ✅ Routes privées */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  element={<Dashboard />}
                  allowedRoles={["admin", "commercial", "rh"]}
                />
              }
            />
            <Route
              path="/clients"
              element={
                <PrivateRoute
                  element={<Clients />}
                  allowedRoles={["admin", "commercial", "rh"]}
                />
              }
            />
            <Route
              path="/devis"
              element={
                <PrivateRoute
                  element={<Devis />}
                  allowedRoles={["admin", "commercial", "rh"]}
                />
              }
            />
            <Route
              path="/factures"
              element={
                <PrivateRoute
                  element={<Factures />}
                  allowedRoles={["admin", "commercial", "rh"]}
                />
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute
                  element={<Chat />}
                  allowedRoles={["admin", "commercial", "rh"]}
                />
              }
            />
            <Route
              path="/reglages"
              element={
                <PrivateRoute
                  element={<Reglages />}
                  allowedRoles={["admin", "commercial", "rh"]}
                />
              }
            />

            {/* ✅ Routes Admin & RH */}
            <Route
              path="/employees"
              element={
                <PrivateRoute
                  element={<Employees />}
                  allowedRoles={["admin", "rh"]}
                />
              }
            />
            <Route
              path="/contrats"
              element={
                <PrivateRoute
                  element={<Contrats />}
                  allowedRoles={["admin", "rh"]}
                />
              }
            />
            <Route
              path="/nominas"
              element={
                <PrivateRoute
                  element={<Nominas />}
                  allowedRoles={["admin", "rh"]}
                />
              }
            />
            <Route
              path="/recrutement"
              element={
                <PrivateRoute
                  element={<Recrutement />}
                  allowedRoles={["admin", "rh"]}
                />
              }
            />
            <Route
              path="/conges"
              element={
                <PrivateRoute
                  element={<Conges />}
                  allowedRoles={["admin", "rh"]}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
