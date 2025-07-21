const express = require('express');
const InstrutorController = require('../controllers/instrutor.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.usuario.middleware');

const router = express.Router();

// Cadastro e login não exigem autenticação
router.post('/instrutores', InstrutorController.cadastrar);
router.get('/instrutores/listarTodos', InstrutorController.listarTodos);

// 🔐 Rotas privadas (token obrigatório)

router.get('/instrutor/perfil', AutenticacaoMiddleware.autenticarToken, InstrutorController.listarPerfil);
router.put('/instrutor/:cref', AutenticacaoMiddleware.autenticarToken, InstrutorController.atualizarPorCref);
router.delete('/instrutor/:cref', AutenticacaoMiddleware.autenticarToken, InstrutorController.excluirPorCref);

module.exports = router;
