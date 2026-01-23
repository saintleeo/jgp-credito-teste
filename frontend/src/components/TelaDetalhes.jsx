import { useState } from "react";
import api from "../services/api";

function TelaDetalhes({ emissao, onVoltar }) {
  if (!emissao) return null;

  const [emissor, setEmissor] = useState(emissao.emissor);
  const [tipo, setTipo] = useState(emissao.tipo);
  const [data, setData] = useState(emissao.data);
  const [valor, setValor] = useState(emissao.valor);

  const foiAlterado =
    emissor !== emissao.emissor ||
    tipo !== emissao.tipo ||
    data !== emissao.data ||
    Number(valor) !== Number(emissao.valor);

  const salvarNoPython = async () => {
    try {
      await api.put(`/emissoes/${emissao.id}`, {
        emissor,
        tipo,
        data,
        valor: Number(valor),
      });
      alert("Alterações salvas com sucesso.");
      onVoltar();
    } catch {
      alert("Erro ao salvar alterações");
    }
  };

  return (
    <div className="detalhes-wrapper">
      <div className="detalhes-card">
        <button className="btn-voltar-top" onClick={onVoltar}>
          ← Voltar para a Lista
        </button>

        <h2 className="detalhes-titulo">Detalhes da Emissão #{emissao.id}</h2>

        <div className="detalhes-grid">
          <div className="form-group">
            <label>Data de Encerramento:</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="input-normal"
            />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="input-normal"
            >
              <option value="CRI">CRI</option>
              <option value="CRA">CRA</option>
              <option value="DEB">DEB</option>
              <option value="NC">NC</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Emissor:</label>
            <input
              type="text"
              value={emissor}
              onChange={(e) => setEmissor(e.target.value)}
              className="input-normal"
            />
          </div>

          <div className="form-group">
            <label>Link:</label>
            <p className="emissor-Link">
              <a href={emissao.link} target="_blank" className="testar-link">
                Abrir Registro Oficial
              </a>
            </p>
          </div>

          <div className="form-group">
            <label>Valor da Oferta (R$):</label>
            <div className="input-moeda-wrapper">
              <span className="simbolo-monetario">R$</span>
              <input
                type="number"
                step="0.01" // Permite decimais como 12.50
                className="input-normal input-com-prefixo"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          className="btn-salvar-detalhes"
          onClick={salvarNoPython}
          disabled={!foiAlterado}
          style={{
            backgroundColor: foiAlterado ? "#28a745" : "#ccc",
            cursor: foiAlterado ? "pointer" : "not-allowed",
          }}
        >
          {foiAlterado ? "Salvar Alterações" : "Nenhuma alteração feita"}
        </button>
      </div>
    </div>
  );
}

export default TelaDetalhes;
