import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const lastActive = localStorage.getItem("lastActive");

    if (token && lastActive) {
      const now = new Date().getTime();
      if (now - lastActive > 3600000) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.info("Session expirée. Veuillez vous reconnecter.");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Simulated login users
    const users = {
      "admin@luma.com": { password: "admin123", role: "admin" },
      "commercial@example.com": {
        password: "commercialpassword",
        role: "commercial",
      },
      "rh@example.com": { password: "rhpassword", role: "rh" },
    };

    if (users[email] && users[email].password === password) {
      const user = users[email];
      const token = `fake-token-${email}`;
      const role = user.role;

      login(token, role);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("lastActive", new Date().getTime());

      const redirectTo = location.state?.from || "/dashboard";
      navigate(redirectTo);
    } else {
      setError("Identifiants incorrects.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-600">
          Connexion
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/password-recovery")}
            className="text-green-600 hover:underline"
          >
            Mot de passe oublié ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
