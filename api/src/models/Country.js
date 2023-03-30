const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
/*module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};*/
const Country = (sequelize) => {
  sequelize.define(
    'Country',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      bandera: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continente: {
        type: DataTypes.STRING,
        defaulValue: 'Unknown',
      },
      capital: {
        type: DataTypes.STRING,
        defaulValue: 'Unknown',
      },
      area: {
        type: DataTypes.INTEGER,
        defaulValue: 0,
      },
      poblacion: {
        type: DataTypes.INTEGER,
        defaulValue: 0,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
module.exports = {CountryModel: Country};
