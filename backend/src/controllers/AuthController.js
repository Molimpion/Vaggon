const AuthService = require('../services/AuthService');

module.exports = {
    async register(req, res) {
        const { login, password } = req.body;

        const result = await AuthService.register({ login, password });

        return res.status(201).json(result);
    },

    async login(req, res) {
        const { login, password } = req.body;

        const result = await AuthService.login({ login, password });

        return res.json(result);
    }
};