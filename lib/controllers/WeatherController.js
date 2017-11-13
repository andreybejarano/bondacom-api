'use strict';

const WeatherService = require('../services/WeatherService');
const service = new WeatherService();
class WeatherController {
	static async getWeather(req, res) {
		try {
			let parameters = {
				lang: req.query.lang,
				q: req.query.q
			};
			let weather = await service.getWeather(parameters);
			res.json(weather);
		} catch (error) {
			res.status(500).json({ message: error.message, stack: error.stack });
		}
	}
}

module.exports = WeatherController;
