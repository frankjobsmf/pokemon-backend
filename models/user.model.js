const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    nickname: {
        type: String,
        unique: true,
        required: [true, 'The nickname is required']
    },
    
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },

})

module.exports = model( 'User', UserSchema );