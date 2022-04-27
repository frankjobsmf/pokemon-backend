const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

//user
const User = require('../models/user.model');

//generate token
const { generateJWT } = require('../helpers/jwt');
  
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
    const token = await generateJWT( user.id ); 
 
    res.json({
        msg: 'login',
        nickname: user.nickname,
        token,
    });    
    
};

module.exports = {
    login,
}