import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const formatarData = (dataString) => {
  if (!dataString) return "";
  // Se a data vier no formato AAAA-MM-DD
  const [ano, mes, dia] = dataString.split("-");
  return `${dia}/${mes}/${ano}`;
};

function App() {
  const [emissoes, setEmissoes] = useState([]);
  const [telaAtual, setTelaAtual] = useState("listagem");
  const [emissaoSelecionada, setEmissaoSelecionada] = useState(null);
  const [stats, setStats] = useState(null);
  // Buscar dados na API.
  const carregarDados = async (filtros = {}) => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/emissoes", {
        params: filtros,
      });
      setEmissoes(res.data);

      const resStats = await axios.get("http://127.0.0.1:8000/emissoes/stats");
      setStats(resStats.data);
    } catch (err) {
      console.error("Erro ao carregar:", err);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  //Detalhes
  const irParaDetalhes = async (emissao) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/emissoes/${emissao.id}`
      );
      setEmissaoSelecionada(res.data);
      setTelaAtual("detalhes");
    } catch {
      console.error("Erro ao buscar detalhes:", err);
      alert("Não foi possível carregar os dados atualizados desta emissão.");
    }
  };

  const voltarParaListagem = () => {
    setEmissaoSelecionada(null);
    setTelaAtual("listagem");
    carregarDados();
  };

  return (
    <div className="app-container">
      {telaAtual === "listagem" && (
        <TelaListagem
          emissoes={emissoes}
          onVerDetalhes={irParaDetalhes}
          stats={stats}
          onFiltrar={carregarDados}
        />
      )}

      {telaAtual === "detalhes" && (
        <TelaDetalhes
          emissao={emissaoSelecionada}
          onVoltar={voltarParaListagem}
        />
      )}
    </div>
  );
}

function TelaListagem({ emissoes, onVerDetalhes, stats, onFiltrar }) {
  //Estados para cada filtro
  const [filtroEmissor, setFiltroEmissor] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroData, setFiltroData] = useState("");

  // Função que agrupa todos os filtros e envia para o App.jsx
  const dispararFiltros = () => {
    onFiltrar({
      emissor: filtroEmissor,
      tipo: filtroTipo,
      data: filtroData,
    });
  };

  return (
    <div className="fade-in">
      <h2>Painel de Emissões</h2>
      <div className="filter-box">
        <input
          type="text"
          placeholder="Emissor..."
          value={filtroEmissor}
          onChange={(e) => setFiltroEmissor(e.target.value)}
        />

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Todos os Tipos</option>
          <option value="CRA">CRA</option>
          <option value="CRI">CRI</option>
          <option value="DEB">DEB</option>
          <option value="NC">NC</option>
        </select>

        <input
          type="date"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
        />

        <button onClick={dispararFiltros}>🔍 Filtrar</button>

        <button className="btn-limpar"
          onClick={() => {
            setFiltroEmissor("");
            setFiltroTipo("");
            setFiltroData("");
            onFiltrar({});
          }}
          style={{ background: "#cc0000" }}
        >
          Limpar
        </button>
      </div>

      <div className="tabela-wrapper">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Emissor</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {emissoes.map((item) => (
              <tr key={item.id}>
                <td>{formatarData(item.data)}</td>
                <td>{item.emissor}</td>
                <td>
                  <span className={`tag-${item.tipo}`}>{item.tipo}</span>
                </td>
                <td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.valor)}
                </td>
                <td>
                  <button onClick={() => onVerDetalhes(item)}>🔍 Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {stats && (
        <div className="stats-container">
          <div className="card">
            <h3>Total Emitido</h3>
            <p>{stats.valor_total_formatado}</p>
          </div>
          <div className="card">
            <h3>Qtd. Ofertas</h3>
            <p>{stats.contagem_total}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TelaDetalhes({ emissao, onVoltar }) {
  if (!emissao) return <div>Selecione uma emissão na tabela...</div>;

  const [valorEditado, setValorEditado] = useState(emissao.valor);

  const foiAlterado = Number(valorEditado) !== Number(emissao.valor);

  const salvarNoPython = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/emissoes/${emissao.id}`, {
        valor: Number(valorEditado),
      });
      alert("Alteração salva com sucesso!");
      onVoltar(); // Volta para a tabela
    } catch (err) {
      alert("Erro ao salvar no servidor.");
    }
  };

  return (
    <div className="detalhes-container">
      <button
        onClick={onVoltar}
        style={{ marginBottom: "20px", background: "#666" }}
      >
        ← Voltar para a Lista
      </button>

      <h2>Detalhes da Emissão #{emissao.id}</h2>
      <div className="form-group">
        <label>Data da Emissão:</label>
        <p>
          <strong>{formatarData(emissao.data)}</strong>
        </p>
      </div>

      <div className="form-group">
        <label>Emissor:</label>
        <p>
          <strong>{emissao.emissor}</strong>
        </p>
      </div>

      <div className="form-group">
        <label>Tipo:</label>
        <p>{emissao.tipo}</p>
      </div>

      <div className="form-group">
        <label>Valor da Oferta (R$):</label>
        <input
          type="number"
          value={valorEditado}
          onChange={(e) => setValorEditado(e.target.value)}
          className={foiAlterado ? "input-alterado" : ""}
        />

        {foiAlterado && (
          <p className="aviso-alteracao">
            ⚠️ Atenção: Você alterou o valor original (Era: R$ {emissao.valor})
          </p>
        )}
      </div>

      <button
        onClick={salvarNoPython}
        disabled={!foiAlterado}
        style={{
          marginTop: "20px",
          backgroundColor: foiAlterado ? "#28a745" : "#ccc",
        }}
      >
        Salvar Alterações
      </button>
    </div>
  );
}
export default App;
