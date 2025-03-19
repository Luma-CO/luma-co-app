import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // Importation correcte sans le préfixe "frontend/"
import reportWebVitals from "./reportWebVitals"; // Importation correcte sans le préfixe "frontend/"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si tu veux commencer à mesurer la performance de ton app, passe une fonction
// pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
// ou envoie-les vers un point de terminaison d'analytique. Plus d'infos ici : https://bit.ly/CRA-vitals
reportWebVitals();
