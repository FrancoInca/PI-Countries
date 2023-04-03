const {Activity} = require('../db');

const postActivity = async (req, res) => {
  try {
    const {name, difficulty, season, CountryID} = req.body;
    const countries = CountryID.split(',');
    console.log(countries);
    const newActivity = await Activity.create({name, difficulty, season});
    countries.map((e) => newActivity.addCountry(e));
    return res.status(201).json(newActivity);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = {postActivity};
