import { useState } from "react";
import Dashboard from "./Dashboard";

import { formatarData } from "../utils/formatters";

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
  
    const [campoOrdenacao, setCampoOrdenacao] = useState("id"); // Coluna ativa
    const [direcao, setDirecao] = useState("asc"); // 'asc' ou 'desc'
    const [menuAberto, setMenuAberto] = useState(null);
  
    const dadosOrdenados = [...emissoes].sort((a, b) => {
      let valA = a[campoOrdenacao];
      let valB = b[campoOrdenacao];
      if (typeof valA === "number") {
        return direcao === "asc" ? valA - valB : valB - valA;
      }
      return direcao === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  
    const aplicarOrdem = (campo, dir) => {
      setCampoOrdenacao(campo);
      setDirecao(dir);
      setMenuAberto(null); // Fecha o menu após escolher
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
  
          <button
            className="btn-limpar"
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
                <th className="th-ordenavel">
                  <div className="header-cell">
                    Data
                    <button
                      className="btn-filtro-icone"
                      onClick={() =>
                        setMenuAberto(menuAberto === "data" ? null : "data")
                      }
                    >
                      ≔ {/* Adicionei o ícone de engrenagem aqui */}
                    </button>
                  </div>
                  {menuAberto === "data" && (
                    <div className="menu-suspenso">
                      <button onClick={() => aplicarOrdem("data", "asc")}>
                        ↑ Antigas
                      </button>
                      <button onClick={() => aplicarOrdem("data", "desc")}>
                        ↓ Recentes
                      </button>
                    </div>
                  )}
                </th>
                <th>Emissor</th>
                <th>Tipo</th>
                <th className="th-ordenavel">
                  <div className="header-cell">
                    Valor
                    <button
                      className="btn-filtro-icone"
                      onClick={() =>
                        setMenuAberto(menuAberto === "valor" ? null : "valor")
                      }
                    >
                      ≔{" "}
                      {/* Substituí o caractere estranho por um ícone visível */}
                    </button>
                  </div>
                  {menuAberto === "valor" && (
                    <div className="menu-suspenso">
                      <button onClick={() => aplicarOrdem("valor", "asc")}>
                        ↑ Menor Valor
                      </button>
                      <button onClick={() => aplicarOrdem("valor", "desc")}>
                        ↓ Maior Valor
                      </button>
                    </div>
                  )}
                </th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {dadosOrdenados.map((item) => (
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

        <Dashboard stats={stats} />

      </div>
    );
  }

  export default TelaListagem;