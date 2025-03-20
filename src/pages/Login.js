import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify"; // Pour les notifications

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Pour capturer la dernière route avant la redirection vers login

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, on le redirige vers le dashboard
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Réinitialisation de l'erreur avant chaque nouvelle tentative
    setError("");

    // Vérification des champs de formulaire
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Réponse du serveur:", data);

      if (data.token) {
        // Appeler la fonction login pour stocker le token et le rôle
        login(data.token, data.role);
        localStorage.setItem("token", data.token); // Stocker le token dans le localStorage
        localStorage.setItem("role", data.role); // Stocker le rôle dans le localStorage

        // Rediriger vers la page initiale (dashboard ou la page qu'il voulait atteindre)
        const redirectTo = location.state?.from || "/dashboard";
        navigate(redirectTo);
      } else {
        // Afficher l'erreur si pas de token dans la réponse
        setError(data.message || "Identifiants incorrects.");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      toast.error("Une erreur est survenue. Veuillez réessayer."); // Notification en cas d'erreur
    }
  };

  const handlePasswordRecovery = () => {
    navigate("/password-recovery");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">Luma Co</div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              placeholder="Entrez votre email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="connect-button">
            Se connecter
          </button>
          <div className="recovery-link">
            <button
              type="button"
              onClick={handlePasswordRecovery}
              className="recovery-button"
            >
              Mot de passe oublié ?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
