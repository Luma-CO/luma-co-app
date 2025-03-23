import React, { useState, useEffect } from "react";
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
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ logout, role }) => {
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );

  useEffect(() => {
    if (!role) {
      console.warn("⚠️ Aucun rôle défini pour l'utilisateur !");
    }
  }, [role]);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  const menuItems = [
    {
      to: "/dashboard",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      roles: ["admin", "commercial", "rh"],
    },
    {
      to: "/clients",
      icon: <FaUsers />,
      label: "Clients",
      roles: ["admin", "commercial", "rh"],
    },
    {
      to: "/factures",
      icon: <FaFileInvoice />,
      label: "Factures",
      roles: ["admin", "commercial", "rh"],
    },
    {
      to: "/employees",
      icon: <FaChalkboardTeacher />,
      label: "Employés",
      roles: ["admin", "rh"],
    },
    { to: "/conges", icon: <FaCog />, label: "Congés", roles: ["admin", "rh"] },
    {
      to: "/contracts",
      icon: <FaClipboardList />,
      label: "Contrats",
      roles: ["admin", "rh"],
    },
    {
      to: "/nominas",
      icon: <FaUserTie />,
      label: "Nominas",
      roles: ["admin", "rh"],
    },
    {
      to: "/recrutement",
      icon: <FaUserTie />,
      label: "Recrutement",
      roles: ["admin", "rh"],
    },
    {
      to: "/devis",
      icon: <FaFileInvoice />,
      label: "Devis",
      roles: ["admin", "commercial", "rh"],
    },
    {
      to: "/chat",
      icon: <FaComments />,
      label: "Chats",
      roles: ["admin", "commercial", "rh"],
    },
    {
      to: "/reglages",
      icon: <FaCog />,
      label: "Réglages",
      roles: ["admin", "commercial", "rh"],
    },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header avec bouton de toggle */}
      <div className="sidebar-header">
        <h2 className="sidebar-logo">{collapsed ? "L" : "Luma CO"}</h2>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Liens du menu */}
      <ul className="sidebar-links">
        {menuItems
          .filter((item) => item.roles.includes(role))
          .map((item, index) => (
            <li key={index} className="sidebar-item">
              <Link to={item.to} className="sidebar-link">
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
      </ul>

      {/* Bouton Logout */}
      <div className="logout-btn-container">
        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
