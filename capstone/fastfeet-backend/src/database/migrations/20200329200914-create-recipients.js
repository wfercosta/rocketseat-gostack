module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      zipcode: {
        type: Sequelize.STRING(9),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('recipients');
  },
};
