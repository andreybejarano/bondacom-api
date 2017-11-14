module.exports = {
	endpoints: {
		weather: 'http://api.apixu.com/v1/current.json?key=:key&q=:q&lang=:lang',
		forecast: 'http://api.apixu.com/v1/forecast.json?key=:key&q=:q&lang=:lang&days=:days'
	},
	token: '409167ff741942d9a59201326170304',
	parametersDefault: {
		lang: 'es',
		q: 'Argentina',
		days: 1
	},
	db: {
		host: 'localhost',
		port: 28015,
		db: 'bondacom_db',
		setup: true
	},
	port: 5000
};
