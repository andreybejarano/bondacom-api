'use strict';

const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/WeatherController');

router.get('/weather', WeatherController.getWeather);

module.exports = router;
