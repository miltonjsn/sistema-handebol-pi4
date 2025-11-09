// ===========================
// Importa dependências
// ===========================
const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');

// ===========================
// Configurações iniciais
// ===========================
const app = express();
const PORT = 3000;

// Permite que o frontend (React) se comunique com o backend
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));

// ===========================
// Conexão com o banco de dados
// ===========================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// ===========================
// Rotas do sistema
// ===========================

// Rota inicial
app.get('/', (req, res) => {
  res.json({ message: 'Servidor rodando com sucesso!' });
});

// ---------------------------------
// Jogadores
// ---------------------------------

// Listar todos os jogadores
app.get('/jogadores', (req, res) => {
  const sql = 'SELECT * FROM jogadores';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar jogadores:', err);
      return res.status(500).send('Erro ao buscar jogadores');
    }
    res.json(results);
  });
});

// Cadastrar um novo jogador
app.post('/jogadores', (req, res) => {
  const { nome, posicao, numero_camisa, equipe } = req.body;

  if (!nome || !posicao || !numero_camisa || !equipe) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const sql = 'INSERT INTO jogadores (nome, posicao, numero_camisa, equipe) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, posicao, numero_camisa, equipe], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar jogador:', err);
      return res.status(500).send('Erro ao cadastrar jogador');
    }
    res.send(`Jogador ${nome} cadastrado com sucesso!`);
  });
});

// Atualizar um jogador existente
app.put('/jogadores/:id', (req, res) => {
  const { id } = req.params;
  const { nome, posicao, numero_camisa, equipe } = req.body;

  if (!nome || !posicao || !numero_camisa || !equipe) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const sql = 'UPDATE jogadores SET nome = ?, posicao = ?, numero_camisa = ?, equipe = ? WHERE id = ?';
  db.query(sql, [nome, posicao, numero_camisa, equipe, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar jogador:', err);
      return res.status(500).send('Erro ao atualizar jogador');
    }
    res.send(`Jogador ${nome} atualizado com sucesso!`);
  });
});

// Excluir um jogador
app.delete('/jogadores/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM jogadores WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir jogador:', err);
      return res.status(500).send('Erro ao excluir jogador');
    }
    res.send('Jogador excluído com sucesso!');
  });
});

// ---------------------------------
// Login técnico
// ---------------------------------
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).send('Erro no servidor');
    }

    if (results.length > 0) {
      res.send('Login realizado com sucesso!');
    } else {
      res.status(401).send('Email ou senha incorretos');
    }
  });
});

// ---------------------------------
// Jogos
// ---------------------------------

// Listar todos os jogos
app.get('/jogos', (req, res) => {
  const sql = 'SELECT * FROM jogos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar jogos:', err);
      return res.status(500).send('Erro ao buscar jogos');
    }
    res.json(results);
  });
});

// Cadastrar um novo jogo
app.post('/jogos', (req, res) => {
  const { adversario, data, local, campeonato } = req.body;

  if (!adversario || !data || !local || !campeonato) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const sql = 'INSERT INTO jogos (adversario, data, local, campeonato) VALUES (?, ?, ?, ?)';
  db.query(sql, [adversario, data, local, campeonato], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar jogo:', err);
      return res.status(500).send('Erro ao cadastrar jogo');
    }
    res.send(`Jogo contra ${adversario} cadastrado com sucesso!`);
  });
});

// ---------------------------------
// Eventos (estatísticas do jogo)
// ---------------------------------

// Listar todos os eventos
app.get('/eventos', (req, res) => {
  const sql = 'SELECT * FROM eventos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      return res.status(500).send('Erro ao buscar eventos');
    }
    res.json(results);
  });
});

// Cadastrar um novo evento
app.post('/eventos', (req, res) => {
  const { jogo_id, jogador_id, tipo_evento, minuto_jogo } = req.body;

  if (!jogo_id || !jogador_id || !tipo_evento || minuto_jogo == null) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const sql = 'INSERT INTO eventos (jogo_id, jogador_id, tipo_evento, minuto_jogo) VALUES (?, ?, ?, ?)';
  db.query(sql, [jogo_id, jogador_id, tipo_evento, minuto_jogo], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar evento:', err);
      return res.status(500).send('Erro ao cadastrar evento');
    }
    res.send(`Evento ${tipo_evento} registrado com sucesso!`);
  });
});

// ===========================
// Inicia o servidor
// ===========================
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
