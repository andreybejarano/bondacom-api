'use strict';
const request = require('request-promise');
const config = require('../config/');
const uriParser = require('../utils/UriParser');
const ForecastModel = require('../models/ForecastModel');
const model = new ForecastModel();

class ForecastService {
	/**
	 * requestForecast
	 * @param {Object} parameters receive parameter for request
	 * @description this method request data by apixu
	 * @returns {Promise} resolve data of apixu endpoint forecast or reject error
	 */
	async requestForecast(parameters) {
		parameters.q = parameters.q || config.parametersDefault.q;
		parameters.lang = parameters.lang || config.parametersDefault.lang;
		parameters.key = parameters.key || config.token;
		parameters.days = parameters.days || config.days;
		uriParser.setUri(config.endpoints.forecast, parameters);
		const url = uriParser.getUri();
		const options = {
			method: 'GET',
			uri: url,
			json: true
		};
		try {
			let response = await request(options);
			let forecast = await model.getForecast();
			let forecastHours = this.transformerForecast(response);
			for (let hour of forecastHours) {
				if (!forecast.some(element => element.time === hour.time)) {
					await model.saveForecast(hour);
				}
			}
			return Promise.resolve(forecastHours);
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	/**
	 * transformerForecast
	 * @param {Object} data 
	 * @description This method transforme forecast data
	 * @returns {Array} return Array list forecast hours
	 */
	transformerForecast(data) {
		const forecastHours = [];
		for (let forecast of data.forecast.forecastday) {
			for (let hour of forecast.hour) {
				forecastHours.push({ time: hour.time, temp: hour.temp_c });
			}
		}
		return forecastHours;
	}

	/**
	 * getMinMaxForecast
	 * @description this method resolve min and max of forecast in data base
	 * @returns {Object} resolve data forecast min and max
	 */
	async getMinMaxForecast() {

		let forecast = await model.getForecast();
		forecast.sort((a, b) => {
			if (a.temp > b.temp) return 1;
			if (a.temp < b.temp) return -1;
			return 0;
		});
		let minForecast = forecast.reduce((previus, current) => {
			return previus.temp < current.temp ? previus : current;
		});
		let maxForecast = forecast.reduce((previus, current) => {
			return previus.temp > current.temp ? previus : current;
		});
		delete minForecast.id;
		delete maxForecast.id;
		return { minForecast, maxForecast };
	}
}

module.exports = ForecastService;
