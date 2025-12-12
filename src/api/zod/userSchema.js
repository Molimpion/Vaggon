const { z } = require('zod');

const registerSchema = z.object({
    login: z.string().min(3, "Login deve ter no mínimo 3 caracteres"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

const loginSchema = z.object({
    login: z.string(),
    password: z.string(),
});

module.exports = { registerSchema, loginSchema };