const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const authRoutes = require('./resources/js/auth/auth.routes');
const cors = require('cors'); // middleware para permitir requisições de outros domínios evitando block do navegador :(
const bodyParser = require('body-parser'); // middleware para fazer o parse do body das requisições
const userRoutes = require('./resources/js/user/user.routes'); // Importando as rotas dos usuários
const jwt = require('jsonwebtoken');
const authenticateToken = require('./resources/js/auth/authMiddleware.js'); 
const postRoutes = require('./resources/js/posts/post.routes.js');
const commentRoutes = require('./resources/js/comments/comments.routes.js');
const { createPost } = require('./resources/js/posts/posts.controller.js');


const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(bodyParser.json());

// config para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

// rota de autenticacao
app.use('/auth', authRoutes);

//rota post
app.use(postRoutes);

//rota comment
app.use(commentRoutes);

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// página de cadastro
app.get('/signup-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// página de login
app.get('/login-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// página de recuperação de senha
app.get('/recover-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recuperarSenha.html'));
});

// feed deslogado
app.get('/feed-deslogado', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feedDeslog.html'));
});

// feed logado
app.get('/feed-logado', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feedLog.html'));
});

// perfil logado
app.get('/perfil-logado', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'perfilLog.html'));
});

// perfil teste
app.get('/perfil-teste', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'perfil.html'));
});


// rotas de usuários ***
app.use('/users', userRoutes); // Prefixo '/users' para as rotas dos usuários


// rota para buscar informações do usuário logado
app.get('/users/me', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Obtendo o token do header Authorization
    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id
          }
        });
        if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        // retornar os dados do usuário
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar informações do usuário' });
      }
    });
  });

// rota para buscar informações do perfil do usuário logado
app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id // Obtém o ID do usuário a partir do middleware
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'Perfil de usuário não encontrado' });
        }
        // Retorne os dados do perfil do usuário
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar informações do perfil do usuário' });
    }
});

//Criar post

app.post('/post/create', authenticateToken, createPost);


// start (3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
