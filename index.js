const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize'); // Importando o Sequelize

const app = express();

app.use(express.json());
app.use(cors());

// --- CONFIGURAÇÃO DO BANCO DE DADOS ---
// Substitua 'root' e 'sua_senha_do_mysql' pelos seus dados reais
const sequelize = new Sequelize('agenda_eletronica', 'root', 'sua_senha_do_mysql', {
  host: 'localhost',
  dialect: 'mysql'
});

// --- TESTANDO A CONEXÃO ---
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado ao MySQL com sucesso!');
  })
  .catch(err => {
    console.error('❌ Erro ao conectar no MySQL:', err);
  });

// Rota de teste
app.get('/', (req, res) => {
  res.send('API Vaggon rodando e (tentando) conectar ao banco!');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});