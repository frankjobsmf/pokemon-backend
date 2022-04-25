const { validationResult } = require('express-validator');
const User = require('../models/user.model');

const validateFields = ( req, res, next ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    };

    next();
}

const validateEmail = async( email ) => {
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
        throw new Error('This email already exists');
    };
};

const validateNickname = async( nickname ) => {
    const nicknameExists = await User.findOne({ nickname: nickname });

    if (nicknameExists) {
        throw new Error('This nickname already exists');
    };
};

module.exports = {
    validateFields,
    validateEmail,
    validateNickname
}