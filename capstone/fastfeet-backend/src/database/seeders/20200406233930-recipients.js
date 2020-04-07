module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Princess Leia',
          street: 'Viela Rafaela Rua',
          number: 98792,
          complement: 'Suite 305',
          state: 'Amapá',
          city: 'Suélendo Descoberto',
          zipcode: '47716-738',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Lando Calrissian',
          street: 'Marginal Fábio Ponte',
          number: 81784,
          complement: 'Suite 057',
          state: 'Rio de Janeiro',
          city: 'Silvado Sul',
          zipcode: '24330',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (QueryInterface) => {
    await QueryInterface.bulkDelete('recipients', null, {});
  },
};
