const {Activity} = require('../db');

const postActivity = async (req, res) => {
  try {
    const {nombre, dificultad, temporada, CountryID} = req.body;
    const newActivity = await Activity.create({nombre, dificultad, temporada});
    newActivity.addCountry(CountryID);
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = {postActivity};
