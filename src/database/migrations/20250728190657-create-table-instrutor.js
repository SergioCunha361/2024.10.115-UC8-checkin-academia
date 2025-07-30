'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('instrutor', { 

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
        
            cref: {
              type: Sequelize.STRING(15),
              primaryKey: true,
              allowNull: false,
              
            }


        });
    
  },


  async down (queryInterface, Sequelize) {
  
    await queryInterface.dropTable('instrutor');
    
  }
};
