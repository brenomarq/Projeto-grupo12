import jwk from "jsonwebtoken"
import UserService from 

class AuthService {
    async signIn(email, password) {
        const user = await UserService.getUserByEmail(email)
        if (!user) {
            throw new Error('User not found')
        }
        if (user.password !== password) {
            throw new Error('Invalid password')
        }

        const token = jwk.sign({ id: user.id }, "secret", {
            expiresIn: '1d',
        })
        return token
 }

    async signUp(email, password) {
        const newUser = await UserService.create(email, password)
        return newUser;
    }

}

export default new AuthService()