const CandidatTable = ({ candidats }) => {
  return (
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
              <button className="bg-transparent hover:bg-green-500 text-green-600 hover:text-white py-1 px-4 rounded-xl">
                Détails
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandidatTable;
