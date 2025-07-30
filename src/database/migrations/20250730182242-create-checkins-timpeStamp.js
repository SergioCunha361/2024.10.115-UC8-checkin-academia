'use strict';

const { toDefaultValue } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.addColumn('checkins', 'criado_em', {      
          
            type: Sequelize.DATE,
            allowNull: false,
             defaultValue: Sequelize.NOW
     });

     await queryInterface.addColumn('checkins', 'atualizado_em', {      
          
      type: Sequelize.DATE,
      allowNull: false,
       defaultValue: Sequelize.NOW
});
 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('checkins', 'criado_em');
    await queryInterface.removeColumn('checkins', 'atualizado_em');
    
  }
};




