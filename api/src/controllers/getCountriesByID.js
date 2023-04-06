const {Country, Activity} = require('../db');

const getCountriesByID = async (req, res) => {
  try {
    const country = await Country.findOne({where: {id: req.params.id}, include: Activity});
    if (!country) return res.status(404).send('Country not found');
    res.status(200).json(country);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {getCountriesByID};
