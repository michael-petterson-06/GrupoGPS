import React, { useState } from 'react';
import axios from 'axios';
import CompanyDetails from './CompanyDetails';
import { saveCompanyToLocalStorage } from '../utils/storageUtils';

const MultiCnpjSearch = () => {
  const [cnpjs, setCnpjs] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSearch = async () => {
    const list = cnpjs.split(',').map((c) => c.trim().replace(/[^0-9]/g, ''));
    try {
      const response = await axios.post('http://localhost:3001/company/search-multiple-cnpjs', { cnpjs: list });
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar os CNPJs');
      setResults([]);
    }
  };

  const handleSelect = async (cnpj) => {
    try {
      const response = await axios.get(`http://localhost:3001/company/search/${cnpj}`);
      setSelectedCompany(response.data);
    } catch (err) {
      alert('Erro ao buscar dados da empresa.');
    }
  };

  const handleClose = () => {
    setSelectedCompany(null);
  };

    const handleSave = () => {
      if (selectedCompany) {
        saveCompanyToLocalStorage(selectedCompany);
      }
    };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h2 className="text-2xl font-bold text-center mb-4">Consulta Múltipla de CNPJs</h2>
      <p className="text-center text-sm text-gray-600 mb-4">Separe os CNPJs por vírgula</p>

      <div className="flex justify-center mb-4">
        <textarea
          value={cnpjs}
          onChange={(e) => setCnpjs(e.target.value)}
          rows="4"
          className="w-full max-w-xl border rounded p-2"
          placeholder="Digite vários CNPJs separados por vírgula"
        ></textarea>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="mt-6 max-w-4xl mx-auto relative z-0">
        {results.map((company, index) => (
          <div
            key={index}
            className="mb-4 bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => handleSelect(company.cnpj.replace(/[^0-9]/g, ''))}
          >
            <p><strong>Nome:</strong> {company.nome}</p>
            <p><strong>CNPJ:</strong> {company.cnpj}</p>
            <p><strong>Situação:</strong> {company.situacao}</p>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gray-50 bg-opacity-95 p-6 min-h-screen">
          <CompanyDetails data={selectedCompany} onClose={handleClose} onSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default MultiCnpjSearch;
