const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar post
async function createPost(req, res) {
    const { userId, content } = req.body;
  
    try {
      console.log('Received post creation request:', req.body);
  
  
      const post = await prisma.post.create({
        data: {
          userId,
          content,
        },
      });
  
      console.log('Post created:', post);
      res.json({ message: 'Post feito com sucesso!', post });
    } catch (error) {
      console.error('Error creating post:', error);
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
    const posts= await prisma.posts.findMany();
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
  };
  