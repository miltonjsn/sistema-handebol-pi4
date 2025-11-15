import React from 'react';

export default function JogadorCard({ jogador }) {
  return (
    <div className="border p-4 rounded shadow bg-white hover:shadow-lg transition">
      <h2 className="text-lg font-bold mb-2">{jogador.nome}</h2>
      <p><strong>Posição:</strong> {jogador.posicao}</p>
      <p><strong>Camisa:</strong> {jogador.numero_camisa}</p>
      <p><strong>Equipe:</strong> {jogador.equipe}</p>
    </div>
  );
}
