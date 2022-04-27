const jwt = require('jsonwebtoken');

const generateJWT = ( id ) => {

    return new Promise((resolve, reject) => {

        const payload = { id };
        const privateKey = process.env.PRIVATEKEY;

        jwt.sign( payload, privateKey, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                reject('Generate JWT error');
            } else {
                resolve(token);
            };
        });
    });
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