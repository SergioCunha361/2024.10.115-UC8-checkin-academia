'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('checkins', [
      {
        alunoId: 'A12345678',
        data_hora_entrada: new Date().toISOString().split("T")[0], // hoje
        data_hora_saida: null,
        plano: 'mensal',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        alunoId: 'B23456789',
        data_hora_entrada: new Date().toISOString().split("T")[0],
        data_hora_saida: null,
        plano: 'trimestral',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        alunoId: 'C34567890',
        data_hora_entrada: new Date().toISOString().split("T")[0],
        data_hora_saida: null,
        plano: 'anual',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        alunoId: 'D45678901',
        data_hora_entrada: new Date().toISOString().split("T")[0],
        data_hora_saida: null,
        plano: 'mensal',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        alunoId: 'E56789012',
        data_hora_entrada: new Date().toISOString().split("T")[0],
        data_hora_saida: null,
        plano: 'trimestral',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('checkins', null, {});
  }
};
