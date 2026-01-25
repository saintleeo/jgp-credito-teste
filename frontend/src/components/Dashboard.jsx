import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CORES_POR_TIPO = {
  CRA: "#2e7d32",
  CRI: "#1976d2",
  DEB: "#ef6c00",
  NC: "#9a0d51",
};

const formatarMoeda = (valor) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

const formatarMoedaCurta = (valor) => {
  if (valor >= 1_000_000_000)
    return `R$ ${(valor / 1_000_000_000).toFixed(1)}B`;
  if (valor >= 1_000_000) return `R$ ${(valor / 1_000_000).toFixed(1)}M`;
  return formatarMoeda(valor);
};

export default function Dashboard({ stats }) {
  if (!stats || !stats.por_tipo?.length) return null;

  return (
    <section className="dashboard">
      {/* CARDS */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total de Emissões</h3>
          <strong>{stats.contagem_total}</strong>
        </div>

        <div className="card">
          <h3>Valor total emitido</h3>
          <strong>{stats.valor_total_formatado}</strong>
        </div>
      </div>

      {/* GRÁFICO */}
      <div className="dashboard-chart">
        <h3 className="chart-title">Distribuição por Tipo</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.por_tipo}
              dataKey="valor"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ value }) => formatarMoedaCurta(value)}
            >
              {stats.por_tipo.map((item, index) => {
                const cor =
                  CORES_POR_TIPO[item.tipo.toUpperCase().trim()] || "#999";

                return <Cell key={`cell-${index}`} fill={cor} />;
              })}
            </Pie>

            <Tooltip formatter={(value) => formatarMoeda(value)} />

            <Legend formatter={(value) => value} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
