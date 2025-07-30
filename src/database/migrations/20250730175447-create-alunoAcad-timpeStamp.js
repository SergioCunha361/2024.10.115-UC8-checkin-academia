'use strict';

const { toDefaultValue } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.addColumn('alunoAcad', 'criado_em', {      
          
            type: Sequelize.DATE,
            allowNull: false,
             defaultValue: Sequelize.NOW
     });

     await queryInterface.addColumn('alunoAcad', 'atualizado_em', {      
          
      type: Sequelize.DATE,
      allowNull: false,
       defaultValue: Sequelize.NOW
});
 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('alunoAcad', 'criado_em');
    await queryInterface.removeColumn('alunoAcad', 'atualizado_em');
    
  }
};


