const {Activity, Country} = require('../db');

const getActivities = async (req, res) => {
  try {
    const DBActivities = await Activity.findAll({include: Country});
    res.status(200).json(DBActivities);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {getActivities};
