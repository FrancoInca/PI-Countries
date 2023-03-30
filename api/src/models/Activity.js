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
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dificultad: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          isNumeric: true,
          min: 1,
          max: 5,
        },
      },
      temporada: {
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
