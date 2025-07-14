const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Usuario = require("../../usuario/models/usuario.model");
const Assinatura = sequelize.define(
  "Assinatura",
  {
    codigo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        
        model: "usuarioDigital",
        key: "codigo_usuario"
      }
    },

    codigo_assinante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    revista_nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "O nome da revista deve ter entre 3 e 100 caracteres."
        }
      }
    },

    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "Data de início inválida." }
      }
    },

    data_fim: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "Data de fim inválida." },
        isMaiorQueInicio(value) {
          if (this.data_inicio && value <= this.data_inicio) {
            throw new Error("A data de fim deve ser maior que a data de início.");
          }
        }
      }
    },

    status: {
      type: DataTypes.ENUM("ativa", "cancelada", "expirada"),
      defaultValue: "ativa",
      allowNull: false
    }
  },
  {
    tableName: "assinaturas",
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
);


module.exports = Assinatura;
