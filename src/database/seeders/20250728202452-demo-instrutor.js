'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashSenha = (senha) => bcrypt.hashSync(senha, 10);

    await queryInterface.bulkInsert('instrutor', [
      {
        nome: 'Eduardo Lopes',
        email: 'eduardo.lopes@email.com',
        senha: hashSenha('Edu@1234'),
        cref: 'CREF12345',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Patrícia Mello',
        email: 'patricia.mello@email.com',
        senha: hashSenha('Patri@567'),
        cref: 'CREF23456',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Marcos Vieira',
        email: 'marcos.vieira@email.com',
        senha: hashSenha('Marc@890'),
        cref: 'CREF34567',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Juliana Rocha',
        email: 'juliana.rocha@email.com',
        senha: hashSenha('Juli@321'),
        cref: 'CREF45678',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Fernando Dias',
        email: 'fernando.dias@email.com',
        senha: hashSenha('Fern@999'),
        cref: 'CREF56789',
        criado_em: new Date(),
        atualizado_em: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('instrutor', null, {});
  }
};
