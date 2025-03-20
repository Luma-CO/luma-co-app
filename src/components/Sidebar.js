import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaFileInvoice,
  FaChalkboardTeacher,
  FaUserTie,
  FaCog,
  FaComments,
} from "react-icons/fa"; // Icônes de FontAwesome
import "./Sidebar.css"; // Assurez-vous d'ajouter ce fichier pour les styles

const Sidebar = ({ logout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Luma Co</h2>
      </div>

      <ul className="sidebar-links">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            <FaTachometerAlt className="sidebar-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/clients" className="sidebar-link">
            <FaUsers className="sidebar-icon" /> Clients
          </Link>
        </li>
        <li>
          <Link to="/contracts" className="sidebar-link">
            <FaClipboardList className="sidebar-icon" /> Contrats
          </Link>
        </li>
        <li>
          <Link to="/devis" className="sidebar-link">
            <FaFileInvoice className="sidebar-icon" /> Devis
          </Link>
        </li>
        <li>
          <Link to="/factures" className="sidebar-link">
            <FaFileInvoice className="sidebar-icon" /> Factures
          </Link>
        </li>
        <li>
          <Link to="/employees" className="sidebar-link">
            <FaChalkboardTeacher className="sidebar-icon" /> Employés
          </Link>
        </li>
        <li>
          <Link to="/nominas" className="sidebar-link">
            <FaUserTie className="sidebar-icon" /> Nominas
          </Link>
        </li>
        <li>
          <Link to="/recrutement" className="sidebar-link">
            <FaUserTie className="sidebar-icon" /> Recrutement
          </Link>
        </li>
        <li>
          <Link to="/conges" className="sidebar-link">
            <FaCog className="sidebar-icon" /> Congés
          </Link>
        </li>
        <li>
          <Link to="/chat" className="sidebar-link">
            <FaComments className="sidebar-icon" /> Chats
          </Link>
        </li>
        <li>
          <Link to="/reglages" className="sidebar-link">
            <FaCog className="sidebar-icon" /> Réglages
          </Link>
        </li>
      </ul>

      <div className="logout-btn-container">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
