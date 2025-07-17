const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Aluno = sequelize.define(
  "Aluno",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
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
      // validate: {
      //   is: {
      //     args: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
      //     msg: "A senha deve ter de 6 a 10 caracteres, com pelo menos uma letra, um número e um caractere especial."
      //   }
      // }
    },
    matricula: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        is: {
          args: /^[A-Za-z]\d{8}$/,
          msg: "A matricula deve iniciar com uma letra  e 8 números!",
        },
      },
    },
   
  plano: {
  type: DataTypes.ENUM("mensal", "trimestral", "anual"),
  allowNull: false,
  validate: {
    isIn: {
      args: [["mensal", "trimestral", "anual"]],
      msg: "O plano deve ser mensal, trimestral ou anual.",
    },
  },
}
   
  },
  {
    tableName: "alunoAcad",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Aluno; 