const {Country, Activity} = require('../db');
const {Op} = require('sequelize');

const getCountriesByName = async (req, res) => {
  try {
    const country = await Country.findAll({where: {name: {[Op.iLike]: `%${req.query.name}%`}}, include: Activity});
    if (!country.length) return res.status(404).send('Could not find the country you searched');
    return res.status(200).json(country);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {getCountriesByName};
