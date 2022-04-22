const { Schema, model } = require('mongoose');

const Favorite = new Schema({
    idPokemon: {
        type: Number,
        required: [true, 'The id of the Pokemon is required']
    },
    idUser: {
        type: Number,
        required: [true, 'The id user is required']
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

