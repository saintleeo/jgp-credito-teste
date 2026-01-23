import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const GraficoPorTipo = ({ emissoes }) => {
  const dados = Object.values(
    emissoes.reduce((acc, e) => {
      acc[e.tipo] = acc[e.tipo] || { tipo: e.tipo, total: 0 };
      acc[e.tipo].total += 1;
      return acc;
    }, {})
  );

  return (
    <div className="grafico-container">
      <h2>Distribuição por Tipo</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <XAxis dataKey="tipo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoPorTipo;
