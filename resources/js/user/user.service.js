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

module.exports = {
  newUser,
};