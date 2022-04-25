const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const registerUser = async(  req = request, res = response ) => {
    const { nickname, email, password } = req.body;

    //hash password
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync( password, salt );

    const user = new User({
        nickname,
        email,
        password
    });

    user.password = hash;

    await user.save();

    res.status(200).json({
        msg: 'User created',
        user
    });
}

const profileUser = ( req = request, res = response) => {
    res.status(200).json({
        msg: 'Profile User'
    });
};

module.exports = {
    profileUser,
    registerUser,
}