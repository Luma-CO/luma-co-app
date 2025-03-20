import React, { useState } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", role: "Manager" },
    { id: 2, name: "Jane Smith", role: "Developer" },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      alert("Merci de remplir tous les champs obligatoires");
      return;
    }
    setEmployees((prev) => [...prev, { ...newEmployee, id: prev.length + 1 }]);
    setNewEmployee({ name: "", email: "", phone: "", role: "" });
  };

  return (
    <div className="p-8 ml-64 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Gestion des Employés
      </h1>

      {/* Formulaire */}
      <div className="bg-gray-100 p-6 rounded-xl shadow space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Ajouter un employé</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Nom"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            className="p-2 rounded border"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            className="p-2 rounded border"
            required
          />
          <input
            type="text"
            placeholder="Téléphone"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            className="p-2 rounded border"
          />
          <input
            type="text"
            placeholder="Rôle"
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, role: e.target.value })
            }
            className="p-2 rounded border"
            required
          />
          <button
            type="submit"
            className="col-span-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Ajouter l'employé
          </button>
        </form>
      </div>

      {/* Liste */}
      <div className="bg-gray-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Liste des employés</h2>
        <ul className="space-y-2">
          {employees.map((employee) => (
            <li
              key={employee.id}
              className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
            >
              <span>
                {employee.name} - {employee.role}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
