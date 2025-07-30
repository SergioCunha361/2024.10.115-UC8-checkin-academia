'use strict';

const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alunoAcad', [
      {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        senha: await bcrypt.hash('senha@123', 10), // supondo que já foi criptografada se necessário
        matricula: 'A12345678',
        plano: 'mensal',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Maria Souza',
        email: 'maria.souza@email.com',
        senha: await bcrypt.hash('senha@123', 10),
        matricula: 'B23456789',
        plano: 'trimestral',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Carlos Andrade',
        email: 'carlos.andrade@email.com',
        senha: await bcrypt.hash('senha@123', 10),
        matricula: 'C34567890',
        plano: 'anual',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Ana Paula',
        email: 'ana.paula@email.com',
        senha: await bcrypt.hash('senha@123', 10),
        matricula: 'D45678901',
        plano: 'mensal',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Felipe Martins',
        email: 'felipe.martins@email.com',
        senha: await bcrypt.hash('senha@123', 10),
        matricula: 'E56789012',
        plano: 'trimestral',
        criado_em: new Date(),
        atualizado_em: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunoAcad', null, {});
  }
};

