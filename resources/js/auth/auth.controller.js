import AuthService from "./auth.service.js";

const authService = new AuthService();

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = await authService.signIn(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

export { signIn };
