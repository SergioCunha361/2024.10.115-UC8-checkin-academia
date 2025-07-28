const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./src/config/database');

// Rotas corretas do seu projeto
const loginLogoutRoute = require('./src/modules/login_logout/routes/login_logout.route');
const alunoRoute = require('./src/modules/aluno/routes/aluno.route');
const instrutorRoute = require('./src/modules/instrutor/routes/instrutor.route');
const checkinRoute = require('./src/modules/checkin/routes/checkin.route');

// Relacionamentos entre models
require('./src/realcionamento');



// Configuração do ambiente
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json()); // ← ESSE TEM QUE VIR AQUI!


// Rotas principais
app.use('/api/', loginLogoutRoute);
app.use('/api/', alunoRoute);
app.use('/api/', instrutorRoute);
app.use('/api/', checkinRoute);


// Porta padrão ou configurável
const PORT = process.env.PORT || 3000;

// Inicia o servidor e sincroniza o banco
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida.');

    
  } catch (err) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', err);
  }

  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
