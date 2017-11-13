module.exports = {
	endpoints: {
		weather: 'http://api.apixu.com/v1/current.json?key=:key&q=:q&lang=:lang'
	},
	token: '409167ff741942d9a59201326170304',
	parametersDefault: {
		lang: 'es',
		q: 'Argentina'
	},
	port: 5001
};
