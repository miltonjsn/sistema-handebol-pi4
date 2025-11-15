import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jogadores from './pages/Jogadores';
import Jogos from './pages/Jogos';
import Eventos from './pages/Eventos';
import Login from './pages/Login';
import Estatisticas from './pages/Estatisticas'; // IMPORT DA NOVA PÁGINA
import Header from './components/Header';
import Footer from './components/Footer';
import { FontProvider } from './context/FontContext';

function App() {
  return (
    <FontProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jogadores" element={<Jogadores />} />
              <Route path="/jogos" element={<Jogos />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/estatisticas" element={<Estatisticas />} /> {/* NOVA ROTA */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FontProvider>
  );
}

export default App;
