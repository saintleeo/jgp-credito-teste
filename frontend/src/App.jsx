import { useState, useEffect } from "react";
import "./App.css";

import api from "./services/api";
import TelaListagem from "./components/TelaListagem";
import TelaDetalhes from "./components/TelaDetalhes";

function App() {
  const [emissoes, setEmissoes] = useState([]);
  const [telaAtual, setTelaAtual] = useState("listagem");
  const [emissaoSelecionada, setEmissaoSelecionada] = useState(null);
  const [stats, setStats] = useState(null);
  // Buscar dados na API.
  const carregarDados = async (filtros = {}) => {
    try {
      const res = await api.get("/emissoes", {
        params: filtros,
      });
      setEmissoes(res.data);

      const resStats = await api.get("/emissoes/stats");
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
      const res = await api.get(
        `/emissoes/${emissao.id}`
      );
      setEmissaoSelecionada(res.data);
      setTelaAtual("detalhes");
    } catch (err) {

      alert("Não foi possível carregar os dados atualizados.");
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

export default App;
