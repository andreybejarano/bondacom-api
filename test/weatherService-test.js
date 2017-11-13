'use strict';

const test = require('ava');
const WeatherService = require('../lib/services/WeatherService');
const config = require('../lib/config/');

test.beforeEach(t => {
	t.context.parameters = {
		key: config.token,
		q: 'Argentina',
		lang: 'es'
	};
	t.context.weatherService = new WeatherService();
});

test('get weather', async t => {
	let parameters = t.context.parameters;
	let weatherService = t.context.weatherService;
	t.is(typeof weatherService.getWeather, 'function', 'getWeather is a function');
	let result = await weatherService.getWeather(parameters);
	t.truthy(result.temp);
});
