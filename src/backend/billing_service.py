from pydantic import BaseModel
from typing import List

# Modèle de données pour une facture
class Invoice(BaseModel):
    invoice_number: str
    client_name: str
    amount: float
    issue_date: str
    due_date: str
    status: str  # "paid" ou "unpaid"

# Simulation d'une base de données en mémoire
fake_invoice_db = []

def create_invoice(invoice: Invoice):
    fake_invoice_db.append(invoice)
    return invoice

def get_all_invoices() -> List[Invoice]:
    return fake_invoice_db

def get_invoice_by_number(invoice_number: str) -> Invoice:
    for invoice in fake_invoice_db:
        if invoice.invoice_number == invoice_number:
            return invoice
    return None
