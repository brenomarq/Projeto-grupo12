const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um usuário

async function createUser(req, res) {
  const { username, email, password, gender, cargo, profilePicture } = req.body;

  try {
    console.log('Received user creation request:', req.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({ error: 'Este email já está em uso.' });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,  
        gender,
        cargo,
        profilePicture
      },
    });

    console.log('User created:', user);
    res.json({ message: 'Usuário cadastrado com sucesso!', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
}

// listar todos os usuários

async function listUsers(req, res) {
  try {
    console.log('Fetching all users...');
    const users = await prisma.user.findMany();
    console.log('Retrieved users:', users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
}

// deletar usuário pelo ID

async function deleteUser(req, res) {
  const userId = parseInt(req.params.id);

  try {
    console.log('Deleting user with ID:', userId);
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    console.log('Deleted user:', deletedUser);
    res.json({ message: 'Usuário deletado com sucesso!', deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
}

// alterar senha do usuário

async function updateUserPassword(req, res) {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    console.log('Updating user password for email:', email);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log('User not found with email:', email);
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (newPassword !== confirmPassword) {
      console.log('As senhas não correspondem');
      return res.status(400).json({ error: 'As senhas não correspondem.' });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: newPassword,
      },
    });

    console.log('User password updated:', updatedUser);
    res.json({ message: 'Senha do usuário atualizada com sucesso!', updatedUser });
  } catch (error) {
    console.error('Error updating user password:', error);
    res.status(500).json({ error: 'Erro ao atualizar a senha do usuário.' });
  }
}

module.exports = {
  createUser,
  listUsers,
  deleteUser,
  updateUserPassword,
};
