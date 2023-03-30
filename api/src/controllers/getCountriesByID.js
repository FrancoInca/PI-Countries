const {Country, Activity} = require('../db');

const getCountriesByID = async (req, res) => {
  try {
    const country = await Country.findOne({where: {id: req.params.id}, include: Activity});
    res.status(200).json(country);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {getCountriesByID};
