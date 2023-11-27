const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/create', userController.createUser);
router.get('/list', userController.listUsers);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
