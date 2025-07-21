const express = require("express");
const router = express.Router();
const CheckinController = require("../controllers/checkin.controller");
const AutenticacaoMiddleware = require("../../../middleware/autenticacao.usuario.middleware");
const AutorizacaoMiddleware = require("../../../middleware/autorizacao.usuario.middleware");

// GET /checkins - aluno vê os seus, instrutor vê todos
router.get(
  "/checkins",
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(["aluno", "instrutor"]),
  CheckinController.listarTodos
);

// GET /checkins/:id - dono ou instrutor
router.get(
  "/checkins/:id",
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(["aluno", "instrutor"]),
  CheckinController.detalhar
);

// POST /checkins - apenas o próprio aluno
router.post(
  "/checkins",
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(["aluno"]),
  CheckinController.registrar
);

// PUT /checkins/:id - aluno próprio ou instrutor
router.put(
  "/checkins/:id",
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(["aluno", "instrutor"]),
  CheckinController.atualizar
);

// DELETE /checkins/:id - apenas instrutor
router.delete(
  "/checkins/:id",
  AutenticacaoMiddleware.autenticarToken,
  AutorizacaoMiddleware.autorizar(["instrutor"]),
  CheckinController.deletar
);

module.exports = router;
