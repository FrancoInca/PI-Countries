const {Country, Activity} = require('../db');

async function getAllCountries(req, res) {
  try {
    const DBResponse = await Country.findAll({include: Activity});
    res.status(200).json(DBResponse);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

module.exports = {getAllCountries};
