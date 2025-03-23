import { useState } from "react";

const CandidatTable = ({ candidats }) => {
  const [selectedCandidat, setSelectedCandidat] = useState(null);

  const handleDetailsClick = (candidat) => {
    setSelectedCandidat(candidat);
  };

  const handleCloseModal = () => {
    setSelectedCandidat(null);
  };

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Téléphone</th>
            <th className="px-4 py-2">Expérience</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidats.map((candidat, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{candidat.name}</td>
              <td className="px-4 py-2">{candidat.email}</td>
              <td className="px-4 py-2">{candidat.phone}</td>
              <td className="px-4 py-2">{candidat.experience}</td>
              <td className="px-4 py-2 text-green-600">
                <button
                  onClick={() => handleDetailsClick(candidat)}
                  className="bg-transparent hover:bg-green-500 text-green-600 hover:text-white py-1 px-4 rounded-xl"
                >
                  Détails
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour afficher les détails du candidat */}
      {selectedCandidat && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 md:w-1/2">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              X
            </button>
            <h3 className="text-2xl font-semibold text-green-600 mb-4">
              Détails du candidat
            </h3>
            <p className="text-lg mb-2">
              <strong>Nom:</strong> {selectedCandidat.name}
            </p>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {selectedCandidat.email}
            </p>
            <p className="text-lg mb-2">
              <strong>Téléphone:</strong> {selectedCandidat.phone}
            </p>
            <p className="text-lg mb-2">
              <strong>Expérience:</strong> {selectedCandidat.experience}
            </p>

            {selectedCandidat.cv && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-green-600 mb-2">
                  CV du candidat
                </h4>
                <iframe
                  src={selectedCandidat.cv}
                  title="CV"
                  className="w-full h-96 border-2 border-gray-300 rounded-xl"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatTable;
