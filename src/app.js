const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); //app.set(key, value)
app.set('views', viewsPath); // changing views path to templates
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', { // no need for extension, .hbs
		title: 'Weather',
		name: 'Umur Ozdemir'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Umur Ozdemir'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text',
		title: 'Help',
		name: 'Umur Ozdemir'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You muss provide a address term'
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				address: req.query.address,
				location,
				forecast: forecastData
			});
		});
	});
});

app.get('/products', (req, res) => {
	// first query muss be search
	if (!req.query.search) {
		return res.send({
			error: 'You muss provide a search term'
		});
	}

	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found!',
		name: 'Umur Ozdemir'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found!',
		name: 'Umur Ozdemir'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});