const express = require('express');
const { getCountries, getCountryCurrenciesByCca2, groupCountries, downloadCountriesFile } = require('../controllers/countriesControllers');

const router = express.Router();

// Routes
router.get('/countries', getCountries);
router.get('/countries/:cca2/currencies', getCountryCurrenciesByCca2);
router.get('/countries/group', groupCountries);
router.get('/countries/download', downloadCountriesFile);

module.exports = router;