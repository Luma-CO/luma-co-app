import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download, Mail } from "lucide-react";

export default function FactureTable({ factures, clients, onDelete, onEdit }) {
  // Trouver le nom du client à partir de son ID
  const getClientName = (clientId) => {
    const client = clients.find((c) => c._id === clientId);
    return client ? client.name : "Client inconnu";
  };

  // Générer un PDF pour une facture
  const generatePDF = async (facture) => {
    const input = document.getElementById(`facture-${facture._id}`);

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 120);
    pdf.save(`facture_${facture._id}.pdf`);
  };

  // Envoyer la facture par mail
  const sendInvoiceByEmail = async (facture) => {
    const input = document.getElementById(`facture-${facture._id}`);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 120);
    const pdfData = pdf.output("datauristring").split(",")[1]; // Convertir en base64

    const response = await fetch("/send-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: facture.clientEmail, // Email du client
        pdfData: pdfData,
      }),
    });

    if (response.ok) {
      alert("Facture envoyée par mail !");
    } else {
      alert("Erreur lors de l'envoi !");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-green-600 mb-6">
        Liste des Factures
      </h2>

      {/* Tableau des factures */}
      <table className="w-full border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Client</th>
            <th className="py-3 px-4 text-left">Montant</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {factures.length > 0 ? (
            factures.map((facture) => (
              <tr key={facture._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{getClientName(facture.clientId)}</td>
                <td className="py-3 px-4">{facture.amount} €</td>
                <td className="py-3 px-4">{facture.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      facture.status === "Payée"
                        ? "bg-green-500"
                        : facture.status === "Annulée"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {facture.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(facture)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDelete(facture._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => generatePDF(facture)}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <Download size={18} className="mr-2" />
                    PDF
                  </button>
                  <button
                    onClick={() => sendInvoiceByEmail(facture)}
                    className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                  >
                    <Mail size={18} className="mr-2" />
                    Envoyer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                Aucune facture disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Affichage sous forme de carte */}
      <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {factures.map((facture) => (
          <div
            key={facture._id}
            className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition"
            id={`facture-${facture._id}`}
          >
            <h3 className="text-lg font-semibold text-green-600">
              {getClientName(facture.clientId)}
            </h3>
            <p className="text-gray-600">Montant: {facture.amount} €</p>
            <p className="text-gray-600">Date: {facture.date}</p>
            <p
              className={`mt-2 px-3 py-1 rounded-full text-white ${
                facture.status === "Payée"
                  ? "bg-green-500"
                  : facture.status === "Annulée"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {facture.status}
            </p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => onEdit(facture)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(facture._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
