import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        street: Sequelize.STRING(60),
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING(60),
        state: Sequelize.STRING(40),
        city: Sequelize.STRING(40),
        zipcode: Sequelize.STRING(9),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Recipient;
