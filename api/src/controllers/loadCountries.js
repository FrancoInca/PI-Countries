const axios = require('axios');
const {Country} = require('../db');

const saveData = (data) => {
  return {
    id: data.cca3,
    nombre: data.name.common,
    bandera: data.flags[1],
    continente: data.continents[0],
    capital: data.capital ? data.capital[0] : null,
    area: parseInt(data.area),
    poblacion: parseInt(data.population),
  };
};
async function loadCountries(req, res) {
  try {
    const response = await axios.get('https://restcountries.com/v3/all');
    const data = response.data.map((e) => saveData(e));
    await data.forEach((e) => Country.create(e));
    console.log('DataBase has been fully updated');
    res.status(200).json({status: 'Fine'});
  } catch (err) {
    res.status(400).send('The database has an error ' + err.message);
  }
}

module.exports = {loadCountries};
