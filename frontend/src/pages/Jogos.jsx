import { useState, useEffect, useContext } from 'react';
import FontControls from '../components/FontControls';
import { FontContext } from '../context/FontContext';

function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [formData, setFormData] = useState({ adversario: '', data: '', local: '', campeonato: '' });
  const [editando, setEditando] = useState(null);
  const { fontSize } = useContext(FontContext);

  useEffect(() => { carregarJogos(); }, []);
  const carregarJogos = () => {
    fetch('http://localhost:3000/jogos')
      .then(res => res.json())
      .then(data => setJogos(data))
      .catch(err => console.error('Erro ao buscar jogos:', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editando ? `http://localhost:3000/jogos/${editando}` : 'http://localhost:3000/jogos';
      const method = editando ? 'PUT' : 'POST';
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (response.ok) { alert(editando ? 'Jogo atualizado!' : 'Jogo cadastrado!'); setFormData({ adversario: '', data: '', local: '', campeonato: '' }); setEditando(null); carregarJogos(); } 
      else alert('Erro ao salvar');
    } catch (error) { console.error('Erro:', error); }
  };

  const excluirJogo = async (id) => {
    if (!window.confirm('Tem certeza?')) return;
    try {
      const response = await fetch(`http://localhost:3000/jogos/${id}`, { method: 'DELETE' });
      if (response.ok) { alert('Excluído!'); carregarJogos(); } else alert('Erro ao excluir');
    } catch (error) { console.error('Erro:', error); }
  };

  const iniciarEdicao = (jogo) => { setFormData(jogo); setEditando(jogo.id); };

  return (
    <div className="container mx-auto p-6" style={{ fontSize: fontSize + 'px' }}>
      <FontControls />
      <h1 className="text-2xl font-bold mb-4">Jogos</h1>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="text" placeholder="Adversário" value={formData.adversario} onChange={e => setFormData({ ...formData, adversario: e.target.value })} className="border p-2 rounded" required />
        <input type="date" value={formData.data} onChange={e => setFormData({ ...formData, data: e.target.value })} className="border p-2 rounded" required />
        <input type="text" placeholder="Local" value={formData.local} onChange={e => setFormData({ ...formData, local: e.target.value })} className="border p-2 rounded" required />
        <input type="text" placeholder="Campeonato" value={formData.campeonato} onChange={e => setFormData({ ...formData, campeonato: e.target.value })} className="border p-2 rounded" required />
        <button type="submit" className="md:col-span-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">{editando ? 'Salvar Alterações' : 'Cadastrar Jogo'}</button>
      </form>
      <div className="grid md:grid-cols-3 gap-4">
        {jogos.map(jogo => (
          <div key={jogo.id} className="border p-4 rounded shadow">
            <p><strong>Adversário:</strong> {jogo.adversario}</p>
            <p><strong>Data:</strong> {jogo.data}</p>
            <p><strong>Local:</strong> {jogo.local}</p>
            <p><strong>Campeonato:</strong> {jogo.campeonato}</p>
            <div className="flex justify-between mt-2">
              <button onClick={() => iniciarEdicao(jogo)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Editar</button>
              <button onClick={() => excluirJogo(jogo.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jogos;
