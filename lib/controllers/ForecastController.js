'use strict';

const ForecastService = require('../services/ForecastService');
const service = new ForecastService();
class ForecastController {
	static async getMinMaxForecast(req, res) {
		try {
			let parameters = {
				lang: req.query.lang,
				q: req.query.q,
				days: req.query.days
			};
			let forecast = await service.getMinMaxForecast(parameters);
			res.json(forecast);
		} catch (error) {
			res.status(500).json({ message: error.message, stack: error.stack });
		}
	}
}

module.exports = ForecastController;
