const AuthService = require('./auth.service');

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = await AuthService.signIn(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = { signIn };
