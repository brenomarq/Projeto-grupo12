const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function newUser(userData) {
  try {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    throw new Error('Erro ao cadastrar usuário.');
  }
}

async function updateUserPassword(userId, newPassword) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error('Erro ao atualizar a senha do usuário.');
  }
}

async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Erro ao buscar usuário.');
  }
}

module.exports = {
  newUser,
  updateUserPassword,
  getUserByEmail,
};