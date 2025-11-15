import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FontContext } from '../context/FontContext';
import FontControls from './FontControls';

export default function Header() {
  const { fontSize } = useContext(FontContext);

  return (
    <header className="bg-gray-800 text-white p-4" style={{ fontSize: fontSize + 'px' }}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Sistema Handebol</h1>
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/jogadores">Jogadores</Link>
          <Link to="/jogos">Jogos</Link>
          <Link to="/eventos">Eventos</Link>
          <Link to="/estatisticas">Estatísticas</Link> {/* NOVO LINK */}
          <Link to="/login">Login</Link>
        </nav>
      </div>
      <div className="container mx-auto mt-2">
        <FontControls />
      </div>
    </header>
  );
}
