import React, { useState } from "react";
import axios from "axios";
import CompanyDetails from "./CompanyDetails";
import { saveCompanyToLocalStorage } from "../utils/storageUtils";

const CompanySearch = () => {
  const [cnpj, setCnpj] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState(null);

  const searchCompany = async () => {
    try {
      const cleanedCnpj = cnpj.replace(/[^\d]/g, "");
      const response = await axios.get(`http://localhost:3001/company/search/${cleanedCnpj}`);
      setCompanyData(response.data);
      setError(null);
    } catch (err) {
      setError("Empresa não encontrada ou erro na requisição");
      setCompanyData(null);
    }
  };

  const handleClose = () => {
    setCompanyData(null);
    setCnpj("");
    setError(null);
  };

  const handleSave = () => {
    if (companyData) {
      saveCompanyToLocalStorage(companyData);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Consulta CNPJ</h1>
      <p className="text-gray-600 mb-6">Digite o CNPJ para consultar as informações da empresa.</p>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="Digite o CNPJ"
          className="border border-gray-300 rounded p-2 w-60"
        />
        <button
          onClick={searchCompany}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {companyData && (
        <div className="w-full max-w-4xl">
    
          <CompanyDetails data={companyData} onSave={handleSave} onClose={handleClose} />

        </div>
      )}
    </div>
  );
};

export default CompanySearch;
