'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('checkins', { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      
        alunoId: {
          type: Sequelize.STRING,
          allowNull: false,    
          references: {
            model: 'alunoAcad',
            key: 'matricula',
          },
          onUpdate:"CASCADE",   
        },
      
        data_hora_entrada: {
          type: Sequelize.DATEONLY,
          allowNull: false,
         
        },
      
        data_hora_saida: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        
        },
      
        plano: {
          type: Sequelize.STRING,
          allowNull: false,
        },
    
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('checkins');
  
  }
};
