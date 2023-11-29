import jwt from "jsonwebtoken";
import UserService from "./user.service.js";

class AuthService {
  async signIn(email, password) {
    const user = await UserService.getUserByEmail(email); // IMPLEMENTAR FUNÇÃO getUserByEmail
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    if (user.password !== password) {
      throw new Error('Senha inválida');
    }
    // se as credenciais estiverem corretas, gerar um token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
      expiresIn: '1d',
    });

    return token;
  }
}

export default AuthService;
