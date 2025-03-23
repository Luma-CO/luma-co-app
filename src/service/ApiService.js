import axios from "axios";

const API_URL = "http://localhost:8001"; // URL de ton backend

// Création d'une instance Axios avec les configurations par défaut
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour récupérer le token stocké
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ApiService = {
  // ✅ Fonction de connexion
  async login(username, password) {
    return this.request("post", "/login", { username, password });
  },

  // ✅ Récupérer les données du dashboard
  async getDashboardData() {
    return this.request("get", "/dashboard");
  },

  // ✅ Générer une fiche de paie
  async generatePayslip(data) {
    return this.request("post", "/generate-payslip", data);
  },

  // ✅ Récupérer tous les contrats
  async getContrats() {
    return this.request("get", "/contrats");
  },

  // ✅ Ajouter un contrat
  async createContrat(contrat) {
    return this.request("post", "/contrats", contrat);
  },

  // ✅ Récupérer tous les employés
  async getEmployees() {
    return this.request("get", "/employees");
  },

  // ✅ Ajouter un employé
  async createEmployee(employee) {
    return this.request("post", "/employees", employee);
  },

  // ✅ Créer une facture
  async createInvoice(invoice) {
    return this.request("post", "/create-invoice", invoice);
  },

  // ✅ Récupérer toutes les factures
  async getInvoices() {
    return this.request("get", "/invoices");
  },

  // ✅ Récupérer une facture par son numéro
  async getInvoiceByNumber(invoice_number) {
    return this.request("get", `/invoice/${invoice_number}`);
  },

  // ✅ Créer un devis
  async createQuote(quote) {
    return this.request("post", "/create-quote", quote);
  },

  // ✅ Récupérer tous les devis
  async getQuotes() {
    return this.request("get", "/quotes");
  },

  // ✅ Récupérer les demandes de congés
  async getLeaveRequests() {
    return this.request("get", "/leave-requests");
  },

  // ✅ Ajouter une demande de congé
  async createLeaveRequest(leaveRequest) {
    return this.request("post", "/leave-requests", leaveRequest);
  },

  // ✅ Associer un client à une facture
  async associateClientWithInvoice(clientId, invoiceId) {
    return this.request("post", "/associate-client-invoice", {
      clientId,
      invoiceId,
    });
  },

  // ✅ Associer un employé à son contrat et fiche de paie
  async associateEmployeeWithContractAndPayslip(
    employeeId,
    contractId,
    payslipId
  ) {
    return this.request("post", "/associate-employee", {
      employeeId,
      contractId,
      payslipId,
    });
  },

  // ✅ Récupérer tous les clients
  async getClients() {
    return this.request("get", "/clients");
  },

  // ✅ Créer un nouveau client
  async createClient(client) {
    return this.request("post", "/clients", client);
  },

  // ✅ Méthode générique pour toutes les requêtes
  async request(method, endpoint, data = null) {
    try {
      const response = await apiClient({
        method,
        url: endpoint,
        data,
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(
        `Erreur API (${method.toUpperCase()} ${endpoint}):`,
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  },
};

export default ApiService;
