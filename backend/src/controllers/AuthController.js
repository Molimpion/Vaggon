const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    // 1. Registrar Usuário
    async register(req, res) {
        try {
            const { login, password } = req.body;

            // Verifica se já existe
            const userExists = await User.findOne({ where: { login } });
            if (userExists) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }

            // Criptografa a senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Cria no banco
            const user = await User.create({
                login,
                password: hashedPassword
            });

            // Retorna sucesso (sem mandar a senha de volta)
            return res.status(201).json({ 
                id: user.id, 
                login: user.login,
                message: 'Usuário criado com sucesso!' 
            });

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao registrar usuário', details: error.message });
        }
    },

    // 2. Fazer Login
    async login(req, res) {
        try {
            const { login, password } = req.body;

            // Busca o usuário
            const user = await User.findOne({ where: { login } });
            if (!user) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }

            // Compara a senha enviada com a senha criptografada do banco
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Senha incorreta' });
            }

            // Gera o Token JWT (Vale por 1 dia)
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            return res.json({ 
                user: { id: user.id, login: user.login },
                token 
            });

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
        }
    }
};