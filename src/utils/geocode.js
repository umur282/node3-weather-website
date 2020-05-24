const request = require('postman-request');

const geocode = (adress, callback) => {
	const access_token = 'pk.eyJ1IjoidW11cjI4MiIsImEiOiJja2FkZXR4bGcwNmlsMzBueHQxMTE5NmM5In0.6zNPAdla30SJZqQC8ImFqQ';
	adress = encodeURIComponent(adress);
	const limit = '1';

	const url =
	'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress
	+ '.json?access_token=' + access_token + '&limit=' + limit;

	request({ url: url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (Object.keys(body).length === 1) {
			callback(body.message, undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			const { center, place_name } = body.features[0];

			callback(undefined, {
				latitude: center[1],
				longitude: center[0],
				location: place_name
			});
		}
	});
};

module.exports = geocode;