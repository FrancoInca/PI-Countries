const {Country} = require('../db');
const {Op} = require('sequelize');

const getCountriesByName = async (req, res) => {
  try {
    const country = await Country.findAll({where: {name: {[Op.iLike]: `%${req.query.name}%`}}});
    if (country.length > 0) return res.status(200).json(country);
    return res.status(404).send('Could not find the country you searched');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {getCountriesByName};
