import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const [newEmployee, setNewEmployee] = useState({
    dni: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    birthDate: "",
    nationality: "",
    socialSecurityNumber: "",
    salary: "",
    contractType: "",
    startDate: "",
    endDate: "",
    workHours: "",
    contract: null,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewEmployee({ ...newEmployee, contract: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newEmployee.dni ||
      !newEmployee.name ||
      !newEmployee.email ||
      !newEmployee.role
    ) {
      toast.error("Merci de remplir tous les champs obligatoires");
      return;
    }
    setEmployees((prev) => [...prev, { ...newEmployee, id: prev.length + 1 }]);
    setNewEmployee({
      dni: "",
      name: "",
      email: "",
      phone: "",
      role: "",
      address: "",
      birthDate: "",
      nationality: "",
      socialSecurityNumber: "",
      salary: "",
      contractType: "",
      startDate: "",
      endDate: "",
      workHours: "",
      contract: null,
    });
    toast.success("Employé ajouté avec succès !");
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    toast.success("Employé supprimé !");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <motion.h1
        className="text-3xl font-bold text-green-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Gestion des Employés
      </motion.h1>

      {/* Formulaire */}
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Ajouter un employé</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="DNI/NIE"
            value={newEmployee.dni}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, dni: e.target.value })
            }
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Nom complet"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Rôle"
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Adresse"
            value={newEmployee.address}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, address: e.target.value })
            }
            className="input-field"
          />
          <input
            type="date"
            placeholder="Date de naissance"
            value={newEmployee.birthDate}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, birthDate: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Nationalité"
            value={newEmployee.nationality}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, nationality: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="N° Sécurité Sociale"
            value={newEmployee.socialSecurityNumber}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                socialSecurityNumber: e.target.value,
              })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Salaire (€)"
            value={newEmployee.salary}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, salary: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Type de contrat"
            value={newEmployee.contractType}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, contractType: e.target.value })
            }
            className="input-field"
          />
          <input
            type="date"
            placeholder="Date de début"
            value={newEmployee.startDate}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, startDate: e.target.value })
            }
            className="input-field"
          />
          <input
            type="date"
            placeholder="Date de fin"
            value={newEmployee.endDate}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, endDate: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Horaires de travail"
            value={newEmployee.workHours}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, workHours: e.target.value })
            }
            className="input-field"
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="input-field"
          />
          <button
            type="submit"
            className="col-span-2 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Ajouter l'employé
          </button>
        </form>
      </div>

      {/* Liste des employés */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Liste des employés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <motion.div
              key={employee.id}
              className="bg-gray-100 p-6 rounded-xl shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="font-semibold text-lg">{employee.name}</div>
              <div className="text-green-600">{employee.role}</div>
              <div className="text-gray-500">{employee.email}</div>
              <button
                onClick={() => handleDelete(employee.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
