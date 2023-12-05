const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar comentário
async function createComment(req, res) {
    const { postId, userId, content } = req.body;
  
    try {
      console.log('Received comment creation request:', req.body);
  
  
      const comment = await prisma.comment.create({
        data: {
          postId,
          userId,
          content,
        },
      });
  
      console.log('Comment created:', comment);
      res.json({ message: 'Comentário feito com sucesso!', comment });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Erro ao fazer o comentário.' });
    }
  }
  
  
  // Atualizar comentário
  async function updateCommentContent(req, res) {
    const { postId, userId, newContent } = req.body;
  
    try {
      console.log('Updating comment content for user and post:', userId , postId);
  
      const updatedCommentContent = await prisma.comment.update({
        where: {
           userId: userId,
           postId:postId
        },
        data: {
          content: newContent,
        },
      });
  
      console.log('Comment content updated:', updatedCommentContent);
      res.json({ message: 'Comentário atualizada com sucesso!', updatedCommentContent });
    } catch (error) {
      console.error('Error updating content comment:', error);
      res.status(500).json({ error: 'Erro ao atualizar o conteúdo do comentário.' });
    }
  }
  
  //Deletar comentário
  async function deleteComment(req, res) {
    const commentId = parseInt(req.params.id);
  
    try {
      console.log('Deleting comment with ID:', commentId);
      const deletedComment = await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
  
      console.log('Deleted comment:', deletedComment);
      res.json({ message: 'Comentário deletado com sucesso!', deletedComment });
    } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Erro ao deletar comentário.' });
    }
  }
  
  //listar comentarios
  async function listComments(req, res) {
    try {
      console.log('Fetching all comments...');
      const comments= await prisma.comment.findMany();
      console.log('Retrieved comments:',comments);
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Erro ao listar comentários.' });
    }
  }


  module.exports = {
    
    createComment,
    updateCommentContent,
    deleteComment,
    listComments,
  };
  