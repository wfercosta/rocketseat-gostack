module.exports = {
  up: async (queryInterface) => {
    const files = await queryInterface.sequelize.query('SELECT id FROM files');

    return queryInterface.bulkInsert(
      'deliverymen',
      [
        {
          name: 'Boba Fett',
          email: 'boba_fett@fastfeet.com',
          avatar_id: files[0][0].id,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Obi-Wan Kenobi',
          email: 'obi-wan-kenobi@fastfeet.com',
          avatar_id: files[0][1].id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (QueryInterface) => {
    await QueryInterface.bulkDelete('deliverymen', null, {});
  },
};
