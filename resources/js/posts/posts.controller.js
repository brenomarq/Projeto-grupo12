const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUserDataFromToken(token) {
  try {
    const decoded = jwt.verify(token, 'secret'); // verifica o token usando a chave secreta 'secret'
    const userId = decoded.id; // get id
    const userData = await prisma.user.findUnique({ where: { id: userId } }); // busca os dados do usuário usando o ID

    return userData; // retorna os dados do usuário
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    throw new Error('Erro ao obter dados do usuário');
  }
}

async function createPost(req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const userData = await getUserDataFromToken(token); // obtém os dados do usuário usando o token

    const { content } = req.body;

    console.log('Received post creation request:', req.body);

    const post = await prisma.post.create({
      data: {
        content,
        user: {
          connect: { id: userData.id }, // associa o post ao usuário pelo ID
        },
      },
    });

    console.log('Post created:', post);
    res.status(201).json({ message: 'Post feito com sucesso!', post });
  } catch (error) {
    console.error('Erro ao criar o post:', error);
    res.status(500).json({ error: 'Erro ao fazer o post.' });
  }
}
  
  
  // Atualizar posts
  async function updatePostContent(req, res) {
    const { postId, newContent } = req.body;
  
    try {
      console.log('Updating post content for user:', user);
  
      const updatedPost = await prisma.post.update({
        where: {
          user: user,
        },
        data: {
          content: newContent,
        },
      });
  
      console.log('Post content updated:', updatedContent);
      res.json({ message: 'Post atualizada com sucesso!', updatedPostContent });
    } catch (error) {
      console.error('Error updating content post:', error);
      res.status(500).json({ error: 'Erro ao atualizar o conteúdo do post.' });
    }
  }
  
  //Deletar post
  async function deletePost(req, res) {
    const postId = parseInt(req.params.id);
  
    try {
      console.log('Deleting post with ID:', postId);
      const deletedPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
  
      console.log('Deleted post:', deletedPost);
      res.json({ message: 'Post deletado com sucesso!', deletedPost });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Erro ao deletar post.' });
    }
  }
  
  // Listar posts

async function listPosts(req, res) {
  try {
    console.log('Fetching all posts...');
    const posts= await prisma.post.findMany();
    console.log('Retrieved posts:', posts);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Erro ao listar posts.' });
  }
}

  module.exports = {
    
    createPost,
    updatePostContent,
    deletePost,
    listPosts,
    getUserDataFromToken,
  };
  