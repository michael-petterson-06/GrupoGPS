import React, { useEffect, useState } from 'react';
import CompanyDetails from './CompanyDetails';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const savedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    setCompanies(savedCompanies);
  }, []);

  const handleSelect = (cnpj) => {
    const savedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    const company = savedCompanies.find((c) => c.cnpj === cnpj);
    setSelectedCompany(company);
  };

  const handleClose = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Companias Cadastradas</h2>

      {selectedCompany ? (
        <CompanyDetails data={selectedCompany} onClose={handleClose} />
      ) : companies.length === 0 ? (
        <p className="text-center text-gray-600">Nenhuma empresa salva.</p>
      ) : (
        <div className="max-w-3xl mx-auto">
          <table className="w-full border text-sm text-center bg-white shadow rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Nome</th>
                <th className="border p-2">CNPJ</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={index}
                  className="border hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelect(company.cnpj)}
                >
                  <td className="border p-2">{company.nome}</td>
                  <td className="border p-2">{company.cnpj}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
