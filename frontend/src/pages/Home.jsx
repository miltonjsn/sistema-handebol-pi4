import { useEffect, useState, useContext } from "react";
import JogadorCard from "../components/JogadorCard";
import FontControls from "../components/FontControls";
import { FontContext } from "../context/FontContext";

export default function Home() {
  const [jogadores, setJogadores] = useState([]);
  const { fontSize } = useContext(FontContext);

  useEffect(() => {
    fetch("http://localhost:3000/jogadores")
      .then((res) => res.json())
      .then((data) => setJogadores(data))
      .catch((err) => console.error("Erro ao buscar jogadores:", err));
  }, []);

  return (
    <div className="container mx-auto p-6" style={{ fontSize: fontSize + "px" }}>
      <FontControls />
      <h1 className="text-2xl font-bold mb-4">Jogadores</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {jogadores.map((jogador) => (
          <div key={jogador.id} className="border p-4 rounded shadow">
            <JogadorCard jogador={jogador} />
          </div>
        ))}
      </div>
    </div>
  );
}
