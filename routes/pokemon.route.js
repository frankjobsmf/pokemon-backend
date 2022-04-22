const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { 
    pokemonsByUser
} = require('../controllers/pokemon.controller');


router.get('/', pokemonsByUser);


module.exports = router;