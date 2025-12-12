const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

module.exports = {
    async register(req, res) {
        const { login, password } = req.body;

        
        const userExists = await User.findOne({ where: { login } });
        if (userExists) {
            throw new AppError('Usuário já existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            login,
            password: hashedPassword
        });

        return res.status(201).json({ 
            id: user.id, 
            login: user.login,
            message: 'Usuário criado com sucesso!' 
        });
    },

    async login(req, res) {
        const { login, password } = req.body;

        const user = await User.findOne({ where: { login } });
        
        if (!user) {
            throw new AppError('Usuário ou senha incorretos', 401);
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new AppError('Usuário ou senha incorretos', 401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        return res.json({ 
            user: { id: user.id, login: user.login },
            token 
        });
    }
};