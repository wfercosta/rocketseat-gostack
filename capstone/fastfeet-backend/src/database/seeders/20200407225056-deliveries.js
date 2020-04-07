const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const files = await queryInterface.sequelize.query(
      "SELECT id FROM files WHERE name='29c84f2f3779f13e8931fdc235c06cd6.jpg' LIMIT 1"
    );

    const recipients = await queryInterface.sequelize.query(
      'SELECT id FROM recipients LIMIT 1'
    );

    const deliverymen = await queryInterface.sequelize.query(
      'SELECT id FROM deliverymen LIMIT 1'
    );

    return queryInterface.bulkInsert(
      'deliveries',
      [
        {
          product: faker.commerce.productName(),
          recipient_id: recipients[0][0].id,
          deliveryman_id: deliverymen[0][0].id,
          signature_id: files[0][0].id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('deliveries', null, {});
  },
};
