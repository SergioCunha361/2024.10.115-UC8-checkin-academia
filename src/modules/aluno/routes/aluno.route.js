const express = require('express');
const AlunoController = require('../controllers/aluno.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.usuario.middleware');


const router = express.Router();

// 🔓 Rota pública (cadastro)
router.post('/alunos', AlunoController.cadastrar);
router.get('/alunos/listarTodos', AlunoController.listarTodos);

// 



// 🔐 Rotas privadas (token obrigatório)

router.get('/aluno/perfil', AutenticacaoMiddleware.autenticarToken, AlunoController.listarPerfil);
router.put('/aluno/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.atualizarPorMatricula);
router.delete('/aluno/:matricula', AutenticacaoMiddleware.autenticarToken, AlunoController.excluirPorMatricula);




module.exports = router;


