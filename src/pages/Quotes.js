import React, { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    quote_number: "",
    client_name: "",
    amount: 0,
    issue_date: "",
    status: "draft",
  });

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await ApiService.getQuotes();
        setQuotes(data);
      } catch (error) {
        console.error("Erreur de récupération des devis :", error);
      }
    };

    fetchQuotes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuote({ ...newQuote, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quote = await ApiService.createQuote(newQuote);
      setQuotes([...quotes, quote]);
    } catch (error) {
      console.error("Erreur lors de la création du devis :", error);
    }
  };

  return (
    <div className="quote-container">
      <h1>Gestion des Devis</h1>

      {/* Formulaire pour créer un nouveau devis */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="quote_number"
          value={newQuote.quote_number}
          onChange={handleChange}
          placeholder="Numéro du devis"
        />
        <input
          type="text"
          name="client_name"
          value={newQuote.client_name}
          onChange={handleChange}
          placeholder="Nom du client"
        />
        <input
          type="number"
          name="amount"
          value={newQuote.amount}
          onChange={handleChange}
          placeholder="Montant"
        />
        <input
          type="date"
          name="issue_date"
          value={newQuote.issue_date}
          onChange={handleChange}
        />
        <select name="status" value={newQuote.status} onChange={handleChange}>
          <option value="draft">Brouillon</option>
          <option value="sent">Envoyé</option>
          <option value="accepted">Accepté</option>
        </select>
        <button type="submit">Créer un devis</button>
      </form>

      {/* Liste des devis */}
      <ul>
        {quotes.map((quote) => (
          <li key={quote.quote_number}>
            {quote.quote_number} - {quote.client_name} - {quote.amount}€ -{" "}
            {quote.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotes;
