const Instrutor = require("../models/instrutor.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class InstrutorController {
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha, cref } = req.body;

      if (!nome || !email || !senha || !cref) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios!" });
      }

      const existente = await Instrutor.findByPk(cref);
      if (existente) {
        return res.status(409).json({ msg: "CREF já cadastrado!" });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      await Instrutor.create({
        nome,
        email,
        senha: senhaCriptografada,
        cref,
      });

      res.status(201).json({ msg: "Instrutor cadastrado com sucesso!" });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          msg: "Erro de validação",
          erros: error.errors.map((e) => e.message),
        });
      }

      res.status(500).json({ msg: "Erro no servidor", erro: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ msg: "E-mail e senha são obrigatórios." });
      }

      const instrutor = await Instrutor.findOne({ where: { email } });
      if (!instrutor) {
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }

      const senhaValida = await bcrypt.compare(senha, instrutor.senha);
      if (!senhaValida) {
        return res.status(401).json({ msg: "Credenciais inválidas." });
      }

      const token = jwt.sign(
        {
          id: instrutor.cref,
          papel: "instrutor",
          email: instrutor.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ msg: "Login bem-sucedido", token });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao realizar login", erro: error.message });
    }
  }

  static async perfil(req, res) {
    try {
      const { id, papel } = req.usuario;

      if (papel !== "instrutor") {
        return res.status(403).json({ msg: "Acesso negado ao perfil do instrutor." });
      }

      const instrutor = await Instrutor.findByPk(id, {
        attributes: ["nome", "email", "cref"],
      });

      if (!instrutor) {
        return res.status(404).json({ msg: "Instrutor não encontrado." });
      }

      res.status(200).json(instrutor);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao carregar perfil", erro: error.message });
    }
  }
}

module.exports = InstrutorController;
