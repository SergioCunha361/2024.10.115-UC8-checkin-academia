const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");

class UsuarioController {
  // 📌 Cadastrar novo usuário
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
      }

      const jaExiste = await Usuario.findOne({ where: { email } });
      if (jaExiste) {
        return res.status(409).json({ msg: "Este e-mail já está cadastrado." });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 15);
      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada,
      });

      res.status(201).json({
        msg: "Usuário cadastrado com sucesso!",
        usuario: {
          codigo_usuario: novoUsuario.codigo_usuario,
          nome: novoUsuario.nome,
          email: novoUsuario.email,
        }
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          msg: "Erro de validação",
          erros: error.errors.map((e) => e.message)
        });
      }

      res.status(500).json({
        msg: "Erro interno do servidor ao cadastrar usuário.",
        erro: error.message
      });
    }
  }

  // 📋 Listar todos os usuários
  static async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ["codigo_usuario", "nome", "email"]
      });

      if (usuarios.length === 0) {
        return res.status(404).json({ msg: "Nenhum usuário encontrado." });
      }

      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({
        msg: "Erro ao listar usuários.",
        erro: error.message
      });
    }
  }

  // ✏️ Atualizar dados de um usuário
  static async editar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      let novaSenha = usuario.senha;
      if (senha) {
        novaSenha = await bcrypt.hash(senha, 15);
      }

      await usuario.update({ nome, email, senha: novaSenha });

      res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro ao atualizar usuário.",
        erro: error.message
      });
    }
  }

  // ❌ Deletar usuário
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      await usuario.destroy();
      res.status(200).json({ msg: "Usuário excluído com sucesso." });
    } catch (error) {
      res.status(500).json({
        msg: "Erro ao excluir usuário.",
        erro: error.message
      });
    }
  }
}

module.exports = UsuarioController;
