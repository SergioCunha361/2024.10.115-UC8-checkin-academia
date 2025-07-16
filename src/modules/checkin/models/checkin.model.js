const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Checkin = sequelize.define(
  "Checkin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    alunoId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    data_entrada: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notInPast(value) {
          const hoje = new Date().toISOString().split("T")[0];
          if (value < hoje) {
            throw new Error("A data de entrada não pode ser anterior à data atual.");
          }
        },
      },
    },

    data_saida: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        notInPast(value) {
          if (value) {
            const hoje = new Date().toISOString().split("T")[0];
            if (value < hoje) {
              throw new Error("A data de saída não pode ser anterior à data atual.");
            }
          }
        },
      },
    },

    plano: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "checkin",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Checkin;
