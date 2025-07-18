const express = require('express');
const LoginLogout = require('./../controllers/login_logout.controller');

const router = express.Router();


// Login/logout 
router.post('/login', LoginLogout.login);
router.post('/logout', LoginLogout.sair);



// router.post('/refresh-token', AutenticacaoController.refreshToken);

module.exports = router;


