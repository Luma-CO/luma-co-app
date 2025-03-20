import { useState } from "react";

export default function DevisForm({ onCreate }) {
  const [form, setForm] = useState({
    clientId: "",
    amount: "",
    date: "",
    status: "En attente",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({
      clientId: "",
      amount: "",
      date: "",
      status: "En attente",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="clientId"
        value={form.clientId}
        onChange={handleChange}
        placeholder="Client ID"
      />
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Montant"
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="En attente">En attente</option>
        <option value="Approuvé">Approuvé</option>
        <option value="Refusé">Refusé</option>
      </select>
      <button type="submit">Créer un devis</button>
    </form>
  );
}
