const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models['Contests'].belongsTo(models['Users'], { foreignKey: 'userId', sourceKey: 'id' });
      models['Contests'].hasMany(models['Offers'], { foreignKey: 'contestId', targetKey: 'id' });
    }
  }
  Contest.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    orderId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    contestType: {
      allowNull: false,
      type: DataTypes.ENUM('name', 'tagline', 'logo'),
    },
    fileName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    originalFileName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    typeOfName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    industry: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    focusOfWork: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    targetCustomer: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    styleName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    nameVenture: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    typeOfTagline: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    brandStyle: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prize: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    priority: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Contests',
    timestamps: false,
  });
  return Contest;
};
