const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./resources/js/user/user.routes'); // Importando as rotas dos usuários

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(bodyParser.json());

// config para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// página de cadastro
app.get('/signuppage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// rotas de usuários
app.use('/users', userRoutes); // Prefixo '/users' para as rotas dos usuários

// start (3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
