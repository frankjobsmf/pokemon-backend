const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user
const User = require('../models/user.model');

//generate token
const { generateJWT, decodeToken } = require('../helpers/jwt');
  
const login = async( req = request, res = response) => {
    const { nickname, password } = req.body;

    //validar si nickname existe
    const user = await User.findOne({ nickname });

    if (!user){
        return res.status(400).json({
            msg: 'User not found'
        });
    }
    
    //comparando password
    const pass = bcryptjs.compareSync(password, user.password);

    if (!pass){
        return res.status(400).json({
            msg: 'Passwords do not match'
        });
    }

    //falta generar el jwt
    const tokens = await generateJWT( user.id ); 
 
    res.json({
        msg: 'login',
        nickname: user.nickname,
        accessToken: tokens[0],
        refreshToken: tokens[1],
    });
};

const refreshToken = async( req = request, res = response ) => {

    const refresh = req.header('Authorization');

    if ( !refresh ){
        return res.status( 401 ).json({
            msg: 'Refresh Token error validate'
        });
    };

    const { id } = await decodeToken( refresh );
    const [ accessToken, refreshToken ] = await generateJWT( id );


    res.status(200).json({
        accessToken,
        refreshToken
    });
};

module.exports = {
    login,
    refreshToken,
}