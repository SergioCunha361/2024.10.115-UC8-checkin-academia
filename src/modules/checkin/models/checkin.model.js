const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Checkin = sequelize.define("Checkin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  alunoId: {
    type: DataTypes.STRING,
    allowNull: false,    
    references: {
      model: 'alunoAcad',
      key: 'matricula',
    }, 
    onDelete:"CASCADE",  
  },

  data_hora_entrada: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isAfterHoje(value) {
        const hoje = new Date().toISOString().split("T")[0];
        if (value < hoje) {
          throw new Error("A data de entrada não pode ser anterior à data atual.");
        }
      }
    }
  },

  data_hora_saida: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isAfterEntrada(value) {
        if (value && this.data_hora_entrada && value < this.data_hora_entrada) {
          throw new Error("A data de saída não pode ser anterior à data de entrada.");
        }
      }
    }
  },

  plano: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "checkins",
  createdAt: "criado_em",
  updatedAt: "atualizado_em",
});

module.exports = Checkin;
