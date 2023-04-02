const {Activity} = require('../db');

const postActivity = async (req, res) => {
  try {
    const {name, difficulty, season, CountryID} = req.body;
    const newActivity = await Activity.create({name, difficulty, season});
    newActivity.addCountry(CountryID);
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = {postActivity};
