import jwt from "jsonwebtoken";

// Middleware pour vérifier le token JWT
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifier si l'en-tête d'autorisation existe
  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" });
  }

  // Extraire le token du header
  const token = authHeader.split(" ")[1];

  // Vérifier si le token est présent
  if (!token) {
    return res.status(401).json({ message: "Token invalide" });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourSecretKey"
    );
    req.user = decoded; // Stocker les informations du user dans la requête
    next();
  } catch (err) {
    // Gestion des erreurs lors de la vérification du token
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

// Middleware pour vérifier le rôle de l'utilisateur
export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      // Si l'utilisateur n'a pas le rôle approprié
      return res
        .status(403)
        .json({ message: "Accès interdit, rôle insuffisant" });
    }
    next(); // Si l'utilisateur a le bon rôle
  };
};
