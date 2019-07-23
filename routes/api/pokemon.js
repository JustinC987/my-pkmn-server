var express = require('express');
// import stockSchema from '../../models/stockSchema';
var request = require('request');
const router = express.Router();
const fs = require('fs');

// require('dotenv').config();

/* router.route('/:pokemon').get((req, res) => {
	var url =
		'https://cloud.iexapis.com/beta/stock/' + req.params.ticker + '/quote?token=' + process.env.IEX_PUBLIC_TOKEN;
	request.get(url, (error, response, body) => {
		res.send(body);
	});
}); */

// Get all pokemon
router.route('/all').get((req, res) => {
	let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=807';
	request.get(url, (error, response, body) => {
		res.send(body);
		console.log('BODY: ', body);
	});
});

// Search Pokemon
router.route('/:pokemon').get((req, res) => {
	let url = 'https://pokeapi.co/api/v2/pokemon/' + req.params.pokemon;
	request.get(url, (error, response, body) => {
		let jsonBody = JSON.parse(body);
		let pokemonArray = [];
		let slimPokemonArray = [];
		pokemonArray.push(jsonBody);
		pokemonArray.forEach((attribute) => {
			slimPokemonArray.push({ id: attribute.id, name: attribute.name, type: attribute.types });
		});
		res.send(slimPokemonArray);
	});
});

// Search By Gen

router.route('/generation/:gen').get((req, res) => {
	let url = '';
	let generation = req.params.gen;
	console.log('fuck you: ', generation);
	if (generation == 'gen1') {
		url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
	}

	if (generation === 'gen2') {
		url = 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100';
	}

	if (generation === 'gen3') {
		url = 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=135';
	}

	if (generation === 'gen4') {
		url = 'https://pokeapi.co/api/v2/pokemon?offset=386&limit=107';
	}

	if (generation === 'gen5') {
		url = 'https://pokeapi.co/api/v2/pokemon?offset=493&limit=156';
	}

	if (generation === 'gen6') {
		url = 'https://pokeapi.co/api/v2/pokemon?offset=649&limit=72';
	}

	if (generation === 'gen7') {
		url = 'https://pokeapi.co/api/v2/pokemon?offset=721&limit=86';
	}

	request.get(url, (error, response, body) => {
		res.send(body);
	});
});

module.exports = router;
