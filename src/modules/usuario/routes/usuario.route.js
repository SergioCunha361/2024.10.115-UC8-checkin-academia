const express = require('express');
const UsuarioController = require('../controllers/usuario.controller');
const AutenticacaoMiddleware = require('../../autenticacao/middlewares/autenticacao.middleware');


const router = express.Router();

// 🔓 Rota pública (cadastro)
router.post('/usuarios', UsuarioController.cadastrar);

// 🔐 Rotas privadas (JWT obrigatório)
router.get('/usuarios', AutenticacaoMiddleware.autenticarToken, UsuarioController.listar);
router.put('/usuarios/:id', AutenticacaoMiddleware.autenticarToken, UsuarioController.editar);
router.delete('/usuarios/:id', AutenticacaoMiddleware.autenticarToken, UsuarioController.deletar);

module.exports = router;

