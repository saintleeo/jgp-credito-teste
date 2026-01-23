
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CORES_POR_TIPO = {
  CRA: "#003366",
  CRI: "#2e7d32",
  DEB: "#ef6c00",
  NC: "#9a0d51",
};

const formatarMoeda = (valor) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);

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

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={stats.por_tipo}
              dataKey="valor"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ value }) => formatarMoeda(value)}
            >
              {stats.por_tipo.map((item, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CORES_POR_TIPO[item.tipo] || "#999"}
                />
              ))}
            </Pie>

            <Tooltip formatter={(value) => formatarMoeda(value)} />

            {/* Legenda apenas com o nome do tipo */}
            <Legend formatter={(value) => value} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
