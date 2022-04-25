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

module.exports = {
    generateJWT
}