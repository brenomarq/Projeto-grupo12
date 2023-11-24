import jwk from "jsonwebtoken"
import AuthService from "./auth.service.js"

const authService = new AuthService();
const authRouter = new Router();

authRouter.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.signIn(email, password);
        res.status(200).json({ token });
    }
    catch (e) {
        res.status(401).json({ message: e.message });
    };
});

authRouter.post('/sign-up', async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await authService.signUp(email, password);
        res.status(200).json(newUser);
    }
    catch (e) {
        res.status(401).json({ message: e.message });
    };
});   

export default authRouter;