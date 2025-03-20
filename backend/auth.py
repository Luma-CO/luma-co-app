from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

router = APIRouter()

# Schéma de l'utilisateur
class User(BaseModel):
    username: str
    password: str

# Base de données simulée des utilisateurs (avec leurs rôles)
users_db = {
    "admin@luma.com": {"password": "admi123@", "role": "admin"},
    "commercial@example.com": {"password": "commercialpassword", "role": "commercial"},
    "rh@example.com": {"password": "rhpassword", "role": "rh"},
}

# Fonction pour vérifier l'authentification et le rôle
@router.post("/login")
def login(user: User):
    user_info = users_db.get(user.username)
    
    if not user_info or user_info["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Créer un token avec le rôle de l'utilisateur
    expiration = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    token_data = {
        "sub": user.username,
        "role": user_info["role"],
        "exp": expiration
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        role = payload.get("role")
        if username is None or role is None:
            raise HTTPException(status_code=401, detail="Token is invalid")
        return {"username": username, "role": role}
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token is invalid")

# Définir les permissions en fonction des rôles
def check_permissions(role: str, endpoint: str):
    permissions = {
        "admin": ["dashboard", "clients", "devis", "factures", "chats", "reglages", "contrats", "nominas", "recrutement", "conges", "employes"],
        "commercial": ["dashboard", "clients", "devis", "factures", "chats", "reglages"],
        "rh": ["dashboard", "clients", "devis", "factures", "chats", "reglages", "contrats", "nominas", "recrutement", "conges", "employes"]
    }
    
    if endpoint not in permissions.get(role, []):
        raise HTTPException(status_code=403, detail="Access forbidden for your role")

# Exemple de route protégée par rôle
@router.get("/dashboard")
def dashboard(current_user: dict = Depends(get_current_user)):
    check_permissions(current_user["role"], "dashboard")
    return {"msg": "Welcome to the dashboard!"}

@router.get("/clients")
def clients(current_user: dict = Depends(get_current_user)):
    check_permissions(current_user["role"], "clients")
    return {"msg": "Here are the clients!"}

@router.get("/contrats")
def contrats(current_user: dict = Depends(get_current_user)):
    check_permissions(current_user["role"], "contrats")
    return {"msg": "Here are the contracts!"}
