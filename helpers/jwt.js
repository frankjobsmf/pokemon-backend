const jwt = require('jsonwebtoken');

const generateJWT = ( id ) => {
    const payload = { id };
    const privateKey = process.env.PRIVATEKEY;
    
    const accessToken = jwt.sign(payload, privateKey, { expiresIn: '1h'});
    const refreshToken = jwt.sign(payload, privateKey, { expiresIn: '7h'});

    return [accessToken, refreshToken];
};

const decodeToken = ( token ) => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.PRIVATEKEY, (err, data) => {
             if (err) {
                 reject('Error decode token');
             } else {
                 resolve(data);
             };
        });
    });
};

module.exports = {
    generateJWT,
    decodeToken,
}