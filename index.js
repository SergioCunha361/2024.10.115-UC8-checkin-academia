const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./src/config/database');

// const authRoute = require('./src/modules/login_logout/routes/login_logout.route');
const usuarioRoute = require('./src/modules/usuario/routes/usuario.route');
const assinaturaRoute = require('./src/modules/assinatura/routes/assinatura.route');
const loginLogoutRoutes = require('./src/modules/login_logout/routes/login_logout.route');




// Relacionamentos entre models
require('./src/realcionamento');

// Configuração do ambiente
dotenv.config();

const app = express();

// Libera o acesso do frontend (ex: React)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// Rotas principais
app.use('/api/', loginLogoutRoutes);        // /api/login, /api/logout, /api/refresh-token
app.use('/api/', usuarioRoute);     // /api/usuarios
app.use('/api/', assinaturaRoute);  // /api/assinaturas

// Inicia servidor
const PORTA = process.env.PORTA || 3001;

app.listen(PORTA, async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida.');

        await sequelize.sync({ alter: true, force: true });
        console.log('✅ Banco de dados sincronizado.');
    } catch (err) {
        console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', err);
    }

    console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
});
