const { Router } = require('express');

const router = Router();

//controllers auth
const { login } = require('../controllers/auth.controller');

router.post('/login', login);


module.exports = router;