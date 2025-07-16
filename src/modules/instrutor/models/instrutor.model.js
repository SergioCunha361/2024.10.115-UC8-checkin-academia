const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Instrutor = sequelize.define(
  "Instrutor",
  {
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "O nome deve ter entre 3 e 100 caracteres.",
        },
      },
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
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
        is: {
          args: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
          msg: "A senha deve ter de 6 a 10 caracteres, com pelo menos uma letra, um número e um caractere especial."
        }
      }
    },

    cref: {
      type: DataTypes.STRING(15),
      primaryKey: true,
      allowNull: false,
      validate: {
        is: {
          args: /^CREF\d{4,10}$/,
          msg: "O CREF deve começar com 'CREF' seguido de 4 a 10 números.",
        },
      },
    }
  },
  {
    tableName: "instrutor",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Instrutor;
