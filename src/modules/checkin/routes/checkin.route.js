const express = require("express");
const router = express.Router();
const CheckinController = require("../controllers/checkin.controller");
const AutenticacaoMiddleware = require("../../../middleware/autenticacao.middleware");
const AutorizacaoMiddleware = require("../../../middleware/autorizacao.middleware");

// Autenticação obrigatória para todas
router.use(AutenticacaoMiddleware.autenticarToken);

// GET /checkins - aluno vê seus, instrutor vê todos
router.get("/", CheckinController.listarTodos);

// GET /checkins/:id - aluno dono ou instrutor
router.get("/:id", CheckinController.detalhar);

// POST /checkins - só aluno pode registrar o próprio
router.post(
  "/",
  AutorizacaoMiddleware.autorizar(["aluno"]),
  CheckinController.registrarEntrada
);

// PUT /checkins/:id - aluno (próprio) ou instrutor
router.put(
  "/:id",
  AutorizacaoMiddleware.autorizar(["aluno", "instrutor"]),
  CheckinController.atualizar
);

// DELETE /checkins/:id - só instrutor
router.delete(
  "/:id",
  AutorizacaoMiddleware.autorizar(["instrutor"]),
  CheckinController.excluir
);

module.exports = router;



