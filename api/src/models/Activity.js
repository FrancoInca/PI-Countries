const {DataTypes} = require('sequelize');

const Activity = (sequelize) => {
  sequelize.define(
    'Activity',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          isNumeric: true,
          min: 1,
          max: 5,
        },
      },
      season: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Spring', 'Summer', 'Autumn', 'Winter']],
        },
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
module.exports = {ActivityModel: Activity};
