module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'ea1b5bb9a818ecc22686a00f78706acb.jpeg',
          path: '/deliverymen/avatars',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'db543fead484523da94a75cbfc4f1349.jpeg',
          path: '/deliverymen/avatars',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (QueryInterface) => {
    await QueryInterface.bulkDelete('files', null, {});
  },
};
