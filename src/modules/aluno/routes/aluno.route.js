const express = require('express');
const AlunoController = require('../controllers/aluno.controller');
const AutenticacaoMiddleware = require('../../login_logout/controllers/login_logout.controller');
const LoginLogout = require('../../login_logout/controllers/login_logout.controller');


const router = express.Router();

// 🔓 Rota pública (cadastro)
router.post('/alunos', AlunoController.cadastrar);

// Login do aluno 
router.post('/login', LoginLogout.login);


// 🔐 Rotas privadas (token obrigatório)

router.get('/aluno/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.listarPorMatricula);
router.put('/aluno/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.atualizarPorMatricula);
router.delete('/aluno/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.excluirPorMatricula);


module.exports = router;


