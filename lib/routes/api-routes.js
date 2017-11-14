'use strict';

const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/WeatherController');
const ForecastController = require('../controllers/ForecastController');

router.get('/weather', WeatherController.getWeather);
router.get('/minMaxForecast', ForecastController.getMinMaxForecast);

module.exports = router;
