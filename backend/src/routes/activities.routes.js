const { Router } = require('express');
const ActivityController = require('../controllers/ActivityController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');
const { activitySchema } = require('../validators/ActivitySchema');

const activitiesRoutes = Router();

// Aplica o guardião em todas as rotas abaixo
activitiesRoutes.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Activities
 *     description: Gerenciamento de Atividades (Requer Token)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         data_inicio:
 *           type: string
 *           format: date-time
 *         data_termino:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [pendente, concluida, cancelada]
 */

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Listar atividades do usuário logado
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de atividades
 *
 *   post:
 *     summary: Criar nova atividade
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: Atividade criada
 */

/**
 * @swagger
 * /activities/{id}:
 *   put:
 *     summary: Atualizar atividade
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: Atividade atualizada
 *
 *   delete:
 *     summary: Deletar atividade
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Atividade deletada
 */

activitiesRoutes.get('/', ActivityController.index);
activitiesRoutes.post('/', validate(activitySchema), ActivityController.store);
activitiesRoutes.put('/:id', validate(activitySchema.partial()), ActivityController.update);
activitiesRoutes.delete('/:id', ActivityController.delete);

module.exports = activitiesRoutes;
