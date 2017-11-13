'use strict';

const test = require('ava');
const uriParser = require('../lib/utils/UriParser');
const config = require('../lib/config/');
console.log(process.env.NODE_ENV);

test('Uri parser', t => {
	const url = 'http://api.apixu.com/v1/current.json?key=:key&q=:q&lang=:lang';
	const urlFinaly = `http://api.apixu.com/v1/current.json?key=${config.token}&q=Argentina&lang=es`;
	const parameters = {
		key: config.token,
		lang: 'es',
		q: 'Argentina'
	};
	uriParser.setUri(url, parameters);
	const urlParsed = uriParser.getUri();
	t.deepEqual(urlFinaly, urlParsed);
});
