'use strict';

const { toDefaultValue } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('alunoAcad', { 
        nome: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
      
          email: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,            
          },
      
          senha: {
            type: Sequelize.STRING,
            allowNull: false,
           
          },
          matricula: {
            type: Sequelize.STRING,
            primaryKey: true,
            
          },
         plano: {
           type: Sequelize.ENUM("mensal", "trimestral", "anual"),
           allowNull: false,
           },

     });
     
    // Adicionar índices para facilitar pesquisas independe da cve primária
    await queryInterface.addIndex('alunoAcad', ['email']);
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('alunoAcad');
    
  }
};
