request = require('postman-request');

const forecast = 	(latitude, longitude, callback) => {
	const access_key = '7bc64d55d2864cb423189e9593273141';
	const location = latitude + ',' + longitude;
	const units = 'm';

	const url = 'http://api.weatherstack.com/current?access_key='
	+ access_key + '&query=' + location + '&units=' + units;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback(body.error.info, undefined);
		} else {
			const {
				observation_time,
				temperature,
				weather_descriptions,
				humidity,
				feelslike
			} = body.current;

			const message =
				`The weather is ${weather_descriptions}.\n`
				+ `It is currently ${temperature} degrees out.\n`
				+ `It feels like ${feelslike} degrees out.\n`
				+ `The humidity is ${humidity}.\n`
				+ `The observation time is ${observation_time}.\n`;

			callback(undefined, message);
		}
	});
};

module.exports = forecast;