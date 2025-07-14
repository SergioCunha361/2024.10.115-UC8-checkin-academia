const Assinatura = require("../models/assinatura.model");
const Usuario = require("../../usuario/models/usuario.model");

class AssinaturaController {
  static async cadastrar(req, res) {
    try {
      const { codigo_usuario, revista_nome, data_inicio, data_fim, status } = req.body;

      if (!codigo_usuario || !revista_nome || !data_inicio || !data_fim) {
        return res.status(400).json({ msg: "Todos os campos obrigatórios devem ser preenchidos." });
      }

      const usuario = await Usuario.findByPk(codigo_usuario);
      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      const novaAssinatura = await Assinatura.create({
        codigo_usuario,
        revista_nome,
        data_inicio,
        data_fim,
        status
      });

      res.status(201).json({ msg: "Assinatura criada com sucesso.", novaAssinatura });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          msg: "Erro de validação.",
          erro: error.errors.map((e) => e.message),
        });
      }
      res.status(500).json({ msg: "Erro interno do servidor.", erro: error.message });
    }
  }

  static async listarTodas(req, res) {
    try {
      const assinaturas = await Assinatura.findAll({
        include: {
          model: Usuario,
          attributes: ["nome", "email"]
        }
      });

      if (!assinaturas || assinaturas.length === 0) {
        return res.status(404).json({ msg: "Nenhuma assinatura encontrada." });
      }

      res.status(200).json(assinaturas);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar assinaturas.", erro: error.message });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const assinatura = await Assinatura.findByPk(id, {
        include: {
          model: Usuario,
          attributes: ["nome", "email"]
        }
      });

      if (!assinatura) {
        return res.status(404).json({ msg: "Assinatura não encontrada." });
      }

      res.status(200).json(assinatura);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao buscar assinatura.", erro: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { revista_nome, data_inicio, data_fim, status } = req.body;

      const assinatura = await Assinatura.findByPk(id);

      if (!assinatura) {
        return res.status(404).json({ msg: "Assinatura não encontrada." });
      }

      await assinatura.update({ revista_nome, data_inicio, data_fim, status });

      res.status(200).json({ msg: "Assinatura atualizada com sucesso.", assinatura });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao atualizar assinatura.", erro: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const assinatura = await Assinatura.findByPk(id);

      if (!assinatura) {
        return res.status(404).json({ msg: "Assinatura não encontrada." });
      }

      await assinatura.destroy();
      res.status(200).json({ msg: "Assinatura deletada com sucesso." });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao deletar assinatura.", erro: error.message });
    }
  }
}

module.exports = AssinaturaController;
