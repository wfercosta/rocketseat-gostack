module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('problems', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      descritpion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'deliveries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('problems');
  },
};
