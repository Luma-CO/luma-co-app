import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";

export default function CongesForm({ onCreate }) {
  const [form, setForm] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    type: "Vacaciones",
    reason: "",
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await ApiService.getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error al cargar empleados", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({
      employeeId: "",
      startDate: "",
      endDate: "",
      type: "Vacaciones",
      reason: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-green-600 mb-6">
        Solicitud de Vacaciones
      </h2>

      {/* Sélection de l'employé */}
      <div className="flex flex-col">
        <label htmlFor="employeeId" className="text-gray-600 mb-2">
          Seleccionar Empleado
        </label>
        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          className="p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Seleccione un empleado</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} (ID: {emp._id})
            </option>
          ))}
        </select>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-gray-600 mb-2">
            Fecha de Inicio
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-gray-600 mb-2">
            Fecha de Fin
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>

      {/* Type de congé */}
      <div className="flex flex-col">
        <label htmlFor="type" className="text-gray-600 mb-2">
          Tipo de Permiso
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
        >
          <option value="Vacaciones">Vacaciones</option>
          <option value="Baja Médica">Baja Médica</option>
          <option value="Permiso No Remunerado">Permiso No Remunerado</option>
        </select>
      </div>

      {/* Raison du congé */}
      <div className="flex flex-col">
        <label htmlFor="reason" className="text-gray-600 mb-2">
          Motivo (opcional)
        </label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Escriba el motivo de su solicitud (opcional)"
          rows="4"
          className="p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
      >
        Enviar Solicitud
      </button>
    </form>
  );
}
