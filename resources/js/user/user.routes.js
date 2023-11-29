const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/create', userController.createUser); // rota de cadastro de usuário
router.get('/list', userController.listUsers); // rota de listagem de usuários
router.delete('/delete/:id', userController.deleteUser); // rota de exclusão de usuário por id
router.put('/update-password', userController.updateUserPassword); // rota de atualização de senha de usuário
authRouter.post('/sign-in', signIn); // rota de login de usuário

module.exports = router;
