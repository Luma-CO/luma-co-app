import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const Billing = () => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    invoice_number: "",
    client_name: "",
    amount: 0,
    issue_date: "",
    due_date: "",
    status: "unpaid",
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await ApiService.getInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Erreur de récupération des factures :", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const invoice = await ApiService.createInvoice(newInvoice);
      setInvoices([...invoices, invoice]);
    } catch (error) {
      console.error("Erreur lors de la création de la facture :", error);
    }
  };

  return (
    <div className="billing-container">
      <h1>Gestion des Factures</h1>

      {/* Formulaire pour créer une nouvelle facture */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="invoice_number"
          value={newInvoice.invoice_number}
          onChange={handleChange}
          placeholder="Numéro de la facture"
        />
        <input
          type="text"
          name="client_name"
          value={newInvoice.client_name}
          onChange={handleChange}
          placeholder="Nom du client"
        />
        <input
          type="number"
          name="amount"
          value={newInvoice.amount}
          onChange={handleChange}
          placeholder="Montant"
        />
        <input
          type="date"
          name="issue_date"
          value={newInvoice.issue_date}
          onChange={handleChange}
        />
        <input
          type="date"
          name="due_date"
          value={newInvoice.due_date}
          onChange={handleChange}
        />
        <select name="status" value={newInvoice.status} onChange={handleChange}>
          <option value="unpaid">Non payée</option>
          <option value="paid">Payée</option>
        </select>
        <button type="submit">Créer une facture</button>
      </form>

      {/* Liste des factures */}
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.invoice_number}>
            {invoice.invoice_number} - {invoice.client_name} - {invoice.amount}€
            - {invoice.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Billing;
