'use strict';

const request = require('request-promise');
const config = require('../config/');
const uriParser = require('../utils/UriParser');

class WeatherService {
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

	transformerWeather(weather) {
		const {temp_c, humidity, condition} = weather.current;

		return {
			temp: temp_c,
			humidity,
			condition: condition.text
		};
	}
}

module.exports = WeatherService;
