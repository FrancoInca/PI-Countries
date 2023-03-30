// const { Router } = require('express');
const express = require('express');
const {getActivities} = require('../controllers/getActivities');
const {getAllCountries} = require('../controllers/getAllCountries');
const {getCountriesByID} = require('../controllers/getCountriesByID');
const {getCountriesByName} = require('../controllers/getCountriesByName');
const {loadCountries} = require('../controllers/loadCountries');
const {postActivity} = require('../controllers/postActivity');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();

router.get('/countries/search', getCountriesByName);
router.get('/countries', getAllCountries);
router.get('/countries/:id', getCountriesByID);
router.post('/activities', postActivity);
router.get('/activities', getActivities);
router.post('/countries/bulk', loadCountries); //Descomentar al momento de no querer reiniciar el servidor a cada rato;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
