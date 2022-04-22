const { request, response } = require('express');

const pokemonsByUser = ( req = request, res = response ) => {
    res.status(200).json({
        msg: 'Pokemons Favorites by User'
    });
};



module.exports = {
    pokemonsByUser
}