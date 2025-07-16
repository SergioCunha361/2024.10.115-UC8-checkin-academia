const express = require("express");
const UsuarioController = require("../controllers/usuario.controller");
const AutenticacaoMiddleware = require("../../../middleware/autenticacao.usuario.middleware");
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.usuario.middleware')

const router = express.Router();

// 🔓 Rota pública (cadastro)
router.post("/usuarios", UsuarioController.cadastrar);


// 🔐 Rotas privadas (JWT obrigatório)

router.get("/usuarios", AutenticacaoMiddleware.autenticarToken,  UsuarioController.listarUsuarios);


router.put("/usuarios/:id",AutenticacaoMiddleware.autenticarToken, UsuarioController.editar);


router.delete("/usuarios/:id",AutenticacaoMiddleware.autenticarToken, UsuarioController.deletar);

// rota de tarefa - autenticar e autorizar no caso se campo papel cadastro servidor estiver so caampos abaxio 'profeesor' e 'secretario'
// conforme função autoriza --> if (!usuario || !papeisPermitidos.includes(usuario.papel))
router.get('/listar-tarefa', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['professor','secretario']), UsuarioController.listarAssinantes)


module.exports = router;

