const { Activity } = require('../models');
const AppError = require('../utils/AppError');

module.exports = {
    async index(req, res) {
        const activities = await Activity.findAll({
            where: { user_id: req.userId },
            order: [['data_inicio', 'ASC']]
        });
        return res.json(activities);
    },

    async store(req, res) {
        const { nome, descricao, data_inicio, data_termino } = req.body;

        const activity = await Activity.create({
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

        const activity = await Activity.findOne({
            where: { id, user_id: req.userId }
        });

        if (!activity) {
            throw new AppError('Atividade não encontrada', 404);
        }

        await activity.update({ nome, descricao, data_inicio, data_termino, status });

        return res.json(activity);
    },

    async delete(req, res) {
        const { id } = req.params;

        const rowsDeleted = await Activity.destroy({
            where: { id, user_id: req.userId }
        });

        if (rowsDeleted === 0) {
            throw new AppError('Atividade não encontrada', 404);
        }

        return res.status(204).send();
    }
};