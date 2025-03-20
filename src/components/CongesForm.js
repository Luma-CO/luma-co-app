import { useState } from "react";

export default function CongesForm({ onCreate }) {
  const [form, setForm] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    type: "Vacances",
  });

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
      type: "Vacances",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="employeeId"
        value={form.employeeId}
        onChange={handleChange}
        placeholder="ID Employé"
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="Vacances">Vacances</option>
        <option value="Maladie">Maladie</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Soumettre Demande
      </button>
    </form>
  );
}
