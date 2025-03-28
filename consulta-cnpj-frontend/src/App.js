import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CompanySearch from './components/CompanySearch';
import CompanyList from './components/CompanyList';
import './App.css';
import MultiCnpjSearch from './components/MultiCnpjSearch';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav className="flex justify-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'underline font-semibold text-white'
                  : 'hover:underline text-white'
              }
            >
              Consulta CNPJ
            </NavLink>
            <NavLink
              to="/multi-cnpj"
              className={({ isActive }) =>
                isActive ? 'underline font-semibold text-white' : 'hover:underline text-white'
              }
            >
            Consulta Múltipla
           </NavLink>
            <NavLink
              to="/list"
              className={({ isActive }) =>
                isActive
                  ? 'underline font-semibold text-white'
                  : 'hover:underline text-white'
              }
            >
              Empresas Salvas
            </NavLink>
          </nav>
        </header>

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<CompanySearch />} />
            <Route path="/multi-cnpj" element={<MultiCnpjSearch />} />
            <Route path="/list" element={<CompanyList />} />
          </Routes>
        </main>

        <footer className="text-center text-sm text-gray-500 p-4 bg-white border-t">
          © 2025 Consulta CNPJ. Todos os direitos reservados.
        </footer>
      </div>
    </Router>
  );
}

export default App;
