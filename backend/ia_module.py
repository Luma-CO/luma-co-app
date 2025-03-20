# backend/ia_module.py
from sklearn.ensemble import RandomForestClassifier
import numpy as np

# Exemple d'un modèle très simple pour prédire la demande
def predict_demand(input_data):
    # Ici tu peux charger ton modèle scikit-learn depuis un fichier .pkl, par exemple
    model = RandomForestClassifier()  # Juste un modèle de test ici

    # Utiliser les données d'entrée pour faire une prédiction (en supposant que ce sont des données valides)
    prediction = model.predict(np.array([input_data]))  # Format attendu pour la prédiction

    return prediction.tolist()  # Retourne la prédiction sous forme de liste
