'use strict';

const { toDefaultValue } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.addColumn('instrutor', 'criado_em', {      
          
            type: Sequelize.DATE,
            allowNull: false,
             defaultValue: Sequelize.NOW
     });

     await queryInterface.addColumn('instrutor', 'atualizado_em', {      
          
      type: Sequelize.DATE,
      allowNull: false,
       defaultValue: Sequelize.NOW
});
 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('instrutor', 'criado_em');
    await queryInterface.removeColumn('instrutor', 'atualizado_em');
    
  }
};


