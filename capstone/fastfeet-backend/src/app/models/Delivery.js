import Sequelize, { Model } from 'sequelize';
import Problem from './Problem';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        cancelled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'deliveries',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });

    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });

    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });

    this.hasMany(models.Problem, {
      foreignKey: 'delivery_id',
      as: 'problems',
    });

    this.belongsTo(models.Problem, {
      foreignKey: 'reason_id',
      as: 'reason',
    });
  }
}

export default Delivery;
