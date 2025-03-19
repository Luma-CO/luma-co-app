import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import "../Login.css"; // Assurez-vous que le chemin vers votre fichier CSS est correct

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showRecovery, setShowRecovery] = useState(false);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      const data = await response.json();

      if (data.token) {
        login(data.token);
        navigate("/dashboard");
      } else {
        setError("Identifiants incorrects.");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handlePasswordRecovery = () => {
    navigate("/password-recovery"); // Redirection vers la page de récupération
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">Luma Co</div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Usuario</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="connect-button">
            Conectar
          </button>

          <div className="recovery-link">
            <button
              type="button"
              onClick={handlePasswordRecovery}
              className="recovery-button"
            >
              Contraseña olvidada
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
