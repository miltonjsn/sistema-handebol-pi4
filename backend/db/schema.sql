-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS sistema_handebol;
USE sistema_handebol;

-- ======================================================
-- 1) Tabela de usuários (técnicos)
-- ======================================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Inserts de exemplo para usuários
INSERT INTO usuarios (nome, email, senha)
VALUES 
('Carlos Silva', 'carlos.silva@email.com', '123456'),
('Mariana Souza', 'mariana.souza@email.com', '123456');

-- ======================================================
-- 2) Tabela de jogadores
-- ======================================================
CREATE TABLE IF NOT EXISTS jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    posicao VARCHAR(50),
    numero_camisa INT,
    equipe VARCHAR(100)
);

-- Inserts de exemplo para jogadores
INSERT INTO jogadores (nome, posicao, numero_camisa, equipe)
VALUES 
('João Santos', 'ponta', 7, 'Sorocaba Handebol'),
('Lucas Oliveira', 'armador', 10, 'Sorocaba Handebol'),
('Pedro Lima', 'goleiro', 1, 'Sorocaba Handebol');

-- ======================================================
-- 3) Tabela de jogos
-- ======================================================
CREATE TABLE IF NOT EXISTS jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adversario VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    local VARCHAR(150),
    campeonato VARCHAR(100)
);

-- Inserts de exemplo para jogos
INSERT INTO jogos (adversario, data, local, campeonato)
VALUES
('Votorantim Handebol', '2025-10-15', 'Ginásio Municipal Sorocaba', 'Campeonato Estadual'),
('Bragança Paulista HC', '2025-10-22', 'Ginásio Bragança', 'Campeonato Estadual');

-- ======================================================
-- 4) Tabela de eventos (estatísticas)
-- ======================================================
CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogo_id INT NOT NULL,
    jogador_id INT NOT NULL,
    tipo_evento VARCHAR(50) NOT NULL,
    minuto_jogo INT NOT NULL,
    FOREIGN KEY (jogo_id) REFERENCES jogos(id),
    FOREIGN KEY (jogador_id) REFERENCES jogadores(id)
);

-- Inserts de exemplo para eventos
INSERT INTO eventos (jogo_id, jogador_id, tipo_evento, minuto_jogo)
VALUES
(1, 1, 'gol', 5),
(1, 2, 'assistencia', 5),
(1, 3, 'defesa_goleiro', 10),
(1, 1, 'gol', 12),
(2, 2, 'perda_bola', 8),
(2, 1, 'gol', 15);
