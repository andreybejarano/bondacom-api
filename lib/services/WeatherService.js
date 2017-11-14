'use strict';

const request = require('request-promise');
const config = require('../config/');
const uriParser = require('../utils/UriParser');

class WeatherService {

	/**
	 * getWeather
	 * @param {Object} parameters receive parameter for request
	 * @description this method request data by apixu
	 * @returns {Promise} resolve data of apixu endpoint weather or reject error
	 */
	async getWeather(parameters) {
		parameters.q = parameters.q || config.parametersDefault.q;
		parameters.lang = parameters.lang || config.parametersDefault.lang;
		parameters.key = parameters.key || config.token;
		uriParser.setUri(config.endpoints.weather, parameters);
		const url = uriParser.getUri();
		const options = {
			method: 'GET',
			uri: url,
			json: true
		};
		try {
			let weather = await request(options);
			return Promise.resolve(this.transformerWeather(weather));
		} catch (error) {
			return Promise.reject(new Error(error));
		}
	}

	/**
	 * transformerWeather
	 * @param {Object} weather 
	 * @description This method transforme weather data
	 * @returns {Object} return object {temp, humidity, condition}
	 */
	transformerWeather(weather) {
		const { temp_c, humidity, condition } = weather.current;

		return {
			temp: temp_c,
			humidity,
			condition: condition.text
		};
	}
}

module.exports = WeatherService;
