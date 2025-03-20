class Payslip:
    def __init__(self, salaire_brut, situation_familiale=None):
        self.salaire_brut = salaire_brut
        self.situation_familiale = situation_familiale  # Par exemple: "célibataire", "marié", etc.
        # Taux de cotisation (exemples génériques)
        self.securite_sociale_taux = 0.0635  # Cotisations communes
        self.chomage_taux = 0.0155  # Cotisation pour chômage
        self.formation_professionnelle_taux = 0.0010  # Cotisation pour formation professionnelle
        self.irpf_taux = self.calcul_irpf(salaire_brut)  # Calcul de l'IRPF en fonction du salaire brut

    def calcul_securite_sociale(self):
        """Calcul des cotisations pour la sécurité sociale"""
        cotisation_securite = self.salaire_brut * self.securite_sociale_taux
        cotisation_chomage = self.salaire_brut * self.chomage_taux
        cotisation_formation = self.salaire_brut * self.formation_professionnelle_taux
        return cotisation_securite, cotisation_chomage, cotisation_formation

    def calcul_irpf(self, salaire_brut):
        """Calcul de l'IRPF en fonction du salaire brut"""
        if salaire_brut <= 12450:
            return 0.19  # 19% d'impôt
        elif salaire_brut <= 20200:
            return 0.24  # 24% d'impôt
        elif salaire_brut <= 35200:
            return 0.30  # 30% d'impôt
        elif salaire_brut <= 60000:
            return 0.37  # 37% d'impôt
        else:
            return 0.47  # 47% d'impôt

    def calcul_irpf_montant(self):
        """Calcul du montant de l'IRPF"""
        return self.salaire_brut * self.irpf_taux

    def salaire_net(self):
        """Calcul du salaire net en soustrayant les cotisations et l'IRPF"""
        cotisations = sum(self.calcul_securite_sociale())
        irpf = self.calcul_irpf_montant()
        salaire_net = self.salaire_brut - cotisations - irpf
        return salaire_net
