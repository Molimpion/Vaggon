const UserService = require('../../application/users/UserService');
const { registerSchema } = require('../zod/userSchema');

class UserController {
    async create(req, res) {
        try {
            const data = registerSchema.parse(req.body);
            const user = await UserService.register(data);
            return res.status(201).json(user);
        } catch (error) {
            const status = error.statusCode || 400;
            return res.status(status).json({ error: error.message || error.errors });
        }
    }
}

module.exports = new UserController();