const { Router } = require('express');
const { check, custom } = require('express-validator');

const router = Router();

const { 
    pokemonsByUser,
    saveFavoritePokemon,
} = require('../controllers/pokemon.controller');


router.get('/', pokemonsByUser);
router.post('/save/:idPokemon', saveFavoritePokemon);

module.exports = router;