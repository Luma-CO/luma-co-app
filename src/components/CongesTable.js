import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

export default function CongesTable({ conges }) {
  const [employees, setEmployees] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await ApiService.getEmployees();
        const employeeMap = data.reduce((acc, emp) => {
          acc[emp._id] = emp.name;
          return acc;
        }, {});
        setEmployees(employeeMap);
      } catch (error) {
        console.error("Error al cargar empleados", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-green-600 mb-6">
        Lista de Permisos
      </h2>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="px-4 py-3 text-left">Empleado</th>
            <th className="px-4 py-3 text-left">Fecha de Inicio</th>
            <th className="px-4 py-3 text-left">Fecha de Fin</th>
            <th className="px-4 py-3 text-left">Tipo</th>
            <th className="px-4 py-3 text-left">Estado</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {conges.length > 0 ? (
            conges.map((conge) => (
              <tr key={conge._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">
                  {employees[conge.employeeId] || "Empleado Desconocido"}
                </td>
                <td className="px-4 py-3">{conge.startDate}</td>
                <td className="px-4 py-3">{conge.endDate}</td>
                <td className="px-4 py-3">{conge.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`${
                      conge.status === "Aprobado"
                        ? "bg-green-200 text-green-600"
                        : conge.status === "Pendiente"
                        ? "bg-yellow-200 text-yellow-600"
                        : "bg-red-200 text-red-600"
                    } px-4 py-1 rounded-full`}
                  >
                    {conge.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600"
                    onClick={() =>
                      alert(`Ver detalles de ${employees[conge.employeeId]}`)
                    }
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No hay permisos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
