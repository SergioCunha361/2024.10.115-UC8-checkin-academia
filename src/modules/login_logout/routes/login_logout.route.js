const express = require('express');
const AutenticacaoController = require('../controllers/login_logout.controller');

const router = express.Router();

// 🔐 Apenas rotas de autenticação
router.post('/login', AutenticacaoController.login);
router.post('/logout', AutenticacaoController.sair);
router.post('/refresh-token', AutenticacaoController.refreshToken);

module.exports = router;


