from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from datetime import date

router = APIRouter()

# Schéma pour le contrat de travail
class Contract(BaseModel):
    employee_name: str
    start_date: date
    end_date: date
    contract_type: str  # Contrat temporaire, CDI, etc.
    salary: float  # Salaire brut
    ipf: float  # Impôt sur le revenu
    social_security: float  # Cotisation sécurité sociale
    unemployment: float  # Cotisation chômage
    total_deductions: float  # Total des déductions
    net_salary: float  # Salaire net

# Stockage fictif des contrats
contracts_db = []

# Route pour obtenir tous les contrats
@router.get("/contracts", response_model=List[Contract])
def get_contracts():
    return contracts_db

# Route pour ajouter un nouveau contrat
@router.post("/contracts", response_model=Contract)
def add_contract(contract: Contract):
    # Calcul des déductions et du salaire net
    contract.total_deductions = contract.ipf + contract.social_security + contract.unemployment
    contract.net_salary = contract.salary - contract.total_deductions

    contracts_db.append(contract)  # Ajouter à la base de données fictive
    return contract

# Route pour récupérer un contrat spécifique par son nom
@router.get("/contracts/{employee_name}", response_model=Contract)
def get_contract(employee_name: str):
    for contract in contracts_db:
        if contract.employee_name == employee_name:
            return contract
    raise HTTPException(status_code=404, detail="Contract not found")
