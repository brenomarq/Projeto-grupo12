const jwt = require('jsonwebtoken');
const UserService = require('../user/user.service');

class AuthService {
  async signIn(email, password) {
    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      if (user.password !== password) {
        throw new Error('Senha inválida.');
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', {
        expiresIn: '1d',
      });

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthService();
