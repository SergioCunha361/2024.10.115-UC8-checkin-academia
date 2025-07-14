const express = require('express');
const AssinaturaController = require('../controllers/assinatura.controller');
const AutenticacaoMiddleware = require('../../autenticacao/middlewares/autenticacao.middleware');

const router = express.Router();

// 🔐 Todas as rotas exigem autenticação (JWT)
router.get('/assinaturas', AutenticacaoMiddleware.autenticarToken, AssinaturaController.listarTodas);
router.get('/assinaturas/:id', AutenticacaoMiddleware.autenticarToken, AssinaturaController.listarPorId);
router.post('/assinaturas', AutenticacaoMiddleware.autenticarToken, AssinaturaController.cadastrar);
router.put('/assinaturas/:id', AutenticacaoMiddleware.autenticarToken, AssinaturaController.atualizar);
router.delete('/assinaturas/:id', AutenticacaoMiddleware.autenticarToken, AssinaturaController.deletar);

module.exports = router;
