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
require('./src/realcionamento.js');



// Configuração do ambiente
dotenv.config();

const app = express();

// Libera acesso do frontend (ex: React)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

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

    await sequelize.sync({ alter: false , force: false }); // `force: true` apaga tudo – cuidado!
    // force: false não apaga os dados do banco cada vez que vc subir o servidor
    console.log('✅ Banco de dados sincronizado.');
  } catch (err) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', err);
  }

  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
