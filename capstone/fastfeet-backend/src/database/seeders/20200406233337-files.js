module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'ea1b5bb9a818ecc22686a00f78706acb.jpeg',
          path: 'ea1b5bb9a818ecc22686a00f78706acb.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'db543fead484523da94a75cbfc4f1349.jpeg',
          path: 'db543fead484523da94a75cbfc4f1349.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '29c84f2f3779f13e8931fdc235c06cd6.jpg',
          path: '29c84f2f3779f13e8931fdc235c06cd6.jpg',
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
