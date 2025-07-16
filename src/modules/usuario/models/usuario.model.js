const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");
const Assinatura = require("../../assinatura/models/assinatura.model");

const Usuario = sequelize.define(
  "Usuario",
  {
    codigo_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [10, 50],
          msg: "O nome deve ter entre 10 e 50 caracteres.",
        },
      },
    },
    papel: {
      type: DataTypes.ENUM("aluno", "professor", "secretario"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["aluno", "professor", "secretario"]],
          msg: "O papel deve ser aluno, professor ou secretario.",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
      validate: {
        isEmail: { msg: "E-mail inválido." },
        len: {
          args: [10, 100],
          msg: "O e-mail deve ter entre 10 e 100 caracteres.",
        },
      },
    },

    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // is: {
        //   args: /^[A-Za-z0-9]{6,10}$/,
        //   msg: "A senha deve ter de 6 a 10 caracteres, com pelo menos 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial.",
        // },
      },
    },
  },
  {
    tableName: "usuarioDigital",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Usuario;
