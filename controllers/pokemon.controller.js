const { request, response } = require('express');

//favorite
const Favorite = require('../models/pokemon.model');

//user
const User = require('../models/user.model');

//jwt
const { decodeToken } = require('../helpers/jwt');

const pokemonsByUser = async( req = request, res = response ) => {
    const token = req.header('Authorization');
    const { id } = await decodeToken( token );

    const user = await User.findById(id);

    if (!user){
        return res.status(401).json({
            msg: 'User not found'
        });
    };

    const favorites = await Favorite.find({ idUser: user.id });

    res.status(200).json({
        msg: 'Pokemons Favorites by User',
        favorites: favorites
    });
};

// const [ total, users ] = await Promise.all([
//     User.countDocuments(query),
//     User.find(query).skip( Number( since ) ).limit( Number( limit ) )

// ])

const saveFavoritePokemon = async( req = request, res = response ) => {
    const token = req.header('Authorization');
    const { idPokemon } = req.params;

    const { id } = await decodeToken( token );

    const user = await User.findById(id);

    if (!user){
        return res.status(401).json({
            msg: 'User not found'
        });
    };

    const existsFavorite = await Favorite.findOne({ idPokemon: idPokemon, idUser: user.id });

    console.log(existsFavorite);
    
    if (!existsFavorite){
        const favorite = new Favorite({ idPokemon: idPokemon, idUser: user.id });

        await favorite.save();

        return res.status(201).json({
            msg: 'Pokemon added to favorites'
        });
    } else {
        await Favorite.findOneAndDelete({ idPokemon: idPokemon, idUser: user.id });

        return res.status(200).json({
            msg: 'Pokemon removed of favorites'
        });
    };
};

module.exports = {
    pokemonsByUser,
    saveFavoritePokemon
}