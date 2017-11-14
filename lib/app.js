'use strict';

const expressApp = require('express')();
const config = require('./config/');
const morgan = require('morgan');
// use ForecasrService for add forecast data
const ForecastService = require('./services/ForecastService');
const forecastService = new ForecastService();
forecastService.requestForecast({}).then(forecast => { forecast; }).catch(error => { console.log(error); });
const basePath = '';

// use morgan for logs in development
expressApp.use(morgan('dev'));

// disabled x-powered-by for security
expressApp.disable('x-powered-by');

// include routes and expose in base path
expressApp.use(basePath, require('./routes/api-routes'));

expressApp.listen(config.port, () => {
	console.log(`Server started on port ${config.port}`);
});

module.exports = expressApp;
