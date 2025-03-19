from pydantic import BaseModel
from typing import List

# Modèle de données pour un devis
class Quote(BaseModel):
    quote_number: str
    client_name: str
    amount: float
    issue_date: str
    status: str  # "draft", "sent", "accepted"

# Simulation d'une base de données en mémoire
fake_quote_db = []

def create_quote(quote: Quote):
    fake_quote_db.append(quote)
    return quote

def get_all_quotes() -> List[Quote]:
    return fake_quote_db

def get_quote_by_number(quote_number: str) -> Quote:
    for quote in fake_quote_db:
        if quote.quote_number == quote_number:
            return quote
    return None
