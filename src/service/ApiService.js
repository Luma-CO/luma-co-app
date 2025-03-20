import axios from "axios";

const API_URL = "http://localhost:8001"; // Remplacer par l'URL de ton backend

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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching contracts:", error);
      throw error;
    }
  },

  // Fonction pour ajouter un contrat
  async createContract(contract) {
    try {
      const res = await axios.post(`${API_URL}/contracts`, contract, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error creating contract:", error);
      throw error;
    }
  },

  // Fonction pour récupérer tous les employés
  async getEmployees() {
    try {
      const response = await axios.get(`${API_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  // Fonction pour ajouter un employé
  async createEmployee(employee) {
    try {
      const response = await axios.post(`${API_URL}/employees`, employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding employee:", error);
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

  // Fonction pour récupérer les demandes de congés
  async getLeaveRequests() {
    try {
      const response = await axios.get(`${API_URL}/leave-requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des demandes de congés :",
        error
      );
      throw error;
    }
  },

  // Fonction pour ajouter une demande de congé
  async createLeaveRequest(leaveRequest) {
    try {
      const response = await axios.post(
        `${API_URL}/leave-requests`,
        leaveRequest,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la création de la demande de congé :",
        error
      );
      throw error;
    }
  },

  // Fonction pour associer un client à une facture
  async associateClientWithInvoice(clientId, invoiceId) {
    try {
      const response = await axios.post(
        `${API_URL}/associate-client-invoice`,
        { clientId, invoiceId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de l'association du client avec la facture :",
        error
      );
      throw error;
    }
  },

  // Fonction pour associer un employé à son contrat et sa fiche de paie
  async associateEmployeeWithContractAndPayslip(
    employeeId,
    contractId,
    payslipId
  ) {
    try {
      const response = await axios.post(
        `${API_URL}/associate-employee`,
        { employeeId, contractId, payslipId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de l'association de l'employé avec son contrat et sa fiche de paie :",
        error
      );
      throw error;
    }
  },

  // Fonction pour récupérer tous les clients
  async getClients() {
    try {
      const response = await axios.get(`${API_URL}/clients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Erreur lors de la récupération des clients", err);
      throw err;
    }
  },

  // Fonction pour créer un nouveau client
  async createClient(client) {
    try {
      const response = await axios.post(`${API_URL}/clients`, client, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Erreur lors de la création du client", err);
      throw err;
    }
  },
};

export default ApiService;
