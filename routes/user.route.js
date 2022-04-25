const { Router } = require('express');
const { check, custom } = require('express-validator');
const { 
    profileUser,
    registerUser,
} = require('../controllers/user.controller');

//validators
const {
    validateEmail,
    validateNickname,
    validateFields
} = require('../middlewares/validators');

const router = Router();

router.get('/', profileUser);
router.post('/register', [
    check('nickname', 'The nickname is required').not().isEmpty(),
    check('nickname').custom( validateNickname ),
    // check('email', 'The email is not valid').isEmail(),
    check('email').custom( validateEmail ),
    check('password', 'The password must be at least 6 characters long').isLength({min: 6}),
    validateFields    
], registerUser);

module.exports = router;