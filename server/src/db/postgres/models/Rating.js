const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models['Ratings'].belongsTo(models['Users'], { foreignKey: 'userId', targetKey: 'id' });
      models['Ratings'].belongsTo(models['Offers'], { foreignKey: 'offerId', targetKey: 'id' });
    }
  }
  Rating.init({
    offerId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    mark: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
  }, {
    sequelize,
    modelName: 'Ratings',
    timestamps: false,
  });
  return Rating;
};
