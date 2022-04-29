const { Router } = require('express');

const router = Router();

//controllers auth
const { login, refreshToken } = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/refreshtoken', refreshToken);


module.exports = router;