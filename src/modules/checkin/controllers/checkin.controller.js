const Checkin = require("../models/checkin.model");
const Aluno = require("../../aluno/models/aluno.model");

class CheckinController {
  // GET /checkins → aluno vê os próprios, instrutor vê todos
  static async listarTodos(req, res) {
    try {
      const tipo = req.usuario.tipo;

      if (tipo === "instrutor") {
        const checkins = await Checkin.findAll();
        return res.status(200).json(checkins);
      }

      const matricula = req.usuario.id;
      const checkins = await Checkin.findAll({ where: { alunoId: matricula } });
      return res.status(200).json(checkins);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao listar check-ins", erro: error.message });
    }
  }

  // GET /checkins/:id → dono ou instrutor
  static async detalhar(req, res) {
    try {
      const { id } = req.params;
      const checkin = await Checkin.findByPk(id);

      if (!checkin) return res.status(404).json({ msg: "Check-in não encontrado" });

      const { tipo, id: usuarioId } = req.usuario;
      if (tipo === "aluno" && checkin.alunoId !== usuarioId) {
        return res.status(403).json({ msg: "Você só pode acessar seus próprios check-ins" });
      }

      return res.status(200).json(checkin);
    } catch (error) {
      res.status(500).json({ msg: "Erro ao detalhar check-in", erro: error.message });
    }
  }

  // POST /checkins → aluno próprio
  static async registrar(req, res) {
    try {
      const { data_hora_entrada } = req.body;
      const matricula = req.usuario.id;

      if (!data_hora_entrada) {
        return res.status(400).json({ msg: "A data de entrada é obrigatória" });
      }

      const aluno = await Aluno.findByPk(matricula);
      if (!aluno) {
        return res.status(404).json({ msg: "Aluno não encontrado" });
      }

      const novoCheckin = await Checkin.create({
        alunoId: matricula,
        data_hora_entrada,
        plano: aluno.plano,
      });

      return res.status(201).json({ msg: "Check-in registrado", checkin: novoCheckin });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao registrar check-in", erro: error.message });
    }
  }

  // PUT /checkins/:id → aluno próprio ou instrutor
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { data_hora_saida } = req.body;
      const checkin = await Checkin.findByPk(id);

      if (!checkin) return res.status(404).json({ msg: "Check-in não encontrado" });

      const { tipo, id: usuarioId } = req.usuario;

      if (tipo === "aluno" && checkin.alunoId !== usuarioId) {
        return res.status(403).json({ msg: "Você só pode atualizar seus próprios check-ins" });
      }

      if (data_hora_saida && data_hora_saida < checkin.data_hora_entrada) {
        return res.status(400).json({ msg: "A data de saída não pode ser anterior à de entrada" });
      }

      checkin.data_hora_saida = data_hora_saida;
      await checkin.save();

      return res.status(200).json({ msg: "Check-in atualizado", checkin });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao atualizar check-in", erro: error.message });
    }
  }

  // DELETE /checkins/:id → apenas instrutor
  static async deletar(req, res) {
    try {
      const { id } = req.params;

      if (req.usuario.tipo !== "instrutor") {
        return res.status(403).json({ msg: "Apenas instrutores podem deletar check-ins" });
      }

      const checkin = await Checkin.findByPk(id);
      if (!checkin) return res.status(404).json({ msg: "Check-in não encontrado" });

      await checkin.destroy();
      return res.status(200).json({ msg: "Check-in excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao excluir check-in", erro: error.message });
    }
  }
}

module.exports = CheckinController;
