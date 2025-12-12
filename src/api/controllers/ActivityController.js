const ActivityService = require('../../application/activities/ActivityService');
const { activitySchema } = require('../zod/activitySchema');

class ActivityController {
    async create(req, res) {
        try {
            const data = activitySchema.parse(req.body);
            const activity = await ActivityService.create(req.user.id, data);
            return res.status(201).json(activity);
        } catch (error) {
            const status = error.statusCode || 400;
            return res.status(status).json({ error: error.message || error.errors });
        }
    }

    async index(req, res) {
        try {
            const activities = await ActivityService.listByUser(req.user.id);
            return res.json(activities);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = activitySchema.partial().parse(req.body); // Permite atualização parcial
            const activity = await ActivityService.update(req.user.id, id, data);
            return res.json(activity);
        } catch (error) {
            const status = error.statusCode || 400;
            return res.status(status).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await ActivityService.delete(req.user.id, id);
            return res.status(204).send();
        } catch (error) {
            const status = error.statusCode || 400;
            return res.status(status).json({ error: error.message });
        }
    }
}

module.exports = new ActivityController();