from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Modèle pour un contrat de travail
class Contrat(BaseModel):
    type_contrat: str  # indéterminé, déterminé, etc.
    date_debut: datetime
    date_fin: Optional[datetime] = None  # Seulement pour les contrats à durée déterminée
    heures_travail: int  # Nombre d'heures par semaine
    salaire_brut: float  # Salaire mensuel brut

# Modèle pour la demande de fiche de paie
class PayslipRequest(BaseModel):
    salaire_brut: float
    type_contrat: str
    situation_familiale: Optional[str] = None
