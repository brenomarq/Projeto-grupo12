import jwt from jsonwebtoken;


export default function JwtGuard (req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ message: 'Token nao informado' });
    }

    const [prefix, token] = authorization.split(' ');

    if (prefix !== 'Bearer') {
        return res.status(401).json({ message: 'Token mal formatado' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.userId = decoded;
        next();
        
    }
    catch (e) {
        res.status(401).json({ message: 'Token invalido' });
    }
}