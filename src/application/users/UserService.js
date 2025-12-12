const User = require('../../infrastructure/orm/User');
const AppError = require('../../infrastructure/exceptions/AppError');
const jwt = require('jsonwebtoken');

class UserService {
    async register(data) {
        const userExists = await User.findOne({ where: { login: data.login } });
        if (userExists) {
            throw new AppError('Usuário já existe');
        }
        const user = await User.create(data);
        return { id: user.id, login: user.login };
    }

    async authenticate(login, password) {
        const user = await User.findOne({ where: { login } });
        if (!user) {
            throw new AppError('Login ou senha incorretos', 401);
        }

        const passwordMatch = await user.checkPassword(password);
        if (!passwordMatch) {
            throw new AppError('Login ou senha incorretos', 401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'segredo_padrao', {
            expiresIn: '1d',
        });

        return { user: { id: user.id, login: user.login }, token };
    }
}

module.exports = new UserService();