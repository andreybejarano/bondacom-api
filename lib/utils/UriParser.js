'use strict';

class UriParser {
	constructor() {
		this.uri = null;
	}

	setUri(uri, values) {
		Object.keys(values).forEach((key) => {
			let regex = new RegExp(':' + key + '\\b', 'g');
			let queryRegex = new RegExp('([a-zA-Z0-9-_\.]*)\=:' + key + '\\b'); // eslint-disable-line
			let match = uri.match(queryRegex);
			let queryParam;
			if (match && match.length > 1) {
				queryParam = match[1];
				regex = new RegExp(queryRegex, 'g');
			}
			let replacement = '';
			let tokenValue = values[key];
			if (tokenValue !== undefined) {
				if (Array.isArray(tokenValue)) {
					for (let i in tokenValue) {
						replacement += queryParam + '=' + tokenValue[i] + '&';
					}
					replacement = replacement.substring(0, replacement.length - 1);
				} else {
					replacement = (queryParam === undefined ? '' : queryParam + '=') +
						tokenValue.toString();
				}
			}
			uri = uri.replace(regex, replacement);
		});

		uri = uri.replace(/(&|\?)[a-zA-Z0-9-_\.]*=:[a-zA-Z0-9-_\.]*/g, ''); // eslint-disable-line
		uri = (uri.indexOf('?') !== -1) ? uri : uri.replace('&', '?');

		this.uri = uri;
	}

	getUri() {
		return this.uri;
	}
}

module.exports = new UriParser();
