const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models['Offers'].belongsTo(models['Users'], { foreignKey: 'userId', sourceKey: 'id' });
      models['Offers'].belongsTo(models['Contests'], { foreignKey: 'contestId', sourceKey: 'id' });
      models['Offers'].hasOne(models['Ratings'], { foreignKey: 'offerId', targetKey: 'id' });
    }
  }
  Offer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    originalFileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
  }, {
    sequelize,
    modelName: 'Offers',
    timestamps: false,
  });
  return Offer;
};
