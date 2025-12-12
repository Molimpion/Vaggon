const UserService = require('../../application/users/UserService');
const { loginSchema } = require('../zod/userSchema');

class AuthController {
    async login(req, res) {
        try {
            const { login, password } = loginSchema.parse(req.body);
            const result = await UserService.authenticate(login, password);
            return res.json(result);
        } catch (error) {
            const status = error.statusCode || 400;
            return res.status(status).json({ error: error.message || error.errors });
        }
    }
}

module.exports = new AuthController();