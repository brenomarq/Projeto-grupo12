const express = require('express');
const router = express.Router();
const { signIn } = require('./auth.controller');

router.post('/login', signIn);

module.exports = router;
