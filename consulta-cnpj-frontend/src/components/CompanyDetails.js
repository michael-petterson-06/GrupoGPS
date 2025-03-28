import React from 'react';

const CompanyDetails = ({ data, onSave, onClose }) => {
  if (!data) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-end mb-2 gap-2">
          {onSave && (
             <button
                 onClick={onSave}
                 className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Salvar
            </button>
          )}
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Fechar
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Dados da Empresa</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-center">
          <tr>
            <th className="border p-2 w-1/3">Campo</th>
            <th className="border p-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 text-center">Última Atualização</td>
            <td className="border p-2 text-center">{new Date(data.ultima_atualizacao).toLocaleDateString('pt-BR')}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Número de Inscrição</td>
            <td className="border p-2 text-center">{data.cnpj}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Data de Abertura</td>
            <td className="border p-2 text-center">{data.abertura}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Nome Empresarial</td>
            <td className="border p-2 text-center">{data.nome}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Situação Cadastral</td>
            <td className="border p-2 text-center">{data.situacao}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Data da Situação Cadastral</td>
            <td className="border p-2 text-center">{data.data_situacao}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Motivo da Situação</td>
            <td className="border p-2 text-center">{data.motivo_situacao || "Não informado"}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Capital Social</td>
            <td className="border p-2 text-center">R$ {data.capital_social}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Endereço</td>
            <td className="border p-2 text-center">
              {`${data.logradouro}, ${data.numero} ${data.complemento || ""}, ${data.bairro}, ${data.municipio} - ${data.uf}, CEP: ${data.cep}`}
            </td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Email</td>
            <td className="border p-2 text-center">{data.email || "Não informado"}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Telefone</td>
            <td className="border p-2 text-center">{data.telefone || "Não informado"}</td>
          </tr>
          <tr>
            <td className="border p-2 text-center">Optante pelo Simples Nacional</td>
            <td className="border p-2 text-center">{data.simples?.optante ? "Sim" : "Não"}</td>
          </tr>
          {data.simples?.optante && (
            <>
              <tr>
                <td className="border p-2 text-center">Data de Opção</td>
                <td className="border p-2 text-center">{data.simples.data_opcao}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">Data de Exclusão</td>
                <td className="border p-2 text-center">{data.simples.data_exclusao}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      <h3 className="text-lg font-bold mt-6 text-gray-800 text-center">Atividade Econômica Primária</h3>
      <div className="flex justify-center">
        <table className="w-3/4 border mt-2 text-sm text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Código</th>
              <th className="border p-2">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {data.atividade_principal.map((atividade, index) => (
              <tr key={index} className="border">
                <td className="p-2">{atividade.code}</td>
                <td className="p-2">{atividade.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.atividades_secundarias.length > 0 && (
        <>
          <h3 className="text-lg font-bold mt-6 text-gray-800 text-center">Atividades Econômicas Secundárias</h3>
          <div className="flex justify-center">
            <table className="w-3/4 border mt-2 text-sm text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Código</th>
                  <th className="border p-2">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {data.atividades_secundarias.map((atividade, index) => (
                  <tr key={index} className="border">
                    <td className="p-2">{atividade.code}</td>
                    <td className="p-2">{atividade.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyDetails;