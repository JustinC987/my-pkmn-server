const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PokemonSchema = new Schema(
	{
		_id: String,
		name: String,
		type: Array,
		sprites: Object
	},
	{
		collection: 'Poke'
	}
);

var Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = { Pokemon };
