from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from fpdf import FPDF
from twilio.rest import Client
from ia_module import predict_demand  # Module IA que tu vas créer

# Configuration de l'application Flask
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'votre_cle_secrete'  # Change cette clé par une clé secrète forte
jwt = JWTManager(app)
CORS(app)

# Utilisateurs simulés pour l'authentification (admin avec email et mot de passe modifiés)
users = {'admin@luma.com': 'admin123@', 'client@example.com': 'password'}

# Route de login avec JWT
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # Vérification des identifiants
    if email not in users or users[email] != password:
        return jsonify({"msg": "Identifiants invalides"}), 401

    # Création du token JWT pour l'utilisateur
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# Route pour obtenir des données de travail
@app.route('/data', methods=['GET'])
@jwt_required()  # Cette route nécessite un token JWT valide
def get_data():
    data = {
        'labels': ['Jan', 'Feb', 'Mar'],
        'values': [10, 20, 30]
    }
    return jsonify(data)

# Route pour prédiction avec IA (utilise scikit-learn dans ia_module)
@app.route('/predict', methods=['POST'])
@jwt_required()  # Cette route nécessite un token JWT valide
def predict():
    data = request.get_json()
    prediction = predict_demand(data['input'])
    return jsonify({'prediction': prediction})

# Route pour générer un rapport PDF
@app.route('/generate_report', methods=['GET'])
@jwt_required()  # Cette route nécessite un token JWT valide
def generate_report():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(200, 10, 'Rapport de charge de travail', 0, 1, 'C')
    pdf.output('rapport.pdf')
    return jsonify({"msg": "PDF généré avec succès"})

# Fonction pour envoyer des alertes (par exemple via Twilio)
def send_alert(message):
    client = Client('your_account_sid', 'your_auth_token')
    client.messages.create(
        body=message,
        from_='+1234567890',  # Ton numéro Twilio
        to='+0987654321'      # Numéro de destination
    )

# Démarrer l'application Flask
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Utilisation d'un port différent pour éviter les conflits
