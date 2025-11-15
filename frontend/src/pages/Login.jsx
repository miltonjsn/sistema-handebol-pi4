import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FontControls from '../components/FontControls';
import { FontContext } from '../context/FontContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { fontSize } = useContext(FontContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) navigate('/jogadores');
      else setErro('Email ou senha incorretos');
    } catch (error) {
      setErro('Erro no servidor, tente novamente');
      console.error('Erro:', error);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow" style={{ fontSize: fontSize + 'px' }}>
      <FontControls />
      <h1 className="text-xl font-bold mb-4">Login Técnico</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={e => setForm({ ...form, senha: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        {erro && <p className="text-red-600">{erro}</p>}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
