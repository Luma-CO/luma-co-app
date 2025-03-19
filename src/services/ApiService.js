import axios from "axios";

const API_URL = "http://localhost:8000"; // Remplacer par l'URL de ton backend

const ApiService = {
  // Fonction de login
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // Fonction pour générer la fiche de paie
  async generatePayslip(data) {
    try {
      const response = await axios.post(`${API_URL}/generate-payslip`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error generating payslip:", error);
      throw error;
    }
  },

  // Fonction pour obtenir tous les contrats
  async getContracts() {
    try {
      const res = await axios.get(`${API_URL}/contracts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Si nécessaire, ajoute un header d'authentification
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching contracts:", error);
      throw error;
    }
  },

  // Fonction pour ajouter un contrat
  async addContract(contract) {
    try {
      const res = await axios.post(`${API_URL}/contracts`, contract, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Si nécessaire, ajoute un header d'authentification
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error adding contract:", error);
      throw error;
    }
  },

  // Fonction pour créer une facture
  async createInvoice(invoice) {
    try {
      const response = await axios.post(`${API_URL}/create-invoice`, invoice, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la facture :", error);
      throw error;
    }
  },

  // Fonction pour récupérer toutes les factures
  async getInvoices() {
    try {
      const response = await axios.get(`${API_URL}/invoices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des factures :", error);
      throw error;
    }
  },

  // Fonction pour récupérer une facture par son numéro
  async getInvoiceByNumber(invoice_number) {
    try {
      const response = await axios.get(`${API_URL}/invoice/${invoice_number}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la facture :", error);
      throw error;
    }
  },

  // Fonction pour créer un devis
  async createQuote(quote) {
    try {
      const response = await axios.post(`${API_URL}/create-quote`, quote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création du devis :", error);
      throw error;
    }
  },

  // Fonction pour récupérer tous les devis
  async getQuotes() {
    try {
      const response = await axios.get(`${API_URL}/quotes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des devis :", error);
      throw error;
    }
  },
};

export default ApiService;
