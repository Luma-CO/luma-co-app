import React, { useState } from "react";

const PasswordRecovery = () => {
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Exemple de validation des données
    if (!dni || !email || !captcha) {
      setError("Tous les champs sont requis.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/recover-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dni, email, captcha }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(
          "Vérification réussie, veuillez vérifier votre email."
        );
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="recovery-container">
      <h2>Recuperación de contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dni">DNI / NIE</label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="captcha">Captcha</label>
          <input
            type="text"
            id="captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button type="submit">Recuperar</button>
      </form>
      <div>
        <a href="/login">Volver a la página de inicio de sesión</a>
      </div>
    </div>
  );
};

export default PasswordRecovery;
