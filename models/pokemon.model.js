const { Schema, model } = require('mongoose');

const FavoriteSchema = new Schema({
    idPokemon: {
        type: Number,
        required: [true, 'The id of the Pokemon is required']
    },
    idUser: {
        type: Object,
        required: [true, 'The id user is required']
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = model( 'Favorite', FavoriteSchema );