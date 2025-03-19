import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Rediriger vers la page de login après déconnexion
  };

  return (
    <aside className="w-64 bg-gray-900 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-green-500">Luma Co</h2>
        <nav className="space-y-6">
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
          >
            <span>🏠</span> <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
          >
            <span>⚙️</span> <span>Services</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
          >
            <span>📄</span> <span>Rapports</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-green-400 cursor-pointer"
          >
            <span>🚨</span> <span>Alertes</span>
          </a>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 hover:text-green-400 cursor-pointer mt-6"
      >
        <span>🔓</span> <span>Déconnexion</span>
      </button>
    </aside>
  );
};

export default Sidebar;
