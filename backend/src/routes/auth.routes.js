const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validators/AuthSchema');

const authRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Gerenciamento de Autenticação
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação ou usuário existente
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login e receber token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

authRoutes.post('/register', validate(registerSchema), AuthController.register);
authRoutes.post('/login', validate(loginSchema), AuthController.login);

module.exports = authRoutes;
