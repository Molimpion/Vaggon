const jwt = require('jsonwebtoken');
const AppError = require('../../infrastructure/exceptions/AppError');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo_padrao');
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};