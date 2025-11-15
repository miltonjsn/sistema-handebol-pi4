import { useEffect, useState, useContext } from 'react';
import JogadorCard from '../components/JogadorCard';
import FontControls from '../components/FontControls';
import { FontContext } from '../context/FontContext';

function Jogadores() {
  const [jogadores, setJogadores] = useState([]);
  const [novoJogador, setNovoJogador] = useState({
    nome: '', posicao: '', numero_camisa: '', equipe: ''
  });
  const [editando, setEditando] = useState(null);
  const { fontSize } = useContext(FontContext);

  useEffect(() => { carregarJogadores(); }, []);

  const carregarJogadores = () => {
    fetch('http://localhost:3000/jogadores')
      .then(res => res.json())
      .then(data => setJogadores(data))
      .catch(err => console.error('Erro ao buscar jogadores:', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editando
        ? `http://localhost:3000/jogadores/${editando}`
        : 'http://localhost:3000/jogadores';
      const method = editando ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoJogador)
      });
      if (response.ok) {
        alert(editando ? 'Jogador atualizado!' : 'Jogador cadastrado!');
        setNovoJogador({ nome: '', posicao: '', numero_camisa: '', equipe: '' });
        setEditando(null);
        carregarJogadores();
      } else alert('Erro ao salvar jogador');
    } catch (error) { console.error('Erro:', error); }
  };

  const excluirJogador = async (id) => {
    if (!window.confirm('Tem certeza?')) return;
    try {
      const response = await fetch(`http://localhost:3000/jogadores/${id}`, { method: 'DELETE' });
      if (response.ok) { alert('Excluído com sucesso'); carregarJogadores(); } 
      else alert('Erro ao excluir');
    } catch (error) { console.error('Erro:', error); }
  };

  const iniciarEdicao = (jogador) => {
    setNovoJogador({
      nome: jogador.nome,
      posicao: jogador.posicao,
      numero_camisa: jogador.numero_camisa,
      equipe: jogador.equipe
    });
    setEditando(jogador.id);
  };

  return (
    <div className="container mx-auto p-6" style={{ fontSize: fontSize + 'px' }}>
      <FontControls />
      <h1 className="text-2xl font-bold mb-4">Lista de Jogadores</h1>

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="text" placeholder="Nome" value={novoJogador.nome} 
          onChange={e => setNovoJogador({ ...novoJogador, nome: e.target.value })}
          className="border p-2 rounded" required />
        <input type="text" placeholder="Posição" value={novoJogador.posicao} 
          onChange={e => setNovoJogador({ ...novoJogador, posicao: e.target.value })}
          className="border p-2 rounded" required />
        <input type="number" placeholder="Camisa" value={novoJogador.numero_camisa} 
          onChange={e => setNovoJogador({ ...novoJogador, numero_camisa: e.target.value })}
          className="border p-2 rounded" required />
        <input type="text" placeholder="Equipe" value={novoJogador.equipe} 
          onChange={e => setNovoJogador({ ...novoJogador, equipe: e.target.value })}
          className="border p-2 rounded" required />
        <button type="submit" className="md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {editando ? 'Salvar Alterações' : 'Cadastrar Jogador'}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {jogadores.map(jogador => (
          <div key={jogador.id} className="border p-4 rounded shadow">
            <JogadorCard jogador={jogador} />
            <div className="flex justify-between mt-2">
              <button onClick={() => iniciarEdicao(jogador)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Editar</button>
              <button onClick={() => excluirJogador(jogador.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jogadores;
