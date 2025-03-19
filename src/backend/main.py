from fastapi import FastAPI, Depends, HTTPException
from typing import List
from services.payroll_service import Payslip
from models import PayslipRequest
from auth import router as auth_router, get_current_user
from billing_service import create_invoice, get_all_invoices, get_invoice_by_number, Invoice
from quote_service import create_quote, get_all_quotes, get_quote_by_number, Quote

app = FastAPI()

# Routes d'authentification
app.include_router(auth_router)

# Route pour générer la fiche de paie
@app.post("/generate-payslip")
def generate_payslip(contrat: PayslipRequest, username: str = Depends(get_current_user)):
    payslip = Payslip(contrat.salaire_brut)
    salaire_net = payslip.salaire_net()
    return {"salaire_brut": contrat.salaire_brut, "salaire_net": salaire_net}

# Routes pour la gestion des factures
@app.post("/create-invoice", response_model=Invoice)
def create_invoice_endpoint(invoice: Invoice):
    return create_invoice(invoice)

@app.get("/invoices", response_model=List[Invoice])
def get_invoices():
    return get_all_invoices()

@app.get("/invoice/{invoice_number}", response_model=Invoice)
def get_invoice(invoice_number: str):
    invoice = get_invoice_by_number(invoice_number)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

# Routes pour la gestion des devis
@app.post("/create-quote", response_model=Quote)
def create_quote_endpoint(quote: Quote):
    return create_quote(quote)

@app.get("/quotes", response_model=List[Quote])
def get_quotes():
    return get_all_quotes()

@app.get("/quote/{quote_number}", response_model=Quote)
def get_quote(quote_number: str):
    quote = get_quote_by_number(quote_number)
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote
