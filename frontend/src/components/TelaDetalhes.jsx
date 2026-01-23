import { useState } from "react";
import api from "../services/api";

function TelaDetalhes({ emissao, onVoltar }) {
  if (!emissao) return null;

  const [emissor, setEmissor] = useState(emissao.emissor);
  const [tipo, setTipo] = useState(emissao.tipo);
  const [data, setData] = useState(emissao.data);
  const [valor, setValor] = useState(String(emissao.valor));


  const [erros, setErros] = useState({});

  const foiAlterado =
    emissor !== emissao.emissor ||
    tipo !== emissao.tipo ||
    data !== emissao.data ||
    Number(valor) !== Number(emissao.valor);

  function validar() {
    const novosErros = {};

    if (!data) novosErros.data = "Data é obrigatória";
    else if (new Date(data) > new Date())
      novosErros.data = "Data não pode ser futura";

    if (!tipo) novosErros.tipo = "Tipo é obrigatório";

    if (!emissor || emissor.trim().length < 3)
      novosErros.emissor = "Emissor deve ter ao menos 3 caracteres";

    if (!valor || Number(valor) < 0)
      novosErros.valor = "Valor não deve ser negativo!";

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  const salvarNoPython = async () => {
    try {
      const payload = {};
  
      if (emissor !== emissao.emissor) payload.emissor = emissor;
      if (tipo !== emissao.tipo) payload.tipo = tipo;
      if (data !== emissao.data) payload.data = data;
      if (Number(valor) !== Number(emissao.valor)) {
        payload.valor = Number(valor);
      }
  
      await api.put(`/emissoes/${emissao.id}`, payload);
  
      alert("Alterações salvas com sucesso.");
      onVoltar();
    } catch (err) {
      alert(err.response?.data?.detail || "Erro ao salvar alterações");
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
              className={
                data !== emissao.data ? "input-alterado" : "input-normal"
              }
            />
            {erros.data && (
              <span className="aviso-alteracao">{erros.data}</span>
            )}
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={
                tipo !== emissao.tipo ? "input-alterado" : "input-normal"
              }
            >
              <option value="CRI">CRI</option>
              <option value="CRA">CRA</option>
              <option value="DEB">DEB</option>
              <option value="NC">NC</option>
            </select>
            {erros.tipo && (
              <span className="aviso-alteracao">{erros.tipo}</span>
            )}
          </div>

          <div className="form-group full-width">
            <label>Emissor:</label>
            <input
              type="text"
              value={emissor}
              onChange={(e) => setEmissor(e.target.value)}
              className={
                emissor !== emissao.emissor ? "input-alterado" : "input-normal"
              }
            />
            {erros.emissor && (
              <span className="aviso-alteracao">{erros.emissor}</span>
            )}
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
                step="0.01"
                className="input-normal input-com-prefixo"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
              />
            </div>
            {erros.valor && (
              <span className="aviso-alteracao">{erros.valor}</span>
            )}
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
