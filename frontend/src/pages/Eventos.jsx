import { useState, useEffect, useContext } from 'react';
import FontControls from '../components/FontControls';
import { FontContext } from '../context/FontContext';

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({ jogo_id: '', jogador_id: '', tipo_evento: '', minuto_jogo: '' });
  const [editando, setEditando] = useState(null);
  const { fontSize } = useContext(FontContext);

  useEffect(() => { carregarEventos(); }, []);
  const carregarEventos = () => {
    fetch('http://localhost:3000/eventos')
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error('Erro ao buscar eventos:', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editando ? `http://localhost:3000/eventos/${editando}` : 'http://localhost:3000/eventos';
      const method = editando ? 'PUT' : 'POST';
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (response.ok) { alert(editando ? 'Evento atualizado!' : 'Evento cadastrado!'); setFormData({ jogo_id: '', jogador_id: '', tipo_evento: '', minuto_jogo: '' }); setEditando(null); carregarEventos(); } 
      else alert('Erro ao salvar');
    } catch (error) { console.error('Erro:', error); }
  };

  const excluirEvento = async (id) => {
    if (!window.confirm('Tem certeza?')) return;
    try {
      const response = await fetch(`http://localhost:3000/eventos/${id}`, { method: 'DELETE' });
      if (response.ok) { alert('Excluído!'); carregarEventos(); } else alert('Erro ao excluir'); 
    } catch (error) { console.error('Erro:', error); }
  };

  const iniciarEdicao = (evento) => { setFormData(evento); setEditando(evento.id); };

  return (
    <div className="container mx-auto p-6" style={{ fontSize: fontSize + 'px' }}>
      <FontControls />
      <h1 className="text-2xl font-bold mb-4">Eventos</h1>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="number" placeholder="ID do Jogo" value={formData.jogo_id} onChange={e => setFormData({ ...formData, jogo_id: e.target.value })} className="border p-2 rounded" required />
        <input type="number" placeholder="ID do Jogador" value={formData.jogador_id} onChange={e => setFormData({ ...formData, jogador_id: e.target.value })} className="border p-2 rounded" required />
        <input type="text" placeholder="Tipo de Evento" value={formData.tipo_evento} onChange={e => setFormData({ ...formData, tipo_evento: e.target.value })} className="border p-2 rounded" required />
        <input type="number" placeholder="Minuto do Jogo" value={formData.minuto_jogo} onChange={e => setFormData({ ...formData, minuto_jogo: e.target.value })} className="border p-2 rounded" required />
        <button type="submit" className="md:col-span-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">{editando ? 'Salvar Alterações' : 'Cadastrar Evento'}</button>
      </form>
      <div className="grid md:grid-cols-3 gap-4">
        {eventos.map(evento => (
          <div key={evento.id} className="border p-4 rounded shadow">
            <p><strong>Jogo ID:</strong> {evento.jogo_id}</p>
            <p><strong>Jogador ID:</strong> {evento.jogador_id}</p>
            <p><strong>Tipo de Evento:</strong> {evento.tipo_evento}</p>
            <p><strong>Minuto:</strong> {evento.minuto_jogo}</p>
            <div className="flex justify-between mt-2">
              <button onClick={() => iniciarEdicao(evento)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Editar</button>
              <button onClick={() => excluirEvento(evento.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Eventos;
