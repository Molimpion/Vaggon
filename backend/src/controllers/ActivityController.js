const ActivityService = require('../services/ActivityService');

module.exports = {
    async index(req, res) {
        const activities = await ActivityService.listActivities(req.userId);
        return res.json(activities);
    },

    async store(req, res) {
        const { nome, descricao, data_inicio, data_termino } = req.body;

        const activity = await ActivityService.createActivity({
            nome,
            descricao,
            data_inicio,
            data_termino,
            user_id: req.userId 
        });

        return res.status(201).json(activity);
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome, descricao, data_inicio, data_termino, status } = req.body;

        const activity = await ActivityService.updateActivity({
            id, 
            user_id: req.userId,
            data: { nome, descricao, data_inicio, data_termino, status }
        });

        return res.json(activity);
    },

    async delete(req, res) {
        const { id } = req.params;

        await ActivityService.deleteActivity({ 
            id, 
            user_id: req.userId 
        });

        return res.status(204).send();
    }
};