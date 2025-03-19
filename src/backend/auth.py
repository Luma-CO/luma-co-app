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

# Fonction pour vérifier l'authentification
@router.post("/login")
def login(user: User):
    # Vérification simplifiée des identifiants
    if user.username == "admin" and user.password == "password":
        expiration = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
        token = jwt.encode({"sub": user.username, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token is invalid")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token is invalid")
