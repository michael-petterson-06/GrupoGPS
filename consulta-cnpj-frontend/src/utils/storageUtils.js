// src/utils/storageUtils.js
export function saveCompanyToLocalStorage(company) {
  const savedCompanies = JSON.parse(localStorage.getItem('companies')) || [];

  const alreadyExists = savedCompanies.some(
    (c) => c.cnpj === company.cnpj
  );

  if (alreadyExists) {
    alert('Esta empresa já foi salva.');
    return false;
  }

  savedCompanies.push(company);
  localStorage.setItem('companies', JSON.stringify(savedCompanies));
  alert('Empresa salva no localStorage!');
  return true;
}
