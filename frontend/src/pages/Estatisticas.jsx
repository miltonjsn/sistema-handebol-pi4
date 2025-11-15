import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export default function Estatisticas() {
  const [jogadores, setJogadores] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [previsaoGols, setPrevisaoGols] = useState([]);

  useEffect(() => {
    // Buscar dados do backend
    fetch('http://localhost:3000/jogadores')
      .then((res) => res.json())
      .then((data) => setJogadores(data))
      .catch((err) => console.error(err));

    fetch('http://localhost:3000/jogos')
      .then((res) => res.json())
      .then((data) => setJogos(data))
      .catch((err) => console.error(err));

    fetch('http://localhost:3000/eventos')
      .then((res) => res.json())
      .then((data) => {
        setEventos(data);

        // Simples previsão de gols por jogador usando média
        const golsPorJogador = {};
        data.forEach((evento) => {
          if (evento.tipo_evento.toLowerCase() === 'gol') {
            golsPorJogador[evento.jogador_id] =
              (golsPorJogador[evento.jogador_id] || 0) + 1;
          }
        });

        const previsao = jogadores.map((jogador) => ({
          nome: jogador.nome,
          gols: golsPorJogador[jogador.id] || 0,
        }));

        setPrevisaoGols(previsao);
      })
      .catch((err) => console.error(err));
  }, [jogadores.length]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Estatísticas e Previsão</h1>

      {/* Gráfico 1: Total de gols por jogador */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Gols por Jogador</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={previsaoGols}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="gols" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico 2: Número de eventos por tipo */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Eventos por Tipo</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(
              eventos.reduce((acc, ev) => {
                acc[ev.tipo_evento] = (acc[ev.tipo_evento] || 0) + 1;
                return acc;
              }, {})
            ).map(([tipo, count]) => ({ tipo, count }))}
          >
            <XAxis dataKey="tipo" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico 3: Previsão simples de gols nos próximos jogos */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Previsão de Gols por Jogador</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={previsaoGols}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="gols" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
