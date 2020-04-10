module.exports = {
  up: async (queryInterface) => {
    const deliveries = await queryInterface.sequelize.query(
      'SELECT id FROM deliveries ORDER BY 1 DESC LIMIT 1'
    );

    return queryInterface.bulkInsert(
      'problems',
      [
        {
          description: 'Customer absent to receive order',
          delivery_id: deliveries[0][0].id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('problems', null, {});
  },
};
