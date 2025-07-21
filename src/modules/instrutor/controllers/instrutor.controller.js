const Instrutor = require("../models/instrutor.model");
const bcrypt = require("bcryptjs");

class InstrutorController {
  static async cadastrar(req, res) {
    try {
      console.log("BODY RECEBIDO:", req.body); //para saber se está carregando e aparecer no console o body

      if (!req.body || typeof req.body !== "object") {
        return res
          .status(400)
          .json({ msg: "Requisição malformada: corpo ausente ou inválido." });
      }

      const { nome, email, senha, cref } = req.body;

      if (!nome || !email || !senha || !cref) {
        return res
          .status(400)
          .json({ msg: "Todos os campos devem ser preenchidos!" });
      }

      const existe = await Instrutor.findByPk(cref);
      if (existe) {
        return res.status(409).json({ msg: "Instrutor já cadastrado!" });
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
      return res
        .status(500)
        .json({ msg: "Erro no servidor", erro: error.message });
    }
  }

  static async listarPerfil(req, res) {
    try {
      const { cref } = req.usuario; // ← chave primaria cref

      const instrutor = await Instrutor.findOne({
        where: { cref },
        attributes: ["nome", "email", "cref"],
      });

      if (!instrutor) {
        return res
          .status(404)
          .json({ msg: "Não existe instrutor cadastrado!" });
      }

      res.status(200).json(instrutor);
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }

  static async listarTodos(req, res) {
    try {
      const instrutores = await Instrutor.findAll({
        attributes: ["nome", "email", "cref"],
      });

      if (!instrutores || instrutores.length === 0) {
        return res
          .status(404)
          .json({ msg: "Não existe instrutor cadastrado!" });
      }

      res.status(200).json(instrutores);
    } catch (error) {
      res.status(500).json({
        msg: "Erro do servidor. Tente novamente mais tarde!",
        erro: error.message,
      });
    }
  }

  static async atualizarPorCref(req, res) {
    try {
      const { cref } = req.params;
      const { nome, email } = req.body;

      const instrutor = await Instrutor.findOne({ where: { cref } });

      if (!instrutor) {
        return res
          .status(404)
          .json({ msg: "Instrutor não encontrado com esse cref!" });
      }

      await instrutor.update({ nome, email });

      res
        .status(200)
        .json({ msg: "Instrutor atualizado com sucesso!", instrutor });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro ao atualizar instrutor.", erro: error.message });
    }
  }

  static async excluirPorCref(req, res) {
    try {
      const { cref } = req.params;

      const instrutor = await Instrutor.findOne({ where: { cref } });

      if (!instrutor) {
        return res
          .status(404)
          .json({ msg: "Instrutor não encontrado com esse cref!" });
      }

      await instrutor.destroy();

      res.status(200).json({ msg: "Instrutor deletado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro ao deletar instrutor.", erro: error.message });
    }
  }
}

module.exports = InstrutorController;
