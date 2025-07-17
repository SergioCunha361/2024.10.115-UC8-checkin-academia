const express = require("express");
const router = express.Router();
const InstrutorController = require("../controllers/instrutor.controller");
const AutenticacaoMiddleware = require("../../../middleware/autenticacao.usuario.middleware");

// Cadastro e login não exigem autenticação
router.post("/", InstrutorController.cadastrar);
router.post("/login", InstrutorController.login);

// Perfil exige autenticação
router.get("/me", AutenticacaoMiddleware.autenticarToken, InstrutorController.perfil);

module.exports = router;
