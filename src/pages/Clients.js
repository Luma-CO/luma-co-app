// pages/Clients.js
import React, { useState, useEffect } from "react";

const Clients = () => {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const response = await fetch("/api/clients");
    const data = await response.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            {client.name} - {client.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
